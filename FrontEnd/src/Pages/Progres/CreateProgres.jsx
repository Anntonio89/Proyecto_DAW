import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateProgres() {

    const navigate =useNavigate()

    const [form, setForm]=useState({
        id_usuario:'',
        id_plan:'',
        peso:'',
        IMC:'',
        indice_grasa:'',
        observaciones:''
    })

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
            const res=await axios.post('http://localhost:3015/progres', form)
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
            navigate('/')
            
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
    <div className='progres-Container'>
        <h1 className='progres-Titulo'>Registrar Progreso</h1>
        <form className='progres-Form' onSubmit={handleSubmit}>
            <input name='id_usuario' value={form.id_usuario} onChange={handleChange} placeholder='ID Usuario' required />
            <input name='id_plan' value={form.id_plan} onChange={handleChange} placeholder='ID Plan' required />
            <input name='peso' value={form.peso} type='number' step='any' onChange={handleChange} placeholder='Peso (kg)' required />
            <input name='IMC' value={form.IMC} type='number' step='any' onChange={handleChange} placeholder='IMC' required />
            <input name='indice_grasa' value={form.indice_grasa} type='number' step='any' onChange={handleChange} placeholder='% Grasa' required />
            <textarea name='observaciones' value={form.observaciones} onChange={handleChange} placeholder='Observaciones (opcional)' />
            <button type='submit' className='progres-button'>Guardar Progreso</button>
        </form>
    </div>
  )
}

export default CreateProgres