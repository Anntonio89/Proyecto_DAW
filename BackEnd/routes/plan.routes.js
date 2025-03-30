const express=require('express')
const router=express.Router()
const planController = require('../controllers/plan.controller')
const {plan}=require('../utils/mysql.config')

router.get('/', planController.findAllPlans)
router.get('/:id', planController.findPlanById)
router.post('/', planController.createPlan)
router.put('/:id',planController.updatePlan)
router.delete('/:id', planController.deletePlan)

module.exports=router