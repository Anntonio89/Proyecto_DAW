const express=require('express')
const router=express.Router()
const exerciceModel = require('../controllers/exercice.controller')
const {Exercice}=require('../utils/mysql.config')

router.get('/', exerciceModel.findAllExercices)
router.get('/:id', exerciceModel.findExerciceById)
router.post('/', exerciceModel.createExercice)
router.put('/:id',exerciceModel.updateExercice)
router.delete('/:id', exerciceModel.deleteExercice)

module.exports=router