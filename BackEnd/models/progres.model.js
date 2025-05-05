const mysql=require('mysql')//Se importa MySQL para manejar la conexion
const dbConn=require('../utils/mysql.config')//Importacion conexion a la DB de MySQL

//Modelo del Progres (constructro)
let Progres = function(progreso){

    //Atributos del progreso
    //id (auto incremental)
    this.id_usuario=progreso.id_usuario
    this.id_plan=progreso.id_plan
    this.fecha=new Date()
    this.peso=progreso.peso
    this.IMC=progreso.IMC
    this.indice_grasa=progreso.indice_grasa
    this.observaciones=progreso.observaciones
    
}

//Metodos del modelo

//Obtener todos los progresos del entrenamiento
Progres.findAll = async function(result){
    //Se crea la conexion
    let connection = mysql.createConnection(dbConn)

    //Se abre la conexion
    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM progresos'//SQL para obtener todos los progresos
            //Se ejecuta la consulta
            connection.query(sql, function(err, datos){//En caso de error se muestra el error, en caso contrario se devuelven los datos
                if(err){
                    result(err,null) 
                }else{
                    result(null,datos)
                }
            })
            //Se cierra la conexion
            connection.end((err) => {
                if(err){//Si hay error se muestra el error, si no se muestra el mensaje y se cierra la conexion
                    console.log('Error al desconectar de MySQL. Des: ' + err)
                }else{
                    console.log('Conexion MySQL cerrada')
                }
            })
        }
    })
}


//Obtener un progreso por su id
Progres.findById = async function(idProgres, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM progresos WHERE id = ?'//SQL para obtener un progreso
            connection.query(sql, idProgres, (err,datos)=>{
                if(err){
                    result(err,null)
                }else{
                    if(datos.length>0){
                        result(null,datos)//En caso de haber datos, se devuelven
                    }else{
                        result({error: 'No existe el progreso de entrenamiento'},null)//En caso de no haber datos, se muestra el mensaje
                    }
                }
            })

            //Se cierra la conexion
            connection.end((err)=>{
                if(err){
                    console.log('Error al desconectar de MySQL. Des: ' + err)
                }else{
                    console.log('Conexion MySQL cerrada')
                }
            })
        }
    })
}

//Crear progreso
Progres.create = async function(newProgres, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')

            const sql = 'INSERT INTO progresos SET ?'//SQL para insertar un nuevo Progres
            connection.query(sql, newProgres, (err,datos)=>{
                if(err){
                    console.log('Error al crear el progreso de entrenamiento: ' + err)
                    result(err,null)
                }else{
                    result(null, {id: datos.insertId, ...newProgres})//Se devuelven el id del Progres creado y el nuevo progreso con propagacion para recorrer sus propiedades
                }
            })
            connection.end((err)=>{
                if(err){
                    console.log('Error al desconectar de MySQL. Des: ' + err)
                }else{
                    console.log('Conexion MySQL cerrada')
                }
            })
        }
    })
}

//Actualizar un progreso
Progres.update = async function(idProgres, updateProgres, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'UPDATE progresos SET ? WHERE id = ?'//SQL para obtener un progreso
            connection.query(sql, [updateProgres,idProgres], (err,datos)=>{
                if(err){
                    result(err,null)
                }else{
                    result(null,datos)//En caso que no haya error, se devuelven los datos
                }
            })

            connection.end((err)=>{
                if(err){
                    console.log('Error al desconectar de MySQL. Des: ' + err)
                }else{
                    console.log('Conexion MySQL cerrada')
                }
            })
        }
    })
}


//Borrar un Progres
Progres.delete = async function(idProgres, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'DELETE FROM progresos WHERE id = ?'//SQL para borrar un Progres
            connection.query(sql, idProgres, (err,datos)=>{
                if(err){
                    result(err,null)
                }else{
                   result(null, datos)
                }
            })

            connection.end((err)=>{
                if(err){
                    console.log('Error al desconectar de MySQL. Des: ' + err)
                }else{
                    console.log('Conexion MySQL cerrada')
                }
            })
        }
    })
}

//Buscar a un progreso por un filtro (id_usuario)
Progres.findByFilter = async(userId, result)=>{

    let connection = mysql.createConnection(dbConn)

    connection.connect((error) => {
        if (error) {
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(error, null)
        } else {
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM progresos WHERE id_usuario = ?'
            connection.query(sql, [userId], (err, datos) => {
                if (err) {
                    result(err, null)
                } else {
                    result(null, datos)
                }
            })
            connection.end((err) => {
                if (err) {
                    console.log('Error al desconectar de MySQL. Des: ' + err)
                } else {
                    console.log('Conexión MySQL cerrada')
                }
            })
        }
    })
}

module.exports = Progres//Se exporta el modelo