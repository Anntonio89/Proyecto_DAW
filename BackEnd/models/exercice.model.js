const mysql=require('mysql')//Se importa MySQL para manejar la conexion
const dbConn=require('../utils/mysql.config')//Importacion conexion a la DB de MySQL

//Modelo del Exercice (constructro)
let Exercice = function(exercice){
    //Atributos del Exercice
    //id (auto incremental)
    this.nombre=exercice.nombre,
    this.categoria=exercice.categoria,
    this.grupo_muscular=exercice.grupo_muscular,
    this.nivel=exercice.nivel,
    this.descripcion=exercice.descripcion,
    this.imagen=exercice.imagen
}

//Metodos del modelo

//Obtener todos los Exercicees entrenamiento
Exercice.findAll = async function(result){
    //Se crea la conexion
    let connection = mysql.createConnection(dbConn)

    //Se abre la conexion
    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM ejercicios'//SQL para obtener todos los ejercicios
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

//Obtener un ejercicio por su id
Exercice.findById = async function(idExercice, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM ejercicios WHERE id = ?'//SQL para obtener un Exercice
            connection.query(sql, idExercice, (err,datos)=>{
                if(err){
                    result(err,null)
                }else{
                    if(datos.length>0){
                        result(null,datos)//En caso de haber datos, se devuelven
                    }else{
                        result({error: 'No existe el Exercice de entrenamiento'},null)//En caso de no haber datos, se muestra el mensaje
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

//Crear ejercicio
Exercice.create = async function(newExercice, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')

            const sql = 'INSERT INTO ejercicios SET ?'//SQL para insertar un nuevo ejercicio
            connection.query(sql, newExercice, (err,datos)=>{
                if(err){
                    console.log('Error al crear el ejercicio: ' + err)
                    result(err,null)
                }else{
                    result(null, {id: datos.insertId, ...newExercice})//Se devuelven el id del ejercicio creado y el nuevo ejercicio con propagacion para recorrer sus propiedades
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

//Buscar a un Exercice por un filtro
Exercice.findByFilter = async(filter)=>{
    const ExerciceFound=await Exercice.findOne(filter)
    return ExerciceFound
}

//Actualizar un Exercice
Exercice.update = async function(idExercice, updateExercice, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'UPDATE ejercicios SET ? WHERE id = ?'//SQL para obtener un ejercicio
            connection.query(sql, [updateExercice,idExercice], (err,datos)=>{
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


//Borrar un Exercice
Exercice.delete = async function(idExercice, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'DELETE FROM ejercicios WHERE id = ?'//SQL para borrar un ejercicio
            connection.query(sql, idExercice, (err,datos)=>{
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

module.exports = Exercice//Se exporta el modelo