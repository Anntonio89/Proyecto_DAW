import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import storage from '../utils/storage'
import {FaUserCircle} from 'react-icons/fa'

function Header({filtro, setFiltro}) {
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
            {/*Acceder (Login) / Ver perfil según logueado*/}
            {!userLogued ? <NavLink to='/login'className={({ isActive }) => (isActive ? 'active' : '')}>Acceder</NavLink> 
                        : <NavLink to='/login'className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FaUserCircle style={{marginRight:'5px'}}/>
                            {userLogued.nombre}<p style={{marginLeft: '25px',fontSize:'12px'}}>{userLogued.rol}</p>
                          </NavLink>
            }
        </nav>
        <div className='busqueda'>
            <input type='text' placeholder='Buscar...' value={filtro} onChange={(e)=>setFiltro(e.target.value)}/>
        </div>
    </header>   
    </>
  )
}

export default Header