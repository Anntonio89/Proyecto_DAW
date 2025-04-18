import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {login, logout} from '../utils/auth'
import storage from '../utils/storage'

function Login() {

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [userLogued, setUserLogued]=useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
      const user=storage.get('authUser')
      //console.log('Usuario logueado: ' + user.nombre)
      if(user){
        setUserLogued(user)
      }
    },[])

    const handleLogin =async (e) => {
      e.preventDefault()
      try{
          const res = await login(email, password)
          navigate('/login')
          alert('Bienvenido')
          setUserLogued(res.data)          
        
        }catch(err){
          if(err.response && err.response.status===401){
            alert('Contraseña y/o usuario incorrecto')
          }else{
            alert('Error al iniciar sesión')
          }
      }
    }

    const handleLogout =async () => {
  
      try{
          await logout()
          setUserLogued(null)
          alert('Sesión cerrada con éxito')

        }catch(err){
          alert('Error al cerrar sesión')
        }
      }    

  return (
    <div className='login-Container'>
        <h1 className='login-Titulo'>Acceder</h1>
        {!userLogued?(
        <form className='login-Form' onSubmit={handleLogin}>
            <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' required/>
            <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Contraseña' required/>
            <button type='submit'>Iniciar Sesión</button>
        </form>
        ):(
          <div className='login-Logout'>
            <p>{userLogued.nombre}</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
    </div>
  )
}

export default Login