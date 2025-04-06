const exerciceModel = require('../models/exercice.model')
const {wrapAsync}=require('../utils/functions')
const AppError=require('../utils/AppError')

//Encontrar todos los ejercicios
exports.findAllExercices=wrapAsync(async function (req,res, next){

   await exerciceModel.findAll(function(err,datosEjercicio){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosEjercicio)
        }
    })
})

//Buscar Exercice por Id
exports.findExerciceById=wrapAsync(async function(req,res,next){
    const id=req.params.id
    await exerciceModel.findById(id,function(err,datosEjercicio){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosEjercicio)
        }
    })
})

//Crear un Exercice
exports.createExercice=wrapAsync(async function(req,res,next){

    const imagen = req.file ? req.file.filename : null//Se verifica si hay imagen ya cargada

    const newExercice= new exerciceModel({...req.body, imagen})

    await exerciceModel.create(newExercice, function(err, datosEjercicioCreado){
        if(err){
            next(new AppError('Error al crear el ejercicio',404))
        }else{
            res.status(201).json(datosEjercicioCreado)
        }
    })
})

//Actualizar un Exercice
exports.updateExercice=wrapAsync(async function (req,res,next){
    const id=req.params.id
    const updateExercice=new exerciceModel(req.body)

    await exerciceModel.update(id, updateExercice, function(err,datosEjercicio){
        if(err|| !datosEjercicio){
            next(new AppError('Error al actualizar el ejercicio',404))
        }else{
            res.status(200).json({message:'Ejercicio editado con exito', datosEjercicio})
        }
    })
})

//Eliminar un Exercice
exports.deleteExercice=wrapAsync(async function (req,res,next){
    const id=req.params.id
    await exerciceModel.delete(id, function(err,datosEjercicio){
        if(err|| !datosEjercicio){
            next(new AppError('Error al eliminar el ejercicio',400))
        }else{
            res.status(200).json({message:'Ejercicio eliminado con exito', datosEjercicio})
        }
    })
})