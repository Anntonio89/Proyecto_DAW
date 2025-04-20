import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
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
            <Link to='/'>Inicio</Link>
            <Link to='/services'>Qué ofrecemos</Link>
            <Link to='/contact'>Contacto</Link>
            {!userLogued ? <Link to='/login'>Acceder</Link> 
                        : <Link to='/login'>Ver Perfil</Link>
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