import {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function ProgresList() {

    const [progres,setProgres]=useState([])

    useEffect(()=>{
        const fetchprogres=async()=>{
            try {
                const res=await axiosClient.get('http://localhost:3015/progres')
                setProgres(res.data)      
                console.log('Progresos: ' , res.data)          
            } catch (error) {
                Swal.fire({
                    title:'Error',
                    text:'Error al obtener progresos',
                    icon:'error',
                    background:'black',
                     confirmButtonColor: '#d1006a',
                    confirmButtonText:'Volver'
                }) 
            }
        }
        fetchprogres()
    },[])

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el progreso.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d1006a',
            cancelButtonColor: 'black',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: 'black',
            color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3015/progres/${id}`)
                    setProgres(prev => prev.filter(e => e.id !== id))
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El progreso ha sido eliminado.',
                        icon: 'success',
                        background: 'black',
                        color: '#fff',
                        confirmButtonColor: '#d1006a'
                    })
                } catch (err) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el progreso.',
                        icon: 'error',
                        background: 'black',
                        confirmButtonColor: '#d1006a'
                    })
                }
            }
        })
    }

    return (
        <div className='container exercice-Container mt-4'>
            {progres.length>0?(
                <table className='table table text-center'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>ID Usuario</th>
                            <th>Usuario</th>
                            <th>ID Plan</th>
                            <th>Plan</th>
                            <th>Fecha</th>
                            <th>Peso (Kg)</th>
                            <th>IMC</th>
                            <th>Grasa (%)</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {progres.map((progres)=>(
                        <tr key={progres.id}>
                            <td>{progres.id_usuario}</td>
                            <td>{progres.nombre_usuario}</td>
                            <td>{progres.id_plan}</td>
                            <td>{progres.nombre_plan}</td>
                            <td>{new Date(progres.fecha).toLocaleDateString()}</td>
                            <td>{progres.peso}</td>
                            <td>{progres.IMC}</td>
                            <td>{progres.indice_grasa}</td>
                            <td>{progres.observaciones}</td>
                            <td>
                            <NavLink to={`/progresEdit/${progres.id}`}>
                                <button className='btn-custom-edit'>Editar</button>
                            </NavLink>
                                <button className='btn-custom-delete'onClick={()=>handleDelete(progres.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            ):(
                <p>No hay progresos disponibles</p>
            )}
            
        </div>
    )
}

export default ProgresList