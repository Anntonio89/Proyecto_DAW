const bcrypt=require('bcrypt')

exports.hashPassword=async(cadenaTextoPlano)=>{
    return await bcrypt.hash(cadenaTextoPlano,12)
}

exports.compareLogin=async(cadenaTextoPlano,cadenaCodificada)=>{
    const result=await bcrypt.compare(cadenaTextoPlano,cadenaCodificada)

    if(result){
        return true//Si la comparación es correcta las contraseñas coinciden si no, no coinciden
    }else{
        return false
    }
}