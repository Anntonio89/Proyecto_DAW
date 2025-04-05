const mysql=require('mysql')//Se importa MySQL para manejar la conexion
const dbConn=require('../utils/mysql.config')//Importacion conexion a la DB de MySQL

//Modelo del Detail (constructro)
let Detail = function(detalle){

    //Atributos del detalle
    //id (auto incremental)
    this.id_plan=detalle.id_plan    
    this.id_ejercicio=detalle.id_ejercicio
    this.dia_semana=detalle.dia_semana
    this.series=detalle.series
    this.repeticiones=detalle.repeticiones
    this.descanso=detalle.descanso
    
}

//Metodos del modelo

//Obtener todos los detalles del entrenamiento
Detail.findAll = async function(result){
    //Se crea la conexion
    let connection = mysql.createConnection(dbConn)

    //Se abre la conexion
    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM detalles_plan'//SQL para obtener todos los detalles
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


//Obtener un detalle por su id
Detail.findById = async function(idDetail, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM detalles_plan WHERE id = ?'//SQL para obtener un detalle
            connection.query(sql, idDetail, (err,datos)=>{
                if(err){
                    result(err,null)
                }else{
                    if(datos.length>0){
                        result(null,datos)//En caso de haber datos, se devuelven
                    }else{
                        result({error: 'No existe el detalle de entrenamiento'},null)//En caso de no haber datos, se muestra el mensaje
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

//Crear detalle
Detail.create = async function(newDetail, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')

            const sql = 'INSERT INTO detalles_plan SET ?'//SQL para insertar un nuevo Detail
            connection.query(sql, newDetail, (err,datos)=>{
                if(err){
                    console.log('Error al crear el detalle de entrenamiento: ' + err)
                    result(err,null)
                }else{
                    result(null, {id: datos.insertId, ...newDetail})//Se devuelven el id del Detail creado y el nuevo detalle con propagacion para recorrer sus propiedades
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

//Buscar a un detalle por un filtro
Detail.findByFilter = async(filter)=>{
    const DetailFound=await Detail.findOne(filter)
    return DetailFound
}

//Actualizar un detalle
Detail.update = async function(idDetail, updateDetail, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'UPDATE detalles_plan SET ? WHERE id = ?'//SQL para obtener un detalle
            connection.query(sql, [updateDetail,idDetail], (err,datos)=>{
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


//Borrar un Detail
Detail.delete = async function(idDetail, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'DELETE FROM detalles_plan WHERE id = ?'//SQL para borrar un Detail
            connection.query(sql, idDetail, (err,datos)=>{
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

module.exports = Detail//Se exporta el modelo