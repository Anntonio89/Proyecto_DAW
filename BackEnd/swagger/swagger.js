//Configuración swagger
require("dotenv").config()
const swaggerJSDoc=require("swagger-jsdoc")

//Objeto opciones
const options={
    definition:{
        openapi:'3.0.0',//Objeto openanpi version 3.0.0
        info:{
            title:"Proyecto DAW",
            version:process.env.API_VERSION,
            contact:{
                name:"Antonio Martínez Oliver"
            },
            servers:[
                {
                    url:"http://localhost:"+process.env.PUERTO,//URL del servidor
                    description:"Local Server"
                },
            ]
        }
    },
    apis:['./routes/*js']//Se documentan todos los archivos del tipo js que estén en el archivo de rutas
}

const specs =swaggerJSDoc(options)//Especificiaciones
module.exports=specs//Se exportan las especificaciones