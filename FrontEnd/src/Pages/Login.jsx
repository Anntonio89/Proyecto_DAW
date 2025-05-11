import {useState, useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {login, logout} from '../utils/auth'
import storage from '../utils/storage'
import Swal from 'sweetalert2'

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
          setUserLogued(res.data)
          Swal.fire({
                    title:'Bienvenido',
                    text:'Login correcto',
                    icon:'success',
                    background:'black',
                    confirmButtonColor: '#d1006a',
                    confirmButtonText:'Volver'
                  })
          navigate('/')     
          window.location.reload()         
        
        }catch(err){
          if(err.response && err.response.status===401){
            Swal.fire({
                title:'Error',
                text:'Contraseña y/o usuario incorrecto',
                icon:'error',
                background:'black',
                confirmButtonColor: '#d1006a',
                confirmButtonText:'Volver'
            })
          }else{
            Swal.fire({
                title:'Error',
                text:'Error al iniciar sesión',
                icon:'error',
                background:'black',
                confirmButtonColor: '#d1006a',
                confirmButtonText:'Volver'
            })  
          }
      }
    }

    const handleLogout =async () => {
  
      try{
          await logout()
          setUserLogued(null)
          Swal.fire({
              title:'Sesión cerrada',
              text:'Sesión cerrada con éxito',
              icon:'success',
              background:'black',
              confirmButtonColor: '#d1006a',
              confirmButtonText:'Volver'
          })
          navigate('/login')  
          window.location.reload()  

        }catch(err){
          Swal.fire({
              title:'Error',
              text:'Error al cerrar sesión',
              icon:'error',
              background:'black',
              confirmButtonColor: '#d1006a',
              confirmButtonText:'Volver'
          }) 
        }
      }    

  return (
    <div className='login-Container'>
        {!userLogued?(
          <div>
            <h1 className='login-Titulo'>Acceder</h1>
            <form className='login-Form' onSubmit={handleLogin}>
                <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' required/>
                <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Contraseña' required/>
                <button type='submit'>Iniciar Sesión</button>
                <p>¿No tienes cuenta?<Link to="/users">Regístrate</Link></p>
            </form>
          </div>
          ):(
            <>
            <h1 className='login-Titulo'>Mi Perfil</h1>
            <div className='login-Logout'>
              <h3><strong>Usuario:</strong></h3><p>{userLogued.nombre}</p>
              <h3><strong>Correo:</strong></h3><p>{userLogued.email}</p>
              <h3><strong>Rol:</strong></h3><p>{userLogued.rol}</p>
              {/*Se muestran diferentes versiones del perfil en función del rol*/}
              {/*USUARIOS accederán a sus planes asignados y asus progresos personales*/}
              {userLogued.rol==='USUARIO' && (
                <>
                  <Link to='/details-progres' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Ver Progreso
                  </Link>
                  <Link to='/planUser' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Ver Plan Asignado
                  </Link>
                </>
              )}
              {/*ENTRENADORES accederán a todos los planes asignados y a los progresos personales*/}
              {userLogued.rol==='ENTRENADOR' && (
                <>
                  <Link to='/progresList' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Gestionar Progresos
                  </Link>
                  <Link to='/planList' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Gestionar Planes
                  </Link>
                  <Link to='/exerciceList' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Gestionar Ejercicios
                  </Link>
                </>
              )}
              {/*ADMIN accederá a todos los planes asignados y a los progresos personales, además de los usuarios*/}
              {userLogued.rol==='ADMIN' && (
                <>
                  <Link to='/progresList' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Gestionar Progresos
                  </Link>
                  <Link to='/planList' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Gestionar Planes
                  </Link>
                  <Link to='/exerciceList' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Gestionar Ejercicios
                  </Link>
                  <Link to='/usersList' className='user-Progres' 
                      style={{color:'#d1006a',
                              textDecoration:'none',
                              fontWeight:'bold',
                            }}>
                      Gestionar Usuarios
                  </Link>
                </>
              )}

              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            </>
        )}
    </div>
  )
}

export default Login