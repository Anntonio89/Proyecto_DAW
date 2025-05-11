import {useState, useEffect} from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function CreatePlan() {

    const [usuario, setUsuario]=useState([])
    const navigate =useNavigate()

    const [form, setForm]=useState({
        id_entrenador:'',
        id_usuario:'',
        plan:'',
        nivel:'',
        createdDate:'',
        modifiedDate:''
    })

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axiosClient.post('http://localhost:3015/plan', form)
            const newPlan =res.data.id

            Swal.fire({
                title: 'Plan registrado',
                text: 'El plan de entrenamiento se ha guardado correctamente.',
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
            console.log('Plan creado: ', res.data)
            navigate(`/createDetails/${newPlan}`)
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudo registrar el plan.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Reintentar'
            })            
        }
    }

  return (
    <div className='create-Container'>
        <h1 className='create-Titulo'>Registrar Plan</h1>
        <form className='create-Form' onSubmit={handleSubmit}>
            {/* <input name='id_entrenador' value={form.id_entrenador} onChange={handleChange} placeholder='ID Entrenador' required /> */}
            <select name='id_entrenador' value={form.id_entrenador} onChange={handleChange} required>
                <option value='' disabled>Selecciona un entrenador</option>
                {usuario.filter(u=>u.rol==='ENTRENADOR')
                    .map((u)=>(
                    <option value={u.id} key={u.id}>
                        {u.nombre} 
                    </option>
                ))}
            </select>
            {/* <input name='id_usuario' value={form.id_usuario} onChange={handleChange} placeholder='ID Usuario' required /> */}
            <select name='id_usuario' value={form.id_usuario} onChange={handleChange} required>
                <option value='' disabled>Selecciona un usuario</option>
                {usuario.filter(u=>u.rol==='USUARIO')
                    .map((u)=>(
                    <option value={u.id} key={u.id}>
                        {u.nombre} 
                    </option>
                ))}
            </select>
            <input name='plan' value={form.plan} onChange={handleChange} placeholder='Nombre Plan' required />                  
            {/* <input name='createdDate' value={new Date().toLocaleDateString()} type='date' onChange={handleChange} placeholder='Fecha Creación' required />
            <input name='modifiedDate' value={new Date().toLocaleDateString()} type='date' onChange={handleChange} placeholder='Fecha Modificación' required /> */}
            <NavLink to={`/createDetails`}>
                <button type='submit' className='plan-button'>Continuar</button>
            </NavLink>
        </form>
    </div>
  )
}

export default CreatePlan