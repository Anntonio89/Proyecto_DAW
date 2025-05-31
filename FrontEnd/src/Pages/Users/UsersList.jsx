import {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from '../../utils/function'
import storage from '../../utils/storage'
import Swal from 'sweetalert2'

function UsersList({filtro}) {

    const [users,setUsers]=useState([])
    const [modif, setModif] = useState(false)
    const usersFiltrados = users.filter(e => e.nombre.toLowerCase().includes(filtro.toLowerCase()))

    useEffect(()=>{

        const user=storage.get('authUser')

        if(user.rol==='ADMIN'){
            setModif(true)
        }

        const fetchUsers=async()=>{
            try {
                const res=await axiosClient.get('http://localhost:3015/users')
                setUsers(res.data)      
                console.log('Usuarios: ' , res.data)          
            } catch (error) {
                Swal.fire({
                    title:'Error',
                    text:'Error al obtener usuarios',
                    icon:'error',
                    background:'black',
                     confirmButtonColor: '#d1006a',
                    confirmButtonText:'Volver'
                }) 
            }
        }
        fetchUsers()
    },[])

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el usuario.',
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
                    await axiosClient.delete(`http://localhost:3015/users/${id}`)
                    setUsers(prev => prev.filter(e => e.id !== id))
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El usuario ha sido eliminado.',
                        icon: 'success',
                        background: 'black',
                        color: '#fff',
                        confirmButtonColor: '#d1006a'
                    })
                } catch (err) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el usuario.',
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
                {users.length>0?(
                    <table className='table table text-center'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Edad</th>
                                <th>Sexo</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersFiltrados.map((users)=>(
                            <tr key={users.id}>
                                <td>{users.nombre}</td>
                                <td>{users.apellidos}</td>
                                <td>{users.email}</td>
                                <td>{users.edad}</td>
                                <td>{users.sexo}</td>
                                <td>{users.rol}</td>
                                {modif && (
                                    <td>
                                    <NavLink to={`/userEdit/${users.id}`}>
                                        <button className='btn-custom-edit'>Editar</button>
                                    </NavLink>
                                        <button className='btn-custom-delete'onClick={()=>handleDelete(users.id)}>Eliminar</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                    </table>
                ):(
                    <p>No hay usuarios disponibles</p>
                )}
                
            </div>
        </div>
    )
}

export default UsersList