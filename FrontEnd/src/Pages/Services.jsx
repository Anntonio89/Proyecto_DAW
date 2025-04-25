import React from 'react'
import { NavLink } from 'react-router-dom'

function Services() {
  return (
    <div className="services">
            <h1 className='text-center mb-5' style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '2.5rem' }}>¿QUÉ OFRECEMOS?</h1>
            <div className='row justify-content-center'>
            <div className='col-md-4 text-center mb-4'>
                  <NavLink to='/exercice' className={({ isActive }) => (isActive ? 'active' : '')}>
                    <img src='/3.jpg' className='img-fluid custom-img'/>
                    <h5 style={{ fontFamily: 'Open Sans, sans-serif', color: '#d1006a' }}>ENTRENAMIENTOS PERSONALES</h5>
                  </NavLink>
                </div>
                <div className='col-md-4 text-center mb-4'>
                  <NavLink to='/exerciceFun' className={({ isActive }) => (isActive ? 'active' : '')}>
                    <img src='/4.jpeg' className='img-fluid custom-img'/>
                    <h5 style={{ fontFamily: 'Open Sans, sans-serif', color: '#d1006a' }}>EJERCICIOS FUNCIONALES</h5>
                  </NavLink>
                </div>
                <div className='col-md-4 text-center mb-4'>
                  <NavLink to='/exercice' className={({ isActive }) => (isActive ? 'active' : '')}>
                    <img src='/5.jpg' className='img-fluid custom-img'/>
                    <h5 style={{ fontFamily: 'Open Sans, sans-serif', color: '#d1006a' }}>PLANES DE ENTRENAMIENTO</h5>
                  </NavLink>
                </div>
        </div>
    </div>
  )
}

export default Services