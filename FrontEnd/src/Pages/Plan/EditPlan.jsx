import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import storage from '../../utils/storage'
import Swal from 'sweetalert2'

function EditPlan() {

    const {id}=useParams()
    const [plan, setPlan] =useState(null)
    const [usuario, setUsuario]=useState([])
    const [userLogued, setUserLogued]=useState(null)
    const nivel =["Principiante", "Intermedio", "Avanzado"]

    const navigate = useNavigate()
    
    useEffect(()=>{
          const user=storage.get('authUser')
          //console.log('Usuario logueado: ' + user.nombre)
          if(user){
            setUserLogued(user)
          }
        },[])

    useEffect(()=>{
        const fetch=async()=>{
            try {
                const res=await axiosClient.get(`http://localhost:3015/plan/${id}`)
                setPlan(res.data[0])
                
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    },[id])

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res= await axiosClient.get('http://localhost:3015/users')
                console.log('Usuarios', res.data)
                setUsuario(res.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchUsuarios()
    }, [])

    const handleChange=(e)=>{
        const{name, value}=e.target //Se extrae el nombre y el value del campo
        setPlan({...plan, [name]:value})//Se realiza una copia del objeto plan, actualizando la propiedad correspondiente [name] con el nuevo vlor
    }

   
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            
            const res= await axiosClient.put(`http://localhost:3015/plan/${id}`, plan)

            if(res){
                
                Swal.fire({
                    title: 'Plan actualizado',
                    text: 'El plan se ha actualizado correctamente.',
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
                navigate('/planList')
            }
            
        } catch (error) {
            console.error('Error al actualizar el plan:', error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el plan.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Reintentar'
            }) 
        }
    }

    if(!plan){
        return
    }
       
    return (
        <div className='create-Container'>
            <h1 className='create-Titulo'>Editar plan</h1>
            <form onSubmit={handleSubmit} className='create-Form'>
                {userLogued.rol==='ADMIN' && (
                <label>Entrenador:
                    <select name='id_entrenador' value={plan.id_entrenador} onChange={handleChange} required>
                    <option value='' disabled>Selecciona un entrenador</option>
                    {usuario.filter(u=>u.rol==='ENTRENADOR')
                        .map((u)=>(
                        <option value={u.id} key={u.id}>
                            {u.nombre} 
                        </option>
                    ))}
                    </select>
                </label>    
                )}
            {/* <input name='id_usuario' value={form.id_usuario} onChange={handleChange} placeholder='ID Usuario' required /> */}
            <label>Usuario:
                <select name='id_usuario' value={plan.id_usuario} onChange={handleChange} required>
                    <option value='' disabled>Selecciona un usuario</option>
                    {usuario.filter(u=>u.rol==='USUARIO')
                        .map((u)=>(
                        <option value={u.id} key={u.id}>
                            {u.nombre} 
                        </option>
                    ))}
                </select>
            </label>
            <label>Plan:
                <input name='plan' value={plan.plan} onChange={handleChange} placeholder='Nombre Plan' required />
            </label>
            <label>Nivel:    
                <select name='nivel' value={plan.nivel} onChange={handleChange} required>
                    <option value='' disabled>Selecciona un nivel</option>
                        {nivel.map((nivel, index) => (
                            <option value={nivel} key={index}>
                                {nivel}
                            </option>
                        ))}
                </select>  
            </label>           
                {/* <input name='createdDate' value={plan.createdDate} type='date' onChange={handleChange} placeholder='Fecha Creación' required />
                <input name='modifiedDate' value={plan.modifiedDate} type='date' onChange={handleChange} placeholder='Fecha Modificación' required /> */}
                <button type='submit' className='plan-button'>Guardar Plan</button>
            </form>
        </div>
    )
}

export default EditPlan