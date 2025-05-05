const express=require('express')
const router=express.Router()
const detailModel = require('../controllers/detalles.controller')
const {Detail}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.findAllDetails)
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.findDetailById)
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.createDetail)
router.put('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.updateDetail)
router.delete('/:id',jwtMW.authenticate, rutasProtegidasMW.requireCoach, detailModel.deleteDetail)

// router.get('/', detailModel.findAllDetails)
// router.get('/:id', detailModel.findDetailById)
// router.post('/', detailModel.createDetail)
// router.put('/:id', detailModel.updateDetail)
// router.delete('/:id',detailModel.deleteDetail)


module.exports=router