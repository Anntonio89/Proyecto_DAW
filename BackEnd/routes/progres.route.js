const express=require('express')
const router=express.Router()
const progresModel = require('../controllers/progres.controller')
const {Progres}=require('../utils/mysql.config')

router.get('/', progresModel.findAllProgres)
router.get('/:id', progresModel.findProgresById)
router.post('/', progresModel.createProgres)
router.put('/:id',progresModel.updateProgres)
router.delete('/:id', progresModel.deleteProgres)

module.exports=router