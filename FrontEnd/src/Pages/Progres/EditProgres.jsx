import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function EditProgres() {

    const {id}=useParams()
    const [progres, setProgres] =useState(null)
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

    const handleChange=(e)=>{
        const{name, value}=e.target //Se extrae el nombre y el value del campo
        setProgres({...progres, [name]:value})//Se realiza una copia del objeto progres, actualizando la propiedad correspondiente [name] con el nuevo vlor
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
            console.error('Error al actualizar el Progreso:', error)
        }
    }

    if(!progres){
        return
    }
       
    return (
        <div className='progresEdit-Container'>
            <h1 className='progresEdit-Titulo'>Editar Progreso</h1>
            <form onSubmit={handleSubmit} className='progresEdit-Form'>
                <input name='id_usuario' value={progres.id_usuario} onChange={handleChange} placeholder='ID Usuario' required />
                <input name='nombre_usuario' value={progres.nombre_usuario} onChange={handleChange} placeholder='Nombre Usuario' required />
                <input name='id_plan' value={progres.id_plan} onChange={handleChange} placeholder='ID Plan' required />
                <input name='nombre_plan' value={progres.nombre_plan} onChange={handleChange} placeholder='Nombre Plan' required />
                <input name='fecha' value={progres.fecha} onChange={handleChange} placeholder='Fecha' required />
                <input name='peso' value={progres.peso} type='number' onChange={handleChange} placeholder='Peso (kg)' required />
                <input name='IMC' value={progres.IMC} type='number' onChange={handleChange} placeholder='IMC' required />
                <input name='indice_grasa' value={progres.indice_grasa} type='number' onChange={handleChange} placeholder='% Grasa' required />
                <textarea name='observaciones' value={progres.observaciones} onChange={handleChange} placeholder='Observaciones (opcional)' />
                <button type='submit' className='register-Button'>Guardar Cambios</button>
            </form>
        </div>
    )
}

export default EditProgres