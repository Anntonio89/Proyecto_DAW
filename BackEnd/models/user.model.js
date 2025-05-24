const mysql=require('mysql')//Se importa MySQL para manejar la conexion
const dbConn=require('../utils/mysql.config')//Importacion conexion a la DB de MySQL

//Modelo del usuario (constructro)
let User = function(usuario){
    //Atributos del usuario
    //id (auto incremental)
    this.nombre = usuario.nombre
    this.apellidos=usuario.apellidos
    this.email=usuario.email
    this.password=usuario.password
    this.altura=usuario.altura
    this.peso=usuario.peso
    this.edad=usuario.edad
    this.sexo=usuario.sexo
    this.rol=usuario.rol ||'USUARIO'  //('ADMIN','ENTRENADOR','USUARIO'). Rol por defecto Usuario al registrarse

}

//Metodos del modelo

//Obtener todos los usuarios
User.findAll = async function(result){
    //Se crea la conexion
    let connection = mysql.createConnection(dbConn)

    //Se abre la conexion
    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(error,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM usuarios'//SQL para obtener todos los usuarios
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


//Obtener un usuairo por su id
User.findById = async function(idUser, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM usuarios WHERE id = ?'//SQL para obtener un usuario
            connection.query(sql, idUser, (err,datos)=>{
                if(err){
                    result(err,null)
                }else{
                    if(datos.length>0){
                        result(null,datos)//En caso de haber datos, se devuelven
                    }else{
                        result({error: 'No existe el usuario'},null)//En caso de no haber datos, se muestra el mensaje
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

//Crear usuario
User.create = async function(newUser, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(error,null)
        }else{
            console.log('Conexión a MySQL abierta')

            newUser.rol='USUARIO'//Por defecto siempre será usuario

            const sql = 'INSERT INTO usuarios SET ?'//SQL para insertar un nuevo usuario
            connection.query(sql, newUser, (err,datos)=>{
                if(err){
                    console.log('Error al crear el usuario: ' + err)
                    result(err,null)
                }else{
                    result(null, {id: datos.insertId, ...newUser})//Se devuelven el id del usuario creado y el nuevo usuario con propagacion para recorrer sus propiedades
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

//Obtener por email (identificador del usuario al loguearse)
User.findByEmail = async function(userEmailParam, result){
    //Se crea la conexion
    let connection = mysql.createConnection(dbConn)

    //Se abre la conexion
    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(error,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM usuarios WHERE email=?'//SQL para obtener usuarios por su email
            //Se ejecuta la consulta
            connection.query(sql, [userEmailParam], (err, datos)=>{//En caso de error se muestra el error, en caso contrario se devuelven los datos
                if (err) {
                    result(err, null)
                } else {
                    if (datos.length > 0) {
                        result(null, datos[0]) //Devolver el primer usuario encontrado
                    } else {
                        result("No hay datos del usuario", null)
                    }
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

//Buscar a un usuario por un filtro
User.findByFilter = async(filter)=>{
    const userFound=await User.findOne(filter)
    return userFound
}

//Actualizar un usuario
User.update = async function(idUser, updateUser, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(error,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'UPDATE usuarios SET ? WHERE id = ?'//SQL para obtener un usuario
            connection.query(sql, [updateUser,idUser], (err,datos)=>{
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


//Borrar un usuario
User.delete = async function(idUser, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(error,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'DELETE FROM usuarios WHERE id = ?'//SQL para obtener un usuario
            connection.query(sql, idUser, (err,datos)=>{
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

module.exports = User//Se exporta el modelo