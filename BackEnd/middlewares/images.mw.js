const multer=require('multer')//Multer para el tratamiento y guardado de ficheros(imágenes)
const path=require('path')
const fs=require('fs') //Manejar el sistema de archivos
const AppError=require('../utils/AppError')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        //Carpeta donde se almacenarán los archivos
        cb(null,'public/img_uploaded/')
    },
    filename:(req,file,cb)=>{
        
        cb(null,file.fieldname + '-' + Date.now() +path.extname(file.originalname))
    }
})

//Se filtran los tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
    //Archivos de imagen jpg, png, gif
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype==='image/gif'){
        cb(null, true)//Fichero aceptado
    }else{
        cb(null, false)//Fichero no aceptado
    }
}

exports.upload=multer({storage, fileFilter})

