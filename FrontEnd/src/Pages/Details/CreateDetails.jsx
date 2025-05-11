import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function CreateDetail() {

    const [planes, setPlanes]=useState([])
    const [ejercicios, setEjercicios]=useState([])
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    const {idPlan} = useParams()
    const navigate =useNavigate()

    const [form, setForm]=useState({
        id_plan:''|| idPlan,
        id_ejercicio:'',
        dia_semana:'',
        series:'',
        repeticiones:'',
        descanso:''
    })

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

    useEffect(() => {
        const fetchEjercicio = async () => {
            try {
                const res= await axiosClient.get('http://localhost:3015/exercice')
                console.log('Ejercicios', res.data)
                setEjercicios(res.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchEjercicio()
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
    <div className='create-Container'>
        <h1 className='create-Titulo'>Asignar Ejercicio</h1>
        <form className='create-Form' onSubmit={handleSubmit}>
            {/* <input name='id_plan' value={form.id_plan} onChange={handleChange} placeholder='ID Plan' required /> */}
            <select name='id_plan' value={form.id_plan} onChange={handleChange} required>
                <option value='' disabled>Selecciona un plan</option>
                    {planes.map((p)=>(
                        <option value={p.id} key={p.id}>
                            {p.plan}
                        </option>   
                    ))}
            </select>
            {/* <input name='id_ejercicio' value={form.id_ejercicio} onChange={handleChange} placeholder='ID Ejercicio' required /> */}
            <select name='id_ejercicio' value={form.id_ejercicio} onChange={handleChange} required>
                <option value='' disabled>Selecciona un ejercicio</option>
                    {ejercicios.map((e)=>(
                        <option value={e.id} key={e.id}>
                            {e.nombre}
                        </option>   
                    ))}
            </select>
            {/* <input name='dia_semana' value={form.dia_semana} onChange={handleChange} placeholder='Día Semana' required />*/}
            <select name='dia_semana' value={form.dia_semana} onChange={handleChange} required>
                <option value='' disabled>Selecciona un día de la semana</option>
                    {diasSemana.map((dia, index) => (
                        <option value={dia} key={index}>
                            {dia}
                        </option>
                    ))}
            </select>
            <input name='series' value={form.series} onChange={handleChange} placeholder='Series' min='1' required />                  
            <input name='repeticiones' value={form.repeticiones} onChange={handleChange} placeholder='Repeticiones' min='1' required />                  
            <input name='descanso' value={form.descanso} onChange={handleChange} placeholder='Descanso' min='0' required />                  
            <button type='submit' className='plan-button'>Guardar Plan</button>
        </form>
    </div>
  )
}

export default CreateDetail