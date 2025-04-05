const detailModel = require('../models/detalles.model')
const {wrapAsync}=require('../utils/functions')
const AppError=require('../utils/AppError')

//Encontrar todos los detalles
exports.findAllDetails=wrapAsync(async function (req,res, next){

   await detailModel.findAll(function(err,datosDetalle){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosDetalle)
        }
    })
})

//Buscar detalle por Id
exports.findDetailById=wrapAsync(async function(req,res,next){
    const id=req.params.id
    await detailModel.findById(id,function(err,datosDetalle){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosDetalle)
        }
    })
})

//Crear un detalle
exports.createDetail=wrapAsync(async function(req,res,next){
    const newDetail= new detailModel(req.body)

    await detailModel.create(newDetail, function(err, datosDetalleCreado){
        if(err){
            next(new AppError('Error al crear el Detalle',404))
        }else{
            res.status(201).json(datosDetalleCreado)
        }
    })
})

//Actualizar un detalle
exports.updateDetail=wrapAsync(async function (req,res,next){
    const id=req.params.id
    const updateDetail=new detailModel(req.body)

    await detailModel.update(id, updateDetail, function(err,datosDetalle){
        if(err|| !datosDetalle){
            next(new AppError('Error al actualizar el Detalle',404))
        }else{
            res.status(200).json({message:'Detalle editado con exito', datosDetalle})
        }
    })
})

//Eliminar un detalle
exports.deleteDetail=wrapAsync(async function (req,res,next){
    const id=req.params.id
    await detailModel.delete(id, function(err,datosDetalle){
        if(err|| !datosDetalle){
            next(new AppError('Error al eliminar el Detalle',400))
        }else{
            res.status(200).json({message:'Detalle eliminado con exito', datosDetalle})
        }
    })
})