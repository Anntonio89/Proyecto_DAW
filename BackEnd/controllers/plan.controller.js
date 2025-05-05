const planModel = require('../models/plan.model')
const {wrapAsync}=require('../utils/functions')
const AppError=require('../utils/AppError')

//Encontrar todos los Planes
exports.findAllPlans=wrapAsync(async function (req,res, next){

   await planModel.findAll(function(err,datosPlan){
        if(err){
            return next(new AppError(err,404))
        }else{
            res.status(200).json(datosPlan)
        }
    })
})

//Buscar Plan por Id
exports.findPlanById=wrapAsync(async function(req,res,next){
    const id=req.params.id
    await planModel.findById(id,function(err,datosPlan){
        if(err){
            return next(new AppError(err,404))
        }else{
            res.status(200).json(datosPlan)
        }
    })
})

//Crear un Plan
exports.createPlan=wrapAsync(async function(req,res,next){
    const newPlan= new planModel(req.body)

    await planModel.create(newPlan, function(err, datosPlanCreado){
        if(err){
            return next(new AppError('Error al crear el Plan',404))
        }else{
            res.status(201).json(datosPlanCreado)
        }
    })
})

//Actualizar un Plan
exports.updatePlan=wrapAsync(async function (req,res,next){
    const id=req.params.id
    const updatePlan=new planModel(req.body)
    
    await planModel.update(id, updatePlan, function(err,datosPlan){
        if(err|| !datosPlan){
            return next(new AppError('Error al actualizar el Plan',404))
        }else{
            res.status(200).json({message:'Plan editado con exito', datosPlan})
        }
    })
})

//Eliminar un Plan
exports.deletePlan=wrapAsync(async function (req,res,next){
    const id=req.params.id
    await planModel.delete(id, function(err,datosPlan){
        if(err|| !datosPlan){
            return next(new AppError('Error al eliminar el Plan',400))
        }else{
            res.status(200).json({message:'Plan eliminado con exito', datosPlan})
        }
    })
})

exports.findPlanWithDetails =wrapAsync(async function (req,res,next){
    const idPlan = req.params.id
    const id_usuario=req.user.id
    const rol=req.user.rol

    planModel.findById(idPlan, function(err,datosPlan){
        if(err|| !datosPlan || datosPlan[0].id_usuario != id_usuario && rol !== 'ENTRENADOR' && rol !== 'ADMIN'){
            return next (new AppError('Sin permiso para ver el plan',403))
        }

        planModel.findWithDetails(idPlan, function(err,datosPlan){
            if (err) {
               return next(new AppError('Error al obtener el Plan',404))
            } else {
                res.status(200).json(datosPlan)
            }
        })
    })
})

//Buscar Progreso por un filtro (id_usuario)
exports.findByFilterUser=wrapAsync(async function(req,res,next){
    // console.log('HOLLAAAAAAAAAA')
    const id_usuario=req.user.id
    // console.log('ID USUARIO:',req.user)
    await planModel.findByFilter(id_usuario, function(err,datosPlan){
        if(err){
           return  next(new AppError('Error al buscar el progreso por id_usuario',404))
        }else{
            res.status(200).json(datosPlan)
        }
    })
})