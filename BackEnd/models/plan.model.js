const mysql=require('mysql')//Se importa MySQL para manejar la conexion
const dbConn=require('../utils/mysql.config')//Importacion conexion a la DB de MySQL

//Modelo del plan (constructro)
let Plan = function(plan){
    //Atributos del plan
    //id (auto incremental)
    this.id_entrenador=plan.id_entrenador
    this.plan=plan.plan
    this.nivel=plan.nivel 
    this.createdDate=new Date()
    this.modifiedDate=new Date()
}

//Metodos del modelo

//Obtener todos los planes entrenamiento
Plan.findAll = async function(result){
    //Se crea la conexion
    let connection = mysql.createConnection(dbConn)

    //Se abre la conexion
    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM planes_entrenamiento'//SQL para obtener todos los planes_entrenamiento
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


//Obtener un plan por su id
Plan.findById = async function(idPlan, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'SELECT * FROM planes_entrenamiento WHERE id = ?'//SQL para obtener un plan
            connection.query(sql, idPlan, (err,datos)=>{
                if(err){
                    result(err,null)
                }else{
                    if(datos.length>0){
                        result(null,datos)//En caso de haber datos, se devuelven
                    }else{
                        result({error: 'No existe el plan de entrenamiento'},null)//En caso de no haber datos, se muestra el mensaje
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

//Crear plan
Plan.create = async function(newPlan, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')

            const sql = 'INSERT INTO planes_entrenamiento SET ?'//SQL para insertar un nuevo plan
            connection.query(sql, newPlan, (err,datos)=>{
                if(err){
                    console.log('Error al crear el plan de entrenamiento: ' + err)
                    result(err,null)
                }else{
                    result(null, {id: datos.insertId, ...newPlan})//Se devuelven el id del plan creado y el nuevo plan con propagacion para recorrer sus propiedades
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

//Buscar a un plan por un filtro
Plan.findByFilter = async(filter)=>{
    const PlanFound=await Plan.findOne(filter)
    return PlanFound
}

//Actualizar un plan
Plan.update = async function(idPlan, updatePlan, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'UPDATE planes_entrenamiento SET ? WHERE id = ?'//SQL para obtener un plan
            connection.query(sql, [updatePlan,idPlan], (err,datos)=>{
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


//Borrar un plan
Plan.delete = async function(idPlan, result){

    let connection=mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if(error){
            console.log('Error con la conexión a MySQL. Des: ' + error)
            result(err,null)
        }else{
            console.log('Conexión a MySQL abierta')
            const sql = 'DELETE FROM planes_entrenamiento WHERE id = ?'//SQL para borrar un plan
            connection.query(sql, idPlan, (err,datos)=>{
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

module.exports = Plan//Se exporta el modelo