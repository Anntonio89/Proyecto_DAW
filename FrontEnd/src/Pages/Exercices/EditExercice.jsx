import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'


function EditExercice() {

    const {id}=useParams()
    const [exercice, setExercice] =useState(null)
    const navigate=useNavigate()
    
    useEffect(()=>{
        const fetch=async()=>{
            try {
                const res=await axios.get(`http://localhost:3015/exercice/${id}`)
                setExercice(res.data[0])
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    },[id])

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const formData=new FormData()
            for(let key in exercice){
                formData.append('image',key)
            }

            const res= await axios.put(`http://localhost:3015/exercie/${id}`, formData, {
                headers:{ 'Content-Type':'multipart/form-data'}
            })
            if(res.data && res.data.length>0){
                alert('Ejercicio actualizado con exito')
                navigate('/exercice')
            }
            
        } catch (error) {
            console.error('Error al actualizar el ejercicio:', error)
        }
    }

    return (
        <div>
            <h2>Editar Ejercicio</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={exercice.nombre}  placeholder="Nombre" required/>
                <input type="text" name="categoria" value={exercice.categoria}  placeholder="Categoria" required/>
                <input type="text" name="grupo_muscular" value={exercice.grupo_muscular}  placeholder="Grupo Muscular" required/>
                <input type="text" name="nivel" value={exercice.nivel}  placeholder="Nivel" required/>
                <textarea name="descripcion" value={exercice.descripcion} placeholder="Descripción"/>
                <input type="file" name="imagen" accept='image/*'/>
            </form>
        </div>
    )
}

export default EditExercice