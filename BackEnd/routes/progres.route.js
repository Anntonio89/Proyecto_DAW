const express=require('express')
const router=express.Router()
const progresModel = require('../controllers/progres.controller')
const {Progres}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

router.get('/progres', jwtMW.authenticate, progresModel.findByFilterUser)
router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.findAllProgres)
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.findProgresById)
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.createProgres)
router.put('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.updateProgres)
router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, progresModel.deleteProgres)

// router.get('/',  progresModel.findAllProgres)
// router.get('/:id', progresModel.findProgresById)
// router.post('/', progresModel.createProgres)
// router.put('/:id', progresModel.updateProgres)
// router.delete('/:id',progresModel.deleteProgres)

module.exports=router