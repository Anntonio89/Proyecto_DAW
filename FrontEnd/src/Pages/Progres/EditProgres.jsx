import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function EditProgres() {

    const {id}=useParams()
    const [progres, setProgres] =useState(null)
    const [planes, setPlanes]=useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetch=async()=>{
            try {
                const res=await axiosClient.get(`http://localhost:3015/progres/${id}`)
                setProgres(res.data[0])
                
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

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'id_plan') {
            const planSeleccionado = planes.find(p => String(p.id) === value)
            setProgres(prev => ({
                ...prev,
                id_plan: value,
                nombre_plan: planSeleccionado ? planSeleccionado.plan : ''
            }))
        } else {
            setProgres(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }
       
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            
            const res= await axiosClient.put(`http://localhost:3015/progres/${id}`, progres)

            if(res){
                
                Swal.fire({
                    title: 'Progreso actualizado',
                    text: 'El Progreso se ha actualizado correctamente.',
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
                navigate('/progresList')
            }
            
        } catch (error) {
            console.error('Error al actualizar el progreso:', error)
            Swal.fire({
                    title: 'Error',
                    text: 'No se pudo editar el progreso.',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Reintentar'
            })
        }
    }

    if(!progres){
        return
    }
       
    return (
        <div className='create-Container'>
            <h1 className='create-Titulo'>Editar Progreso {progres.nombre_usuario}</h1>
            <form onSubmit={handleSubmit} className='create-Form'>
                {/* <input name='id_usuario' value={progres.id_usuario} onChange={handleChange} placeholder='ID Usuario' required /> */}
                {/* <input name='nombre_usuario' value={progres.nombre_usuario} onChange={handleChange} placeholder='Nombre Usuario' required /> */}
                {/* <input name='id_plan' value={progres.id_plan} onChange={handleChange} placeholder='ID Plan' required /> */}
                {/* <label>Plan: <input name='nombre_plan' value={progres.nombre_plan} onChange={handleChange} placeholder='Nombre Plan' required /></label> */}
                <label>Plan:
                    <select name='id_plan' value={progres.id_plan} onChange={handleChange} required>
                        <option value='' disabled>Selecciona un plan</option>
                        {planes.map((p)=>(
                            <option value={p.id} key={p.id}>
                                {p.plan}
                            </option>   
                        ))}
                    </select>
                </label>
                {/* <input name='fecha' value={progres.fecha} onChange={handleChange} placeholder='Fecha' required /> */}
                <label>Peso: <input name='peso' value={progres.peso} type='number' onChange={handleChange} placeholder='Peso (kg)' min='20' max='200' required /></label>
                <label>IMC: <input name='IMC' value={progres.IMC} type='number' onChange={handleChange} placeholder='IMC' min='15' max='50' required /></label>
                <label>% Grasa: <input name='indice_grasa' value={progres.indice_grasa} type='number' onChange={handleChange} placeholder='% Grasa' min='1' max='100' required /></label>
                <textarea name='observaciones' value={progres.observaciones} onChange={handleChange} placeholder='Observaciones (opcional)' />
                <button type='submit' className='register-Button'>Guardar Cambios</button>
            </form>
        </div>
    )
}

export default EditProgres