require('dotenv').config()//Se cargan las variables de entorno declaradas para la configuración de la DB

//Parámetros de conexión
const dbConn={
    host:process.env.DB_HOST,//HOST
    port:process.env.DB_PORT,//PUERTO
    user:process.env.DB_USER,//USUARIO
    password:process.env.DB_PWD,//CONTRASEÑA
    database:process.env.DB_DATABASE_NAME//NOMBRE DE LA DB
}

module.exports=dbConn//Exportacion de la conexion a la DB