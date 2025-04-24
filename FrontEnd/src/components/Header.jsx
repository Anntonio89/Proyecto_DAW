import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import storage from '../utils/storage'

function Header() {
  const [userLogued, setUserLogued] = useState(null)

  useEffect(()=>{
    const user=storage.get('authUser')
    if(user){
      setUserLogued(user)
    }
  },[])


  return (
    <>
    <header className='header'>
        <nav className='nav'>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>Inicio</NavLink>
            <NavLink to='/services' className={({ isActive }) => (isActive ? 'active' : '')}>Qué ofrecemos</NavLink>
            <NavLink to='/contact'className={({ isActive }) => (isActive ? 'active' : '')}>Contacto</NavLink>
            {!userLogued ? <NavLink to='/login'className={({ isActive }) => (isActive ? 'active' : '')}>Acceder</NavLink> 
                        : <NavLink to='/login'className={({ isActive }) => (isActive ? 'active' : '')}>Ver Perfil</NavLink>
            }
        </nav>
        <div className='busqueda'>
            <input type='text' placeholder='Buscar...'/>
        </div>
    </header>   
    </>
  )
}

export default Header