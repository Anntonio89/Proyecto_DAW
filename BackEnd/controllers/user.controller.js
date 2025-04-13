const userModel = require('../models/user.model')
const {wrapAsync}=require('../utils/functions')
const AppError=require('../utils/AppError')
const bcrypt=require('../utils/bcrypt')
const jwt=require('../middlewares/jwt.mw')

exports.login=wrapAsync(async(req,res,next)=>{
    const {email,password}=req.body
    await userModel.findByEmail(email,async function(err, userFound){
        if(err){
            next (new AppError(err,404))
        }else{
            const valid= await bcrypt.compareLogin(password,userFound.password)
            if(valid){
                const jwtToken=jwt.createJWT(req,res,next,userFound)
                const userLogued={
                    data:userFound,
                    token:jwtToken
                }
                req.session.userLogued=userLogued//Token guardado en sesion de usuario
                res.status(200).json(userLogued)
            }else{
                next(new AppError('Usuario y/o contraseña incorrectos',401))
            }
        }
    })
})

exports.logout=(req,res,next)=>{
    req.session.destroy()
    res.status(200).json({message:'Sesión cerrada con éxito'})
}

// *********************SHOW LOGIN Y SHOWDATAUSER***************************
//************************************************************************** 

//Encontrar todos los usuarios
exports.findAllUsers=wrapAsync(async function (req,res, next){

   await userModel.findAll(function(err,datosUsuarios){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosUsuarios)
        }
    })
})

//Buscar usuario por Id
exports.findUserById=wrapAsync(async function(req,res,next){
    const id=req.params.id
    await userModel.findById(id,function(err,datosUsuario){
        if(err){
            next(new AppError(err,404))
        }else{
            res.status(200).json(datosUsuario)
        }
    })
})

//Crear un usuario
exports.createUser=wrapAsync(async function(req,res,next){
    const newUser= new userModel(req.body)

    newUser.password=await bcrypt.hashPassword(newUser.password)//Se encripta la contraseña al crear al usuario nuevo

    await userModel.create(newUser, function(err, datosUsuarioCreado){
        if(err){
            next(new AppError('Error al crear el usuario',404))
        }else{
            res.status(201).json(datosUsuarioCreado)
        }
    })
})

//Actualizar un usuario
exports.updateUser=wrapAsync(async function (req,res,next){
    const id=req.params.id
    const updateUser=new userModel(req.body)

    updateUser.password=await bcrypt.hashPassword(updateUser.password)//Se encripta la contraseña al crear al usuario nuevo

    await userModel.update(id, updateUser, function(err,datosUsuario){
        if(err|| !datosUsuario){
            next(new AppError('Error al actualizar el usuario',404))
        }else{
            res.status(200).json({message:'Usuario editado con exito', datosUsuario})
        }
    })
})

//Eliminar un usuario
exports.deleteUser=wrapAsync(async function (req,res,next){
    const id=req.params.id
    await userModel.delete(id, function(err,datosUsuario){
        if(err|| !datosUsuario){
            next(new AppError('Error al eliminar el usuario',400))
        }else{
            res.status(200).json({message:'Usuario eliminado con exito', datosUsuario})
        }
    })
})