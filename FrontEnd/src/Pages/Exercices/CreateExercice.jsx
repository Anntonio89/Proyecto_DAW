import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function CreateExercice() {

    const navigate =useNavigate()
    const [img, setImg]=useState(null)

    const [form, setForm]=useState({
        nombre:'',
        categoria:'',
        grupo_muscular:'',
        nivel:'',
        descripcion:'',
        imagen:null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeFile=(e)=>{
      const file = e.target.files[0]
      setForm(prev=>({
              ...prev, 
              imagen:file
      }))
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const formData=new FormData()
              for(const key in form){
                  formData.append(key, form[key])
            }
            const res=await axiosClient.post('http://localhost:3015/exercice', formData, {
              headers:{ 
              'Content-Type':'multipart/form-data'
            }
          })
            Swal.fire({
                title: 'Ejercicio registrado',
                text: 'El ejercicio se ha guardado correctamente.',
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
            console.log('Ejercicio creado: ', res.data)
            navigate('/exerciceList')
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudo registrar el ejercicio.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Reintentar'
            })            
        }
    }

  return (
    <div className='exerciceEdit-Container'>
            <h1 className='exerciceEdit-Titulo'>Crear Ejercicio</h1>
            <form onSubmit={handleSubmit} className='exerciceEdit-Form'>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required/>
                <input type="text" name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" required/>
                <input type="text" name="grupo_muscular" value={form.grupo_muscular} onChange={handleChange} placeholder="Grupo Muscular" required/>
                <input type="text" name="nivel" value={form.nivel} onChange={handleChange} placeholder="Nivel" required/>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />                
                <div className='exerciceEdit-img'>
                    <input type="file" name="imagen" onChange={handleChangeFile} accept='image/*' style={{maxWidth:'150px', marginTop:'5px'}}/>
                    <img src={img} alt="imagen" style={{maxWidth:'150px', marginTop:'5px'}}/>
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
  )
}

export default CreateExercice