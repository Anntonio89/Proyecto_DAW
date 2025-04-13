require('dotenv').config()
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

function extractToken(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        return req.headers.authorization.split(' ')[1]
    }else if(req.query && req.query.token){
        return (req.query.token)
    } else if (req.session && req.session.userLogued && req.session.userLogued.token){
        return req.session.userLogued.token
    }else{
        return null
    }
}

exports.authenticate = (req,res,next)=>{
    const token = extractToken(req)
    if(token){
        jwt.verify(token, process.env.SECRET_KEY),(err,decoded)=>{
            if(err){
                next (new AppError('Token no válida',401))
            }else{
                next()
                //console.log(decoded)
            }
        }
    }else{
        next(new AppError('No hay token',401))
    }
}

exports.createJWT=(req,res,next,userData)=>{
    try{
        const token = jwt.sign({userData},process.env.SECRET_KEY,{expiresIn:1440})//expira en 10 minutos
        if(token){
            return token
        }else{
            return null
        }
    
    }catch(error){
        next(new AppError(error.message,500))
    }
}

exports.destroyJWT =(req)=>{
    if(!req.session || !req.session.userLogued || !req.session.userLogued.token){
        return false
    }
    try {
        jwt.sign({}, req.session.userLogued.token,{expiresIn:1})//JWT que expira inmediatamente
        req.session.userLogued.token=null//JWT eliminado desde la session
        return true
    } catch (error) {
        next(new AppError(error.message,500))
        return false
    }
}