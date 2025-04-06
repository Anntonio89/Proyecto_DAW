const express=require('express')
const router=express.Router()
const exerciceModel = require('../controllers/exercice.controller')
const {Exercice}=require('../utils/mysql.config')
const {upload}=require('../middlewares/images.mw')//configuracion del multer

router.get('/', exerciceModel.findAllExercices)
router.get('/:id', exerciceModel.findExerciceById)
router.post('/',upload.single('imagen'), exerciceModel.createExercice)
router.put('/:id',exerciceModel.updateExercice)
router.delete('/:id', exerciceModel.deleteExercice)

module.exports=router