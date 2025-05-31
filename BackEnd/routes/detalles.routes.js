const express=require('express')
const router=express.Router()
const detailModel = require('../controllers/detalles.controller')
const {Detail}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

/**
 * @swagger
 * components:
 *   schemas:
 *     Detail:
 *       type: object
 *       required:
 *         - id_plan
 *         - id_ejercicio
 *         - series
 *         - repeticiones
 *         - descanso
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del detalle
 *         id_plan:
 *           type: integer
 *           description: ID del plan asociado
 *         id_ejercicio:
 *           type: integer
 *           description: ID del ejercicio asignado
 *         series:
 *           type: integer
 *           description: Número de series
 *         repeticiones:
 *           type: integer
 *           description: Número de repeticiones por serie
 *         descanso:
 *           type: integer
 *           description: Descanso en segundos entre series
 *       example:
 *         id: 1
 *         id_plan: 2
 *         id_ejercicio: 10
 *         series: 4
 *         repeticiones: 12
 *         descanso: 60
 */

/**
 * @swagger
 * tags:
 *   name: Detalles
 *   description: Gestión de detalles de planes de entrenamiento (ejercicios asignados)
 */

/**
 * @swagger
 * /details:
 *   get:
 *     summary: Obtener todos los detalles
 *     tags: [Detalles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de detalles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Detail'
 *       404:
 *         description: Detalle no encontrado
 */

router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.findAllDetails)
/**
 * @swagger
 * /details/{id}:
 *   get:
 *     summary: Obtener un detalle por ID
 *     tags: [Detalles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Detail'
 *       403:
 *         description: Sin permiso para ver el detalle
 */
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.findDetailById)
/**
 * @swagger
 * /details:
 *   post:
 *     summary: Crear un nuevo detalle
 *     tags: [Detalles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Detail'
 *     responses:
 *       201:
 *         description: Detalle creado
 *       409:
 *         description: Detalle ya existente con el mismo plan, ejercicio y día
 *       500:
 *         description: Datos inválidos
 */
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.createDetail)
/**
 * @swagger
 * /details/{id}:
 *   put:
 *     summary: Actualizar un detalle existente
 *     tags: [Detalles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Detail'
 *     responses:
 *       200:
 *         description: Detalle actualizado
 *       409:
 *         description: El detalle ya existe con ese plan, ejercicio y día
 *       500:
 *         description: Error al buscar duplicados
 */
router.put('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.updateDetail)
/**
 * @swagger
 * /details/{id}:
 *   delete:
 *     summary: Eliminar un detalle
 *     tags: [Detalles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle
 *     responses:
 *       200:
 *         description: Detalle eliminado
 *       400:
 *         description: Error al eliminar el detalle
 */
router.delete('/:id',jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.deleteDetail)

module.exports=router