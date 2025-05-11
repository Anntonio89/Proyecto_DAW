import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

const baseImg = "http://localhost:3015/img_uploaded/"

function EditExercice() {

    const {id}=useParams()
    const [exercice, setExercice] =useState(null)
    const [img, setImg]=useState(null)
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetch=async()=>{
            try {
                const res=await axiosClient.get(`http://localhost:3015/exercice/${id}`)
                setExercice(res.data[0])
                setImg(baseImg + res.data[0].imagen)
                
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    },[id])

    const handleChange=(e)=>{
        const{name, value}=e.target //Se extrae el nombre y el value del campo
        setExercice({...exercice, [name]:value})//Se realiza una copia del objeto exercice, actualizando la propiedad correspondiente [name] con el nuevo vlor
    }

    const handleChangeFile=(e)=>{
        const file = e.target.files[0]
        setExercice({...exercice, imagen:file})
    }

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const formData=new FormData()
            for(const key in exercice){
                formData.append(key, exercice[key])
            }

            const res= await axiosClient.put(`http://localhost:3015/exercice/${id}`, formData, {
                headers:{ 
                    'Content-Type':'multipart/form-data'
                }
            })

            if(res.data && res.data.imagen){
                setImg(baseImg + res.data.imagen)                
            }

            Swal.fire({
                title: 'Ejercicio actualizado',
                text: 'El ejercicio se ha actualizado correctamente.',
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
            navigate('/exerciceList')
            
        } catch (error) {
            console.error('Error al actualizar el ejercicio:', error)
        }
    }

    if(!exercice){
        return
    }
       
    return (
        <div className='create-Container'>
            <h1 className='create-Titulo'>Editar Ejercicio</h1>
            <form onSubmit={handleSubmit} className='create-Form'>
                <input type="text" name="nombre" value={exercice.nombre} onChange={handleChange} placeholder="Nombre" required/>
                <input type="text" name="categoria" value={exercice.categoria} onChange={handleChange} placeholder="Categoria" required/>
                <input type="text" name="grupo_muscular" value={exercice.grupo_muscular} onChange={handleChange} placeholder="Grupo Muscular" required/>
                <input type="text" name="nivel" value={exercice.nivel} onChange={handleChange} placeholder="Nivel" required/>
                <textarea name="descripcion" value={exercice.descripcion} onChange={handleChange} placeholder="Descripción" />                
                <div className='exerciceEdit-img'>
                    <input type="file" name="imagen" onChange={handleChangeFile} accept='image/*' style={{maxWidth:'150px', marginTop:'5px'}}/>
                    <img src={img} alt="imagen" style={{maxWidth:'150px', marginTop:'5px'}}/>
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    )
}

export default EditExercice