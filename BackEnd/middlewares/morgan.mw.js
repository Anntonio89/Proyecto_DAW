require("dotenv").config()//Para cargar las variables de entorno
const morgan = require("morgan")//Middleware morgan para registrar solicitudes HTTP
const fs = require("fs")//Para trabajar con sistema de archivos
const express = require("express")
const app = express()
const ruta = process.env.LOGS_FOLDER//Ruta obtenida de la variable de entorno

//Se exporta morgan como middleware
exports.usingMorgan = () => {

    // Si no estamos en desarrollo, pasamos 'null' para stream
    return morgan("combined", {    //Si esta en desarrollo, se guardan los logs en el archivo
        stream: app.get("env") === "development" ? fs.createWriteStream(ruta + "access.log", {flags: "a"}) : process.stdout //En produccion, se muestra los logs en la consola
    })
}