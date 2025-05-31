const express=require('express')
const router=express.Router()
const progresModel = require('../controllers/progres.controller')
const {Progres}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

/**
 * @swagger
 * components:
 *   schemas:
 *     Progreso:
 *       type: object
 *       required:
 *         - id_usuario
 *         - nombre_usuario
 *         - id_plan
 *         - nombre_plan
 *         - peso
 *         - IMC
 *         - indice_grasa
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del progreso
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario
 *         nombre_usuario:
 *           type: string
 *           description: Nombre del usuario
 *         id_plan:
 *           type: integer
 *           description: ID del plan
 *         nombre_plan:
 *           type: string
 *           description: Nombre del plan
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del progreso
 *         peso:
 *           type: number
 *           format: float
 *           description: Peso del usuario en kg
 *         IMC:
 *           type: number
 *           format: float
 *           description: Índice de masa corporal
 *         indice_grasa:
 *           type: number
 *           format: float
 *           description: Porcentaje de grasa corporal
 *         observaciones:
 *           type: string
 *           description: Observaciones adicionales
 *       example:
 *         id: 12
 *         id_usuario: 5
 *         nombre_usuario: "Lucas Gómez"
 *         id_plan: 3
 *         nombre_plan: "Hipertrofia Avanzada"
 *         fecha: "2025-05-30T12:45:00Z"
 *         peso: 78.5
 *         IMC: 23.1
 *         indice_grasa: 16.5
 *         observaciones: "Mejoras visibles"
 */

/**
 * @swagger
 * tags:
 *   name: Progresos
 *   description: Registro y seguimiento de progresos de usuarios
 */

/**
 * @swagger
 * /progres/progres:
 *   get:
 *     summary: Devuelve los progresos del usuario autenticado
 *     tags: [Progresos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de progresos del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/progres', jwtMW.authenticate, progresModel.findByFilterUser)

/**
 * @swagger
 * /progres:
 *   get:
 *     summary: Devuelve todos los progresos (requiere rol de entrenador)
 *     tags: [Progresos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de progresos
 *       403:
 *         description: No autorizado
 */

router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.findAllProgres)
/**
 * @swagger
 * /progres/{id}:
 *   get:
 *     summary: Devuelve un progreso por ID (requiere rol de entrenador)
 *     tags: [Progresos]
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
 *         description: Progreso encontrado
 *       404:
 *         description: Progreso no encontrado
 */
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.findProgresById)
/**
 * @swagger
 * /progres:
 *   post:
 *     summary: Crea un nuevo progreso (requiere rol de entrenador)
 *     tags: [Progresos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Progreso'
 *     responses:
 *       201:
 *         description: Progreso creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.createProgres)
/**
 * @swagger
 * /progres/{id}:
 *   put:
 *     summary: Actualiza un progreso existente (requiere rol de entrenador)
 *     tags: [Progresos]
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
 *             $ref: '#/components/schemas/Progreso'
 *     responses:
 *       200:
 *         description: Progreso actualizado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.updateProgres)
/**
 * @swagger
 * /progres/{id}:
 *   delete:
 *     summary: Elimina un progreso por ID (requiere rol de entrenador)
 *     tags: [Progresos]
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
 *         description: Progreso eliminado correctamente
 *       400:
 *         description: Error en la eliminación
 */
router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.deleteProgres)


module.exports=router