//IMPORTS/REQUIRE
require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')
const port = process.env.PUERTO || process.env.PORT;
const mySQLConfig=require('./utils/mysql.config')
const methodOverride=require('method-override')
const session = require('express-session')
const userRoutes=require('./routes/user.routes')
const planRoutes=require('./routes/plan.routes')
const exerciceRoutes=require('./routes/exercice.routes')
const progresRoutes = require('./routes/progres.route')
const detailsRoutes = require('./routes/detalles.routes')

//MIDDLEWARES
const morganMW=require("./middlewares/morgan.mw")
const logger=require('./utils/logger')
const errorHandlerMW=require('./middlewares/errorHandler.mw')
const AppError=require('./utils/AppError')
const cors=require('cors')

//CONFIGURACIONES
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))//Permite leer datos (request body) en metodos post
app.use(express.json())//Para leer datos JSON en req body de POST

const whitelist=['http://localhost:3015','http://127.0.0.1:3015','http://localhost:5173','http://127.0.0.1.5173']

const corsOptions={
    origin:(origin,callback)=>{
        //Se permite la conexión externa (FrontEnd) y conexiones internas desde el propio API
        if(whitelist.includes(origin) || !origin){
            callback(null,true)
        }else{
            callback(new AppError('Conexión no permitida',403))
        }
    },
    credentials:true//Se envia la cookie
}
app.use(cors(corsOptions))

// app.use(cors())//Cors abierto a todo

app.use(morganMW.usingMorgan())

app.use(session({
    name:"connect.sid",
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxage:3600000,
        sameSite:"none"
    }
}))

//RUTAS
app.use('/users',userRoutes)
app.use('/plan',planRoutes)
app.use('/exercice',exerciceRoutes)
app.use('/progres',progresRoutes)
app.use('/details',detailsRoutes)

app.use((req,res)=>{
    logger.error.fatal('NO EXISTE LA RUTA' +req.originalUrl)
    throw new AppError('NO EXISTE LA RUTA', 404)
})

//gestión de errores sincronos y asincronos
app.use(errorHandlerMW.errorHandler)

//LEVANTAR EL SERVER
app.listen(port, () => {
    console.log(`${process.env.MENSAJE} http://localhost:${port}/users`)
    logger.access.info(`${process.env.MENSAJE} http://localhost:${port}/users`)

    try{
        const connection = mysql.createConnection(mySQLConfig)
        connection.connect((err)=>{
            if(err){
                console.log('ERROR AL CONECTAR CON MYSQL. Desc' + err.stack)
                process.exit(0)
            }else{
                console.log('¡¡Conectado a MySQL!!')
            }
        })
    }catch(error){
        console.log(`ERROR EN EL SERVER. Descripción: ${error}`)
        process.exit(0)
    }
})
