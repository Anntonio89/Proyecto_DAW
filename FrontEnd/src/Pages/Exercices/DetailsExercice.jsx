import {useEffect, useState} from 'react'
import axiosClient from '../../utils/function'
import { useParams } from 'react-router-dom'

function DetailsExercice() {

    const [exercice,setExercice]=useState(null)
    const {id} = useParams()

    useEffect(()=>{
        const fetchExercices=async()=>{
                try {
                    const res=await axiosClient.get(`http://localhost:3015/exercice/${id}`)
                    setExercice(res.data[0])
                } catch (error) {
                    console.error(error)
                }
            }
            fetchExercices()
        
    },[id])

    return (
        <div className='exer-details-Container'>
            <div className='exer-details-Card'>
                {exercice ? (
                        <div>
                            <h2><strong>{exercice.nombre}</strong></h2>
                            <img src={`http://localhost:3015/img_uploaded/${exercice.imagen}`} alt={exercice.nombre} style={{maxWidth:'200px', height:'auto'}} className='img-fluid'/>
                            <p><strong>Categoria:</strong>{exercice.categoria}</p>
                            <p><strong>Grupo Muscular:</strong>{exercice.grupo_muscular}</p>
                            <p><strong>Nivel:</strong>{exercice.nivel}</p>
                            <p><strong>Descripcion:</strong>{exercice.descripcion}</p>
                        </div>                   
                ):(
                    <p>No hay registros</p>
                )}
            </div>
        </div>
    )
}

export default DetailsExercice