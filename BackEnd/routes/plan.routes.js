const express=require('express')
const router=express.Router()
const planController = require('../controllers/plan.controller')
const {plan}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

/**
 * @swagger
 * components:
 *   schemas:
 *     Plan:
 *       type: object
 *       required:
 *         - id_entrenador
 *         - id_usuario
 *         - plan
 *         - nivel
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del plan
 *         id_entrenador:
 *           type: integer
 *           description: ID del entrenador
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario
 *         plan:
 *           type: string
 *           description: Nombre del plan de entrenamiento
 *         nivel:
 *           type: string
 *           description: Nivel del plan (ej. Principiante, Intermedio, Avanzado)
 *         createdDate:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         modifiedDate:
 *           type: string
 *           format: date-time
 *           description: Fecha de última modificación
 *       example:
 *         id: 7
 *         id_entrenador: 2
 *         id_usuario: 5
 *         plan: "Hipertrofia Avanzada"
 *         nivel: "Avanzado"
 *         createdDate: "2025-05-30T12:00:00Z"
 *         modifiedDate: "2025-05-30T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Planes
 *   description: Gestión de planes de entrenamiento
 */

/**
 * @swagger
 * /plan/plan:
 *   get:
 *     summary: Obtiene los planes del usuario autenticado, para su consulta
 *     tags: [Planes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de planes del usuario en particular
 *       401:
 *         description: No autorizado
 */
//Para comprobar los planes asignados a un usuario
router.get('/plan', jwtMW.authenticate, planController.findByFilterUser)
/**
 * @swagger
 * /plan:
 *   get:
 *     summary: Obtiene todos los planes de entrenamiento (requiere rol de entrenador)
 *     tags: [Planes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de planes
 *       403:
 *         description: No autorizado
 */
router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.findAllPlans)
/**
 * @swagger
 * /plan/{id}:
 *   get:
 *     summary: Obtiene un plan por su ID (requiere rol de entrenador)
 *     tags: [Planes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plan encontrado
 *       404:
 *         description: Plan no encontrado
 */
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.findPlanById)
/**
 * @swagger
 * /plan:
 *   post:
 *     summary: Crea un nuevo plan (requiere rol de entrenador)
 *     tags: [Planes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plan'
 *     responses:
 *       201:
 *         description: Plan creado correctamente
 *       404:
 *         description: Plan no encontrado
 */
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.createPlan)
/**
 * @swagger
 * /plan/{id}:
 *   put:
 *     summary: Actualiza un plan existente (requiere rol de entrenador)
 *     tags: [Planes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plan'
 *     responses:
 *       200:
 *         description: Plan actualizado correctamente
 *       404:
 *         description: Error al actualizar
 */
router.put('/:id',jwtMW.authenticate, rutasProtegidasMW.requireCoach,planController.updatePlan)
/**
 * @swagger
 * /plan/{id}:
 *   delete:
 *     summary: Elimina un plan por su ID (requiere rol de entrenador)
 *     tags: [Planes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plan eliminado correctamente
 *       400:
 *         description: Error en la eliminación
 */

router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.deletePlan)
/**
 * @swagger
 * /plan/{id}/details:
 *   get:
 *     summary: Obtiene los detalles de los del usuario autenticado, para su consulta
 *     tags: [Planes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de planes detallados del usuario en particular
 *       403:
 *         description: No autorizado
 */
//Para comprobar los planes detallados asignados a un usuario
router.get('/:id/details', jwtMW.authenticate, planController.findPlanWithDetails)

module.exports=router