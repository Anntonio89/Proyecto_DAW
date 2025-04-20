import React from 'react'

function Services() {
  return (
    <div className="services">
            <h1 className='text-center mb-5' style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '2.5rem' }}>¿QUÉ OFRECEMOS?</h1>
            <div className='row justify-content-center'>
                <div className='col-md-4 text-center mb-4'>
                    <img src='/3.jpg' className='img-fluid custom-img'/>
                    <h5 style={{ fontFamily: 'Open Sans, sans-serif', color: '#d1006a' }}>ENTRENAMIENTOS PERSONALES</h5>
                </div>
                <div className='col-md-4 text-center mb-4'>
                    <img src='/4.jpeg' className='img-fluid custom-img'/>
                    <h5 style={{ fontFamily: 'Open Sans, sans-serif', color: '#d1006a' }}>EJERCICIOS FUNCIONALES</h5>
                </div>
                <div className='col-md-4 text-center mb-4'>
                    <img src='/5.jpg' className='img-fluid custom-img'/>
                    <h5 style={{ fontFamily: 'Open Sans, sans-serif', color: '#d1006a' }}>RUTINAS ENTRENAMIENTO</h5>
                </div>
        </div>
    </div>
  )
}

export default Services