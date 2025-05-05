import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosClient from '../utils/function'
import Swal from 'sweetalert2'

function Register() {

    const navigate=useNavigate()
    const [passwordError, setPasswordError] = useState('')

    const [form, setForm]=useState({
        nombre:'',
        apellidos:'',
        email:'',
        password:'',
        altura:'',
        peso:'',
        edad:'',
        sexo:''
    })

    // Validación de la contraseña
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/
        if (!passwordRegex.test(form.password)) {
        setPasswordError('La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.')
        return false
        }
        setPasswordError("")
        return true
    }

    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(!validatePassword()){
            return
        }

        try {           
            const res=await axiosClient.post('http://localhost:3015/users', form)
            
            Swal.fire({
                    title:'Bienvenido',
                    text:'Usuario registrado correctamente',
                    icon:'success',
                    background:'black',
                    confirmButtonColor: '#d1006a',
                    confirmButtonText:'Volver'
            })
            console.log('Usuario creado: ', res.data)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='register-Container'>
        <h1 className='register-Titulo'>Registro</h1>
        <form className='register-Form' onSubmit={handleSubmit}>
            <input name='nombre' value={form.nombre} onChange={handleChange} placeholder='Nombre' required/>
            <input name='apellidos' value={form.apellidos} onChange={handleChange} placeholder='Apellidos' required/>
            <input name='email' value={form.email} type='email' onChange={handleChange} placeholder='Email' required/>
            <input name='password' value={form.password} type='password' onChange={handleChange} placeholder='Contraseña' required/>
            {passwordError && <small className="text-danger" style={{backgroundColor:'black', color:'#d1006a' }}>{passwordError}</small>}
            <input name='altura' value={form.altura} type='number' onChange={handleChange} placeholder='Altura (m)' required/>
            <input name='peso' value={form.peso} type='number' onChange={handleChange} placeholder='Peso (kg)' required/>
            <input name='edad' value={form.edad} type='number' onChange={handleChange} placeholder='Edad' required/>
            <select name='sexo' value={form.sexo} onChange={handleChange}>
                <option value='' disabled>Sexo</option>
                <option value='Hombre'>Hombre</option>
                <option value='Mujer'>Mujer</option>
                <option value='Otro'>Otro</option>
            </select>
            <button type='submit' className='register-Button'>Crear Cuenta</button>
        </form>

    </div>
  )
}

export default Register