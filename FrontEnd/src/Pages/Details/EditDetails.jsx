
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function EditDetail() {

    const {id}=useParams()
    const [detail, setDetail] =useState(null)
    const [planes, setPlanes]=useState([])
    const [ejercicios, setEjercicios]=useState([])
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetch=async()=>{
            try {
                const res=await axiosClient.get(`http://localhost:3015/details/${id}`)
                setDetail(res.data[0])
                
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    },[id])
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

    const handleChange=(e)=>{
        const{name, value}=e.target //Se extrae el nombre y el value del campo
        setDetail({...detail, [name]:value})//Se realiza una copia del objeto detail, actualizando la propiedad correspondiente [name] con el nuevo vlor
    }

   
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            
            const res= await axiosClient.put(`http://localhost:3015/details/${id}`, detail)

            if(res){
                
                Swal.fire({
                    title: 'Detalle actualizado',
                    text: 'El detalle se ha actualizado correctamente.',
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
                navigate('/detailsList')
            }
            
        } catch (error) {
            console.error('Error al actualizar el detalle:', error)
        }
    }

    if(!detail){
        return
    }
       
    return (
        <div className='create-Container'>
            <h1 className='create-Titulo'>Editar Detalle</h1>
            <form onSubmit={handleSubmit} className='create-Form'>
                {/* <input name='id_plan' value={detail.id_plan} onChange={handleChange} placeholder='ID Plan' required />
                <input name='id_ejercicio' value={detail.id_ejercicio} onChange={handleChange} placeholder='ID Ejercicio' required />
                <input name='dia_semana' value={detail.dia_semana} onChange={handleChange} placeholder='Nombre detail' required />                   */}
                <select name='id_plan' value={detail.id_plan} onChange={handleChange} required>
                <option value='' disabled>Selecciona un plan</option>
                    {planes.map((p)=>(
                        <option value={p.id} key={p.id}>
                            {p.plan}
                        </option>   
                    ))}
            </select>
            {/* <input name='id_ejercicio' value={form.id_ejercicio} onChange={handleChange} placeholder='ID Ejercicio' required /> */}
            <select name='id_ejercicio' value={detail.id_ejercicio} onChange={handleChange} required>
                <option value='' disabled>Selecciona un ejercicio</option>
                    {ejercicios.map((e)=>(
                        <option value={e.id} key={e.id}>
                            {e.nombre}
                        </option>   
                    ))}
            </select>
            {/* <input name='dia_semana' value={form.dia_semana} onChange={handleChange} placeholder='Día Semana' required />*/}
            <select name='dia_semana' value={detail.dia_semana} onChange={handleChange} required>
                <option value='' disabled>Selecciona un día de la semana</option>
                    {diasSemana.map((dia, index) => (
                        <option value={dia} key={index}>
                            {dia}
                        </option>
                    ))}
            </select>
                <input name='series' value={detail.series} onChange={handleChange} placeholder='Series' required />
                <input name='repeticiones' value={detail.repeticiones} onChange={handleChange} placeholder='Repeticiones' required />
                <input name='descanso' value={detail.descanso} onChange={handleChange} placeholder='Descanso' required />
                <button type='submit' className='detail-button'>Guardar Detalle</button>
            </form>
        </div>
    )
}

export default EditDetail