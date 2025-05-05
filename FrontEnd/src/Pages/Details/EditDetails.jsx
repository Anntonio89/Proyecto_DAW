
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function EditDetail() {

    const {id}=useParams()
    const [detail, setDetail] =useState(null)
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
            console.error('Error al actualizar el detail:', error)
        }
    }

    if(!detail){
        return
    }
       
    return (
        <div className='exerciceEdit-Container'>
            <h1 className='exerciceEdit-Titulo'>Editar detail</h1>
            <form onSubmit={handleSubmit} className='exerciceEdit-Form'>
                <input name='id_plan' value={detail.id_plan} onChange={handleChange} placeholder='ID Plan' required />
                <input name='id_ejercicio' value={detail.id_ejercicio} onChange={handleChange} placeholder='ID Ejercicio' required />
                <input name='dia_semana' value={detail.dia_semana} onChange={handleChange} placeholder='Nombre detail' required />                  
                <input name='series' value={detail.series} onChange={handleChange} placeholder='Series' required />
                <input name='repeticiones' value={detail.repeticiones} onChange={handleChange} placeholder='Repeticiones' required />
                <input name='descanso' value={detail.descanso} onChange={handleChange} placeholder='Descanso' required />
                <button type='submit' className='detail-button'>Guardar detail</button>
            </form>
        </div>
    )
}

export default EditDetail