import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function CreateDetail() {

    const navigate =useNavigate()

    const [form, setForm]=useState({
        id_plan:'',
        id_ejercicio:'',
        dia_semana:'',
        series:'',
        repeticiones:'',
        descanso:''
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
            const res=await axiosClient.post('http://localhost:3015/details', form)
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
            navigate('/')
            
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
    <div className='progres-Container'>
        <h1 className='progres-Titulo'>Registrar Plan</h1>
        <form className='progres-Form' onSubmit={handleSubmit}>
            <input name='id_plan' value={form.id_plan} onChange={handleChange} placeholder='ID Plan' required />
            <input name='id_ejercicio' value={form.id_ejercicio} onChange={handleChange} placeholder='ID Ejercicio' required />
            <input name='dia_semana' value={form.dia_semana} onChange={handleChange} placeholder='Día Semana' required />                  
            <input name='series' value={form.series} onChange={handleChange} placeholder='Series' required />                  
            <input name='repeticiones' value={form.repeticiones} onChange={handleChange} placeholder='Repeticiones' required />                  
            <input name='descanso' value={form.descanso} onChange={handleChange} placeholder='descanso' required />                  
            <button type='submit' className='plan-button'>Guardar Plan</button>
        </form>
    </div>
  )
}

export default CreateDetail