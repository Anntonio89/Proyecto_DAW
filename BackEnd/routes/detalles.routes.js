const express=require('express')
const router=express.Router()
const detailModel = require('../controllers/detalles.controller')
const {Detail}=require('../utils/mysql.config')

router.get('/', detailModel.findAllDetails)
router.get('/:id', detailModel.findDetailById)
router.post('/', detailModel.createDetail)
router.put('/:id',detailModel.updateDetail)
router.delete('/:id', detailModel.deleteDetail)

module.exports=router