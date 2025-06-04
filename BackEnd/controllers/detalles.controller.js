const detailModel = require('../models/detalles.model')
const {wrapAsync}=require('../utils/functions')
const AppError=require('../utils/AppError')

//Encontrar todos los detalles
exports.findAllDetails=wrapAsync(async function (req,res, next){

   await detailModel.findAll(function(err,datosDetalle){
        if(err){
            return next(new AppError(err,404))
        }else{
            res.status(200).json(datosDetalle)
        }
    })
})

//Buscar detalle por Id
exports.findDetailById=wrapAsync(async function(req,res,next){

    const idPlan=req.params.id
    const idUser=req.user.id
    const rol=req.user.rol

    await detailModel.findById(idPlan,function(err,datosDetalle){
        if(err){
            return next(new AppError(err,404))
        }
        else if(!datosDetalle || datosDetalle.id_usuario !== idUser && rol !== 'ENTRENADOR' && rol !== 'ADMIN'){//Verifica si el detalle pertenece al usuario
            return next(new AppError('Sin permiso para ver el plan',403))//403 Forbidden
        }
        else{
            res.status(200).json(datosDetalle)
        }
    })
})

//Crear un detalle
exports.createDetail=wrapAsync(async function(req,res,next){
    
    const newDetail= new detailModel({
        id_plan:req.body.id_plan,
        id_ejercicio:req.body.id_ejercicio,
        dia_semana:req.body.dia_semana,
        series:req.body.series,
        repeticiones:req.body.repeticiones,
        descanso:req.body.descanso
    })
    const filtro ={
        id_plan: newDetail.id_plan, 
        id_ejercicio: newDetail.id_ejercicio, 
        dia_semana: newDetail.dia_semana
    }

    await detailModel.findByFilter(filtro, async function(err, datosDetalle){
        if(err){//Se busca si existe un detalle con el mismo plan y ejercicio
            return next(new AppError('Error al buscar el detalle',500))
        }else if(datosDetalle){
            return next(new AppError('El detalle ya existe con ese plan, ejercicio y dia', 409))//409 Conflicto
        } else{           
            
            await detailModel.create(newDetail, function(err, datosDetalleCreado){
                if(err){                  
                    return next(new AppError('Error al crear el Detalle',500))                    
                }else{
                    res.status(201).json(datosDetalleCreado)
                }
            })
        }
    })
    
})

//Actualizar un detalle
exports.updateDetail=wrapAsync(async function (req,res,next){
    const id=req.params.id
    const idUser=req.user.id
    const rol=req.user.rol

    const updateDetail=new detailModel(req.body)

    // Verificar si el detalle existe y pertenece al usuario (seguridad)
    await detailModel.findById(id, async function(err, detalleActual) {
        if (err || !detalleActual) {
            return next(new AppError('Detalle no encontrado', 404))
        }

        console.log('Rol del usuario:', rol)
        // Si no es el dueño del plan asociado al detalle y no es entrenador --> prohibido
        if (detalleActual.id_usuario !== idUser && rol !== 'ENTRENADOR' && rol !== 'ADMIN') {
            return next(new AppError('Sin permiso para modificar este detalle', 403))
        }

        // Verificar si ya existe un detalle con mismo plan, ejercicio y día (duplicado)
        const filtro = {
            id_plan: updateDetail.id_plan,
            id_ejercicio: updateDetail.id_ejercicio,
            dia_semana: updateDetail.dia_semana
        }

        await detailModel.findByFilter(filtro, async function(err, detalleDuplicado) {
            if (err) {
                return next(new AppError('Error al buscar duplicados', 500))
            }

            // Si existe un duplicado y es diferente del que se está editando
            if (detalleDuplicado && detalleDuplicado.id != id) {
                return next(new AppError('El detalle ya existe con ese plan, ejercicio y día', 409))
            }

            await detailModel.update(id, updateDetail, function(err,datosDetalle){
                if(err|| !datosDetalle){                
                    return next(new AppError('Error al actualizar el Detalle',500))                
                }else{
                    res.status(200).json({message:'Detalle editado con exito', datosDetalle})
                }
            })
        })
    })
})

//Eliminar un detalle
exports.deleteDetail=wrapAsync(async function (req,res,next){
    const id=req.params.id
    await detailModel.delete(id, function(err,datosDetalle){
        if(err|| !datosDetalle){
            return next(new AppError('Error al eliminar el Detalle',400))
        }else{
            res.status(200).json({message:'Detalle eliminado con exito', datosDetalle})
        }
    })
})