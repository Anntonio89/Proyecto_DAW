import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function EditPlan() {

    const {id}=useParams()
    const [plan, setPlan] =useState(null)
    const navigate = useNavigate()
    
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
        }
    }

    if(!plan){
        return
    }
       
    return (
        <div className='exerciceEdit-Container'>
            <h1 className='exerciceEdit-Titulo'>Editar plan</h1>
            <form onSubmit={handleSubmit} className='exerciceEdit-Form'>
                <input name='id_entrenador' value={plan.id_entrenador} onChange={handleChange} placeholder='ID Entrenador' required />
                <input name='id_usuario' value={plan.id_usuario} onChange={handleChange} placeholder='ID Usuario' required />
                <input name='plan' value={plan.plan} onChange={handleChange} placeholder='Nombre Plan' required />                  
                <input name='createdDate' value={plan.createdDate} type='date' onChange={handleChange} placeholder='Fecha Creación' required />
                <input name='modifiedDate' value={plan.modifiedDate} type='date' onChange={handleChange} placeholder='Fecha Modificación' required />
                <button type='submit' className='plan-button'>Guardar Plan</button>
            </form>
        </div>
    )
}

export default EditPlan