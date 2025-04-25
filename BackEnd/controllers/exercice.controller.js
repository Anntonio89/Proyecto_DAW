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

    //Se crean los ejercicios con los campos del body y la imagen
    const newExercice= new exerciceModel({
        nombre:req.body.nombre,
        categoria:req.body.categoria,
        grupo_muscular: req.body.grupo_muscular,
        nivel:req.body.nivel,
        descripcion:req.body.descripcion,
        imagen:req.body.imagen
    })

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

    const imagen = req.file ? req.file.filename : req.body.imagen || null//Si ya hay imagen, se emplea, si no se usa el que se envia desde el body o si no null.
    //Se permite actualizar la imagen del ejercicio
    const updateExer={ 
        nombre:req.body.nombre|| null,
        categoria:req.body.categoria|| null,
        grupo_muscular: req.body.grupo_muscular|| null,
        nivel:req.body.nivel|| null,
        descripcion:req.body.descripcion|| null,
        imagen:req.body.imagen || imagen
    }

    const updateExercice = new exerciceModel(updateExer)

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