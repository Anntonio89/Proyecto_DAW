const express=require('express')
const router=express.Router()
const exerciceModel = require('../controllers/exercice.controller')
const {Exercice}=require('../utils/mysql.config')
const {upload}=require('../middlewares/images.mw')//configuracion del multer
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercice:
 *       type: object
 *       required:
 *         - nombre
 *         - categoria
 *         - grupo_muscular
 *         - nivel
 *         - descripcion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del ejercicio
 *         nombre:
 *           type: string
 *           description: Nombre del ejercicio
 *         categoria:
 *           type: string
 *           description: Categoría del ejercicio (fuerza, cardio)
 *         grupo_muscular:
 *           type: string
 *           description: Grupo muscular principal trabajado
 *         nivel:
 *           type: string
 *           description: Nivel del ejercicio (Principiante, Intermedio, Avanzado)
 *         descripcion:
 *           type: string
 *           description: Descripción del ejercicio
 *         imagen:
 *           type: string
 *           description: URL o nombre de la imagen asociada
 *       example:
 *         id: 10
 *         nombre: "Press banca"
 *         categoria: "Fuerza"
 *         grupo_muscular: "Pectoral"
 *         nivel: "Intermedio"
 *         descripcion: "Ejercicio de empuje para el tren superior con barra."
 *         imagen: "press_banca.jpg"
 */


/**
 * @swagger
 * tags:
 *   name: Ejercicios
 *   description: Gestión de ejercicios
 */

/**
 * @swagger
 * /exercice:
 *   get:
 *     summary: Obtener todos los ejercicios
 *     tags: [Ejercicios]
 *     responses:
 *       200:
 *         description: Lista de ejercicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercice'
 *       404:
 *         description: Ejercicio no encontrado
 */

router.get('/', exerciceModel.findAllExercices)
/**
 * @swagger
 * /exercice/{id}:
 *   get:
 *     summary: Obtener un ejercicio por ID
 *     tags: [Ejercicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ejercicio
 *     responses:
 *       200:
 *         description: Ejercicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercice'
 *       404:
 *         description: Ejercicio no encontrado
 */
router.get('/:id', exerciceModel.findExerciceById)
/**
 * @swagger
 * /exercice:
 *   post:
 *     summary: Crear un nuevo ejercicio
 *     tags: [Ejercicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - categoria
 *               - grupo_muscular
 *               - nivel
 *             properties:
 *               nombre:
 *                 type: string
 *               categoria:
 *                 type: string
 *               grupo_muscular:
 *                 type: string
 *               nivel:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Ejercicio creado
 *       500:
 *         description: Datos inválidos
 *       409:
 *         description: Ejercicio ya existe
 */
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach,upload.single('imagen'), exerciceModel.createExercice)
/**
 * @swagger
 * /exercices/{id}:
 *   put:
 *     summary: Actualizar un ejercicio existente
 *     tags: [Ejercicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ejercicio
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               categoria:
 *                 type: string
 *               grupo_muscular:
 *                 type: string
 *               nivel:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Ejercicio creado
 *       500:
 *         description: Datos inválidos
 *       409:
 *         description: Ejercicio ya existe
 */
router.put('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, upload.single('imagen'),exerciceModel.updateExercice)
/**
 * @swagger
 * /exercices/{id}:
 *   delete:
 *     summary: Eliminar un ejercicio
 *     tags: [Ejercicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ejercicio
 *     responses:
 *       200:
 *         description: Ejercicio eliminado
 *       400:
 *         description: Error al eliminar el ejercicio
 *       
 */
router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, exerciceModel.deleteExercice)

module.exports=router