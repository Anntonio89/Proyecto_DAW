const express=require('express')
const router=express.Router()
const userController = require('../controllers/user.controller')
const {user}=require('../utils/mysql.config')

router.get('/', userController.findAllUsers)
router.get('/:id', userController.findUserById)
router.post('/', userController.createUser)
router.put('/:id',userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports=router