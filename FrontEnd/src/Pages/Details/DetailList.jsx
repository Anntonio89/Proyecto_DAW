import {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function DetailList() {

    const [detail,setDetail]=useState([])

    useEffect(()=>{
        const fetchdetail=async()=>{
            try {
                const res=await axiosClient.get('/details')
                setDetail(res.data)      
                console.log('detalles: ' , res.data)          
            } catch (error) {
                Swal.fire({
                    title:'Error',
                    text:'Error al obtener detalles',
                    icon:'error',
                    background:'black',
                     confirmButtonColor: '#d1006a',
                    confirmButtonText:'Volver'
                }) 
            }
        }
        fetchdetail()
    },[])

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el detalle.',
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
                    await axiosClient.delete(`/details/${id}`)
                    setDetail(prev => prev.filter(e => e.id !== id))
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El detalle ha sido eliminado.',
                        icon: 'success',
                        background: 'black',
                        color: '#fff',
                        confirmButtonColor: '#d1006a'
                    })
                } catch (err) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el detalle.',
                        icon: 'error',
                        background: 'black',
                        confirmButtonColor: '#d1006a'
                    })
                }
            }
        })
    }

    return (
        <div className='List'>
            <div className='container exercice-Container mt-4'>
                <NavLink to={`/createDetails`}>
                    <button className='btn-custom-edit'>ASIGNAR A PLAN</button>
                </NavLink>
                {detail.length>0?(
                    <table className='table table text-center'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Plan</th>
                                <th>Ejercicio</th>
                                <th>Dia Semana</th>
                                <th>Series</th>
                                <th>Repeticiones</th>
                                <th>Descanso(min) </th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.map((detail)=>(
                            <tr key={detail.id}>
                                <td>{detail.nombre_plan}</td>
                                <td>{detail.nombre_ejercicio}</td>
                                <td>{detail.dia_semana}</td>
                                <td>{detail.series}</td>
                                <td>{detail.repeticiones}</td>
                                <td>{detail.descanso}</td>
                                <td>
                                <NavLink to={`/detailEdit/${detail.id}`}>
                                    <button className='btn-custom-edit'>Editar</button>
                                </NavLink>
                                    <button className='btn-custom-delete'onClick={()=>handleDelete(detail.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>                
                ):(
                    <p>No hay detalles disponibles</p>
                )}
                
            </div>
        </div>
    )
}

export default DetailList