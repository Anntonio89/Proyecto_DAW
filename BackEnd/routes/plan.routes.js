const express=require('express')
const router=express.Router()
const planController = require('../controllers/plan.controller')
const {plan}=require('../utils/mysql.config')
const jwtMW = require('../middlewares/jwt.mw')
const rutasProtegidasMW=require('../middlewares/rutasProtegidas.mw')

//Para comprobar los planes asignados a un usuario
router.get('/plan', jwtMW.authenticate, planController.findByFilterUser)
router.get('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.findAllPlans)
router.get('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.findPlanById)
router.post('/', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.createPlan)
router.put('/:id',jwtMW.authenticate, rutasProtegidasMW.requireCoach,planController.updatePlan)
router.delete('/:id', jwtMW.authenticate, rutasProtegidasMW.requireCoach, planController.deletePlan)
//Para comprobar los planes detallados asignados a un usuario
router.get('/:id/details', jwtMW.authenticate, planController.findPlanWithDetails)

// router.get('/', planController.findAllPlans)
// router.get('/:id', planController.findPlanById)
// router.post('/', planController.createPlan)
// router.put('/:id', planController.updatePlan)
// router.delete('/:id', planController.deletePlan)
// router.get('/:id/details', planController.findPlanWithDetails)


module.exports=router