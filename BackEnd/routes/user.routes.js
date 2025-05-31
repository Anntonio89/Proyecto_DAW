const express=require('express')
const router=express.Router()
const userController = require('../controllers/user.controller')
const {user}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nombre
 *         - apellidos
 *         - email
 *         - password
 *         - altura
 *         - peso
 *         - edad
 *         - sexo
 *         - rol          
 *       properties:
 *         id:
 *           type: integer
 *           description: UUID autogenerado por MySQL
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellidos:
 *           type: string
 *           description: Apellidos del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         altura:
 *           type: float
 *           description: Altura del usuario
 *         peso:
 *           type: float
 *           description: Peso del usuario
 *         edad:
 *           type: integer
 *           description: Edad del usuario
 *         sexo:
 *           type: string
 *           enum:
 *             - Hombre
 *             - Mujer
 *             - Otro
 *           description: Sexo del usuario
 *         rol:
 *           type: string
 *           enum:
 *             - ADMIN
 *             - ENTRENADOR
 *             - USUARIO
 *           description: Rol del usuario
 *       example:
 *         id: 16
 *         nombre: "Mari"
 *         apellidos: "Montaña"
 *         email: "mar@coach.es"
 *         password: "******"
 *         altura: "1.65"
 *         peso: "50"
 *         edad: "24"
 *         sexo: "Mujer"
 *         rol: "ENTRENADOR"
 *     Error:
 *       type: object
 *       properties:
 *         err:
 *           type: string
 *           description: Descripción del error
 *       example:
 *         err: Datos no encontrados
 */


/**
 * @swagger
 * tags:
 *      name: Usuarios
 *      description: Usuarios del API de Proyecto DAW
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Credenciales (email y/o contraseña) inválidas
 */
router.post('/login',userController.login)
/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Cierra la sesión del usuario
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Sesión cerrada con éxito
 */
router.get('/logout',userController.logout)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Devuelve todos los usuarios (rol de entrenador requerido)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de usuarios
 *       403:
 *         description: No autorizado
 */
router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, userController.findAllUsers)
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Devuelve un usuario por su ID (rol de admin requerido)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireAdmin, userController.findUserById)
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario (registro)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', userController.createUser)
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID (admin requerido)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id',jwtMW.authenticate, rutasProtegidasMW.requireAdmin,userController.updateUser)
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID (admin requerido)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       400:
 *         description: Error en la eliminación
 */
router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireAdmin, userController.deleteUser)

module.exports=router