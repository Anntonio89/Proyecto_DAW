const progresModel = require('../models/progres.model')
const {wrapAsync}=require('../utils/functions')
const AppError=require('../utils/AppError')

//Encontrar todos los Progresos
exports.findAllProgres=wrapAsync(async function (req,res, next){

   await progresModel.findAll(function(err,datosProgreso){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosProgreso)
        }
    })
})

//Buscar Progreso por Id
exports.findProgresById=wrapAsync(async function(req,res,next){
    const id=req.params.id
    await progresModel.findById(id,function(err,datosProgreso){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosProgreso)
        }
    })
})

//Crear un Progreso
exports.createProgres=wrapAsync(async function(req,res,next){
    const newProgres= new progresModel(req.body)

    await progresModel.create(newProgres, function(err, datosProgresoCreado){
        if(err){
            next(new AppError('Error al crear el progreso',404))
        }else{
            res.status(201).json(datosProgresoCreado)
        }
    })
})

//Actualizar un Progreso
exports.updateProgres=wrapAsync(async function (req,res,next){
    const id=req.params.id
    const updateProgres=new progresModel(req.body)

    await progresModel.update(id, updateProgres, function(err,datosProgreso){
        if(err|| !datosProgreso){
            next(new AppError('Error al actualizar el progreso',404))
        }else{
            res.status(200).json({message:'Progreso editado con exito', datosProgreso})
        }
    })
})

//Eliminar un Progreso
exports.deleteProgres=wrapAsync(async function (req,res,next){
    const id=req.params.id
    await progresModel.delete(id, function(err,datosProgreso){
        if(err|| !datosProgreso){
            next(new AppError('Error al eliminar el progreso',400))
        }else{
            res.status(200).json({message:'Progreso eliminado con exito', datosProgreso})
        }
    })
})