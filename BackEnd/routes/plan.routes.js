const express=require('express')
const router=express.Router()
const planController = require('../controllers/plan.controller')
const {plan}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.findAllPlans)
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.findPlanById)
router.post('/',jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.createPlan)
router.put('/:id',jwtMW.authenticate, rutasProtegidasMW.requireCoach,planController.updatePlan)
router.delete('/:id',jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.deletePlan)

module.exports=router