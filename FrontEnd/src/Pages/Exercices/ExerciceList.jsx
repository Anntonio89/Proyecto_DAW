import {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from '../../utils/function'
import storage from '../../utils/storage'
import Swal from 'sweetalert2'

function ExerciceList() {

    const [exercices,setExercices]=useState([])
    const [entrenador,setEntrenador]=useState(false)

    useEffect(()=>{

        const user=storage.get('authUser')

        if(user.rol==='ENTRENADOR'){
            setEntrenador(true)
        }

        const fetchEjercicios=async()=>{
            try {
                const res=await axiosClient.get('http://localhost:3015/exercice')
                setExercices(res.data)      
                console.log('Ejercicios: ' , res.data)          
            } catch (error) {
                Swal.fire({
                    title:'Error',
                    text:'Error al obtener ejercicios',
                    icon:'error',
                    background:'black',
                     confirmButtonColor: '#d1006a',
                    confirmButtonText:'Volver'
                }) 
            }
        }
        fetchEjercicios()
    },[])

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el ejercicio.',
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
                    await axiosClient.delete(`http://localhost:3015/exercice/${id}`)
                    setExercices(prev => prev.filter(e => e.id !== id))
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El ejercicio ha sido eliminado.',
                        icon: 'success',
                        background: 'black',
                        color: '#fff',
                        confirmButtonColor: '#d1006a'
                    })
                } catch (err) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el ejercicio.',
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
            {exercices.length>0?(
                <table className='table table text-center'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Ejercicios</th>
                            <th></th>
                            {entrenador && (
                                <th>                               
                                    <NavLink to={`/exerciceCreate`}>
                                        <button className='btn-custom-edit'>CREAR EJERCICIO</button>
                                    </NavLink>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {exercices.map((exercices)=>(
                        <tr key={exercices.id}>
                            <td>  
                                <NavLink to={`/exerciceDetail/${exercices.id}`} className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <img src={`http://localhost:3015/img_uploaded/${exercices.imagen}`} alt={exercices.nombre} style={{maxWidth:'100px', height:'auto'}} className='img-fluid img-hover-shrink'/>
                                </NavLink> 
                            </td>
                            <td>{exercices.nombre}</td>
                            {entrenador && (
                                <td>
                                <NavLink to={`/exerciceEdit/${exercices.id}`}>
                                    <button className='btn-custom-edit'>Editar</button>
                                </NavLink>
                                    <button className='btn-custom-delete'onClick={()=>handleDelete(exercices.id)}>Eliminar</button>
                                </td>
                            )}
                        </tr>
                            
                    ))}
                </tbody>
                </table>                
            ):(
                <p>No hay ejercicios disponibles</p>
            )}
            
        </div>
    )
}

export default ExerciceList