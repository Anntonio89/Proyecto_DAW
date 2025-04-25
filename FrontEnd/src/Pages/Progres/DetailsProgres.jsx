import {useEffect, useState} from 'react'
import axios from 'axios'
import storage from '../../utils/storage'

function DetailsProgres() {

    const [progreso,setProgreso]=useState([])
    const user=storage.get('authUser')

    useEffect(()=>{
        if(user){
            const fetchProgresos=async()=>{
                try {
                    const res=await axios.get('http://localhost:3015/progres')
                    const progresUser=res.data.filter(progres=>progres.id_usuario===user.id)
                    setProgreso(progresUser)
                } catch (error) {
                    console.error(error)
                }
            }
            fetchProgresos()
        }
    },[user])


    return (
        <div className='progres-details-Container'>
            <h1 className='progres-details-Titulo'>Progreso {user.nombre}</h1>
            <div className='progres-details-Card'>
                {progreso.length > 0 ? (
                    progreso.map((progres, i)=>(
                        <div key={i}>
                            <p><strong>Fecha:</strong>{new Date(progres.fecha).toLocaleDateString()}</p>
                            <p><strong>Peso:</strong>{progres.peso}Kg</p>
                            <p><strong>IMC:</strong>{progres.IMC}</p>
                            <p><strong>Indice Grasa:</strong>{progres.indice_grasa}%</p>
                            <p><strong>Observaciones:</strong>{progres.observaciones}</p>
                        </div>
                    ))
                ):(
                    <p>No hay registros</p>
                )}
            </div>
        </div>
    )
}

export default DetailsProgres