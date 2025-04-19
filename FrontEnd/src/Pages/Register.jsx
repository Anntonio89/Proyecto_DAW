import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Register() {

    const navigate=useNavigate()

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

    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post('http://localhost:3015/users', form)
            alert('Usuario Registrado')
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