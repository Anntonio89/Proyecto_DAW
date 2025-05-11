import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function CreateProgres() {

    const navigate =useNavigate()
    const [usuarios, setUsuarios]=useState([])
    const [planes, setPlanes]=useState([])

    const [form, setForm]=useState({
        id_usuario:'',
        nombre_usuario:'',
        id_plan:'',        
        nombre_plan:'',
        peso:'',
        IMC:'',
        indice_grasa:'',
        observaciones:''
    })

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res= await axiosClient.get('http://localhost:3015/users')
                console.log('Usuarios', res.data)
                setUsuarios(res.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchUsuarios()
    }, [])

    useEffect(() => {
        const fetchPlanes = async () => {
            try {
                const res= await axiosClient.get('http://localhost:3015/plan')
                console.log('Planes', res.data)
                setPlanes(res.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchPlanes()
    }, [])

    const handleChange = (e) => {
    const { name, value } = e.target

    // Si cambia el usuario, también actualiza el nombre
    if (name === 'id_usuario') {
        const usuarioSeleccionado = usuarios.find(u => String(u.id) === value)
        setForm(prev => ({
            ...prev,
            id_usuario: value,
            nombre_usuario: usuarioSeleccionado ? usuarioSeleccionado.nombre : ''
        }))
    } else {
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
}

    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axiosClient.post('http://localhost:3015/progres', form)
            Swal.fire({
                title: 'Progreso registrado',
                text: 'El progreso de entrenamiento se ha guardado correctamente.',
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
            console.log('Progreso creado: ', res.data)
            navigate('/progresList')
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudo registrar el progreso.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Reintentar'
            })            
        }
    }

  return (
    <div className='create-Container'>
        <h1 className='create-Titulo'>Registrar Progreso</h1>
        <form className='create-Form' onSubmit={handleSubmit}>
            {/* <input name='id_usuario' value={form.id_usuario} onChange={handleChange} placeholder='ID Usuario' required /> */}
            {/* <input name='nombre_usuario' value={form.nombre_usuario} onChange={handleChange} placeholder='Nombre Usuario' required /> */}
            <select name='id_usuario' value={form.id_usuario} onChange={handleChange} required>
                <option value='' disabled>Selecciona un usuario</option>
                {usuarios.filter(u=>u.rol==='USUARIO').map((u)=>(
                    <option value={u.id} key={u.id}>
                        {u.nombre}
                    </option>   
                ))}
            </select>
            {/* <input name='id_plan' value={form.id_plan} onChange={handleChange} placeholder='ID Plan' required />
            <input name='nombre_plan' value={form.nombre_plan} onChange={handleChange} placeholder='Nombre Plan' required /> */}
            <select name='id_plan' value={form.id_plan} onChange={handleChange} required>
                <option value='' disabled>Selecciona un plan</option>
                {planes.map((p)=>(
                    <option value={p.id} key={p.id}>
                        {p.plan}
                    </option>   
                ))}
            </select>
            <input name='peso' value={form.peso} type='number' onChange={handleChange} placeholder='Peso (kg)' min='0' required />
            <input name='IMC' value={form.IMC} type='number' onChange={handleChange} placeholder='IMC' min='0' max='100'required />
            <input name='indice_grasa' value={form.indice_grasa} type='number' onChange={handleChange} placeholder='% Grasa' min='8' max='75' required />
            {/* <input name='fecha' value={new Date().toLocaleDateString()} type='date' onChange={handleChange} placeholder='Fecha' required /> */}
            <textarea name='observaciones' value={form.observaciones} onChange={handleChange} placeholder='Observaciones (opcional)' />
            <button type='submit' className='progres-button'>Guardar Progreso</button>
        </form>
    </div>
  )
}

export default CreateProgres