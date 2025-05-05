const express=require('express')
const router=express.Router()
const userController = require('../controllers/user.controller')
const {user}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')


router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireAdmin, userController.findAllUsers)
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireAdmin, userController.findUserById)
router.post('/', userController.createUser)
router.put('/:id',jwtMW.authenticate, rutasProtegidasMW.requireAdmin,userController.updateUser)
router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireAdmin, userController.deleteUser)

// router.post('/login',userController.login)
// router.get('/logout',userController.logout)
// router.get('/', userController.findAllUsers)
// router.get('/:id', userController.findUserById)
// router.post('/', userController.createUser)
// router.put('/:id',userController.updateUser)
// router.delete('/:id', userController.deleteUser)

module.exports=router