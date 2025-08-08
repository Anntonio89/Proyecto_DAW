import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import storage from '../utils/storage'
import {FaUserCircle, FaBars, FaTimes} from 'react-icons/fa'

function Header({filtro, setFiltro}) {
  const [userLogued, setUserLogued] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(()=>{
    const user=storage.get('authUser')
    if(user){
      setUserLogued(user)
    }
  },[])


  return (
    <>
    <header className='header'>
      <button className='desplegar' onClick={()=> setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Inicio</NavLink>
            <NavLink to='/services' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Qué ofrecemos</NavLink>
            <NavLink to='/contact'className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Contacto</NavLink>
            {/*Acceder (Login) / Ver perfil según logueado*/}
            {!userLogued ? (<NavLink to='/login'className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Acceder</NavLink>)
                        : (<NavLink to='/login'className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FaUserCircle style={{marginRight:'5px'}}/>
                            {userLogued.nombre}<p style={{marginLeft: '25px',fontSize:'12px'}}>{userLogued.rol}</p>
                          </NavLink>
            )}
            <div className='busqueda-mobile'>
              <input type='text' placeholder='Buscar...' value={filtro} onChange={(e)=>setFiltro(e.target.value)}/>
            </div>
        </nav>
        {/* Buscador para desktop */}
        <div className='busqueda-desktop'>
            <input type='text' placeholder='Buscar...' value={filtro} onChange={(e)=>setFiltro(e.target.value)}/>
        </div>
    </header>   
    </>
  )
}

export default Header