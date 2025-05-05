const AppError=require('../utils/AppError')

const checkProfile=(req,profileParam)=>{
    if(req.session &&
        req.session.userLogued &&
        req.session.userLogued.data &&
        req.session.userLogued.data.rol==profileParam
    ){
        return true
    }else{
        return false
    }
}

//ADMINISTRADOR PERMISOS GLOBALES (TODO)
exports.requireAdmin=(req,res,next)=>{
    if(checkProfile(req,'ADMIN')){
        next()
    }else{
        next(new AppError('Acceso Denegado',403))
    }
}
/*ENTRENADOR PUEDE:
    - VER USUARIOS
    - VER PLANES
    - CREAR PLANES
    - MODIFICAR PLANES
    - CREAR EJERCICIOS
    - MODIFICAR EJERCICIOS
    - CREAR PROGRESOS
    - VER PROGRESOS
    - MODIFICAR PROGRESOS
NO PUEDE:
    - ELIMINAR USUARIO
*/

exports.requireCoach=(req,res,next)=>{
    if(checkProfile(req,'ENTRENADOR') || checkProfile(req,'ADMIN')){
        //console.log(res)
        next()
    }else{
        //console.log(res)
        next(new AppError('Acceso Denegado',403))
    }
}

