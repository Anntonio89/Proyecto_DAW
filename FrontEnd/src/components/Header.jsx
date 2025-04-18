import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import storage from '../utils/storage'

function Header() {
  return (
    <>
    <header className='header'>
        <nav className='nav'>
            <Link to='/'>Inicio</Link>
            <Link to='/about'>Qué ofrecemos</Link>
            <Link to='/contact'>Contacto</Link>
            <Link to='/login'>Acceder</Link>
        </nav>
        <div className='busqueda'>
            <input type='text' placeholder='Buscar...'/>
        </div>
    </header>   
    </>
  )
}

export default Header