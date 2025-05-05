const express=require('express')
const router=express.Router()
const exerciceModel = require('../controllers/exercice.controller')
const {Exercice}=require('../utils/mysql.config')
const {upload}=require('../middlewares/images.mw')//configuracion del multer
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

router.get('/', exerciceModel.findAllExercices)
router.get('/:id', exerciceModel.findExerciceById)
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach,upload.single('imagen'), exerciceModel.createExercice)
router.put('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, upload.single('imagen'),exerciceModel.updateExercice)
router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, exerciceModel.deleteExercice)

// router.get('/', exerciceModel.findAllExercices)
// router.get('/:id', exerciceModel.findExerciceById)
// router.post('/', upload.single('imagen'), exerciceModel.createExercice)
// router.put('/:id', upload.single('imagen'),exerciceModel.updateExercice)
// router.delete('/:id', exerciceModel.deleteExercice)


module.exports=router