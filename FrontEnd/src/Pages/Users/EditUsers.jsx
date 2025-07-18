import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function EditUser() {

    const {id}=useParams()
    const [user, setUser] =useState(null)
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetch=async()=>{
            try {
                const res=await axiosClient.get(`http://localhost:3015/users/${id}`)
                setUser(res.data[0])
                
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    },[id])

    const handleChange=(e)=>{
        const{name, value}=e.target //Se extrae el nombre y el value del campo
        setUser({...user, [name]:value})//Se realiza una copia del objeto user, actualizando la propiedad correspondiente [name] con el nuevo vlor
    }

   
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            
            const res= await axiosClient.put(`http://localhost:3015/users/${id}`, user)

            if(res){
                
                Swal.fire({
                    title: 'Usuario actualizado',
                    text: 'El usuario se ha actualizado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar',
                    showClass: {
                        popup: 'swal2-noanimation'
                    },
                    hideClass: {
                        popup: ''
                    }
                    })
                navigate('/usersList')
            }
            
        } catch (error) {
            console.error('Error al actualizar el usuario:', error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el usuario.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Reintentar'
            })
        }
    }

    if(!user){
        return
    }
       
    return (
        <div className='create-Container'>
            <h1 className='create-Titulo'>Editar usuario</h1>
            <form onSubmit={handleSubmit} className='create-Form'>
                <label>Nombre:<input name='nombre' value={user.nombre} onChange={handleChange} placeholder='Nombre' required/></label>
                <label>Apellidos:<input name='apellidos' value={user.apellidos} onChange={handleChange} placeholder='Apellidos' required/></label>
                <label>Email:<input name='email' value={user.email} type='email' onChange={handleChange} placeholder='Email' required/></label>
                <label><input name='password' value={user.password} type='password' onChange={handleChange} placeholder='Contraseña' required/></label>
                <label>Edad:<input name='edad' value={user.edad} type='number' onChange={handleChange} placeholder='Edad' required/></label>
                <label>Sexo:
                    <select name='sexo' value={user.sexo} onChange={handleChange}>
                        <option value='' disabled>Sexo</option>
                        <option value='Hombre'>Hombre</option>
                        <option value='Mujer'>Mujer</option>
                        <option value='Otro'>Otro</option>
                    </select>
                </label>
                <label>Rol:
                    <select name='rol' value={user.rol} onChange={handleChange}>
                        <option value='' disabled>Rol</option>
                        <option value='ADMIN'>Administrador</option>
                        <option value='ENTRENADOR'>Entrenador</option>
                        <option value='USUARIO'>Usuario</option>
                    </select>
                </label>
                <button type='submit' className='register-Button'>Guardar Cambios</button>
            </form>
        </div>
    )
}

export default EditUser