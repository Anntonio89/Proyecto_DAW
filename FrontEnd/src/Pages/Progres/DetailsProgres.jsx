import {useEffect, useState} from 'react'
import axiosClient from '../../utils/function'
import storage from '../../utils/storage'
import { NavLink } from 'react-router-dom'


function DetailsProgres() {

    const [progreso,setProgreso]=useState([])
    const [entrenador,setEntrenador]=useState(false)
    const [user]=useState(storage.get('authUser'))

    useEffect(()=>{
        if(user){
            const user=storage.get('authUser')

            if(user.rol==='ENTRENADOR'){
                setEntrenador(true)     
            }
            const fetchProgresos=async()=>{
                try {
                    const res=await axiosClient.get('http://localhost:3015/progres/progres')
                    setProgreso(res.data)
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
                     progreso
                     .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) 
                     .map((progres, i)=>(
                        <div key={i} className={i === 0 ? 'progres-card destacada' : 'progres-card'}>
                               {i === 0 && <span className='etiqueta-ultimo'>Último</span>}
                            <p><strong>Fecha: </strong>{new Date(progres.fecha).toLocaleDateString()}</p>
                            <p><strong>Peso: </strong>{progres.peso}Kg</p>
                            <p><strong>IMC: </strong>{progres.IMC}</p>
                            <p><strong>Indice Grasa: </strong>{progres.indice_grasa}%</p>
                            <p><strong>Observaciones: </strong>{progres.observaciones}</p>
                        </div>
                      ))
                    ):(
                        <p>No hay registros</p>
                    )}
                
                <NavLink to='/login' className='link-Error'>Volver</NavLink>
            </div>
        </div>
    )
}

export default DetailsProgres