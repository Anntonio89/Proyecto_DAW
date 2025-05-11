import {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function PlanList() {

    const [plan,setPlan]=useState([])

    useEffect(()=>{
        const fetchplan=async()=>{
            try {
                const res=await axiosClient.get('/plan')
                setPlan(res.data)      
                console.log('Planes: ' , res.data)          
            } catch (error) {
                Swal.fire({
                    title:'Error',
                    text:'Error al obtener planes',
                    icon:'error',
                    background:'black',
                     confirmButtonColor: '#d1006a',
                    confirmButtonText:'Volver'
                }) 
            }
        }
        fetchplan()
    },[])

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el plan.',
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
                    await axiosClient.delete(`/plan/${id}`)
                    setPlan(prev => prev.filter(e => e.id !== id))
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El plan ha sido eliminado.',
                        icon: 'success',
                        background: 'black',
                        color: '#fff',
                        confirmButtonColor: '#d1006a'
                    })
                } catch (err) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el plano.',
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
                <NavLink to={`/createPlan`}>
                    <button className='btn-custom-edit'>CREAR PLAN</button>
                </NavLink>
                <NavLink to={`/detailsList`}>
                    <button className='btn-custom-edit'>VER DETALLES</button>
                </NavLink>
                {plan.length>0?(
                    <table className='table table text-center'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Entrenador</th>
                                <th>Plan</th>
                                <th>Nivel</th>
                                <th>Fecha Creación</th>
                                <th>Fecha Modificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plan.map((plan)=>(
                            <tr key={plan.id}>
                                <td>{plan.id}</td>
                                <td>{plan.id_entrenador}</td>
                                <td>{plan.plan}</td>
                                <td>{plan.nivel}</td>
                                <td>{new Date(plan.createdDate).toLocaleDateString()}</td>
                                <td>{new Date(plan.modifiedDate).toLocaleDateString()}</td>
                                <td>
                                <NavLink to={`/planDetails/${plan.id}`}>
                                    <button className='btn-custom-delete'>Detalles</button>
                                </NavLink>
                                <NavLink to={`/planEdit/${plan.id}`}>
                                    <button className='btn-custom-edit'>Editar</button>
                                </NavLink>
                                    <button className='btn-custom-delete'onClick={()=>handleDelete(plan.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>                
                ):(
                    <p>No hay planes disponibles</p>
                )}
                
            </div>
        </div>
    )
}

export default PlanList