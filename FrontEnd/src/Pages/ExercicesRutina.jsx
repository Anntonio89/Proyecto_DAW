import React, { useState, useEffect } from 'react'

function ExerciceRut() {
  const [pause, setPause] = useState(true)
  const [segundos, setSegundos] = useState(600)// 10 minutos de entrenamiento
  const [fase, setFase] = useState(true) // true = entrenamiento, false = descanso

  const [imagenIndex, setImagenIndex] = useState(0)
  const [cuenta, setCuenta] = useState(10)

  const images = [
    '/exercices/abdominales-asistidos-oblicuos.gif',
    '/exercices/abdominales crunch oblicuo.gif',
    '/exercices/abdominales crunch piernas elevadas.gif',
    '/exercices/abdominales crunch.gif',
  ]

  const handlePause = () => {
    setPause(prev => !prev)
  }

  //Temporizador Pomodoro
  useEffect(() => {
    let intervalo
    if (!pause) {
      intervalo = setInterval(() => {
        setSegundos(prevSeg => {
          if (prevSeg > 0){
             return prevSeg - 1          
          } else {
            const nuevaFase = !fase
            setFase(nuevaFase)
            return nuevaFase ? 600 : 120 // 10 minutos de entrenamiento, 2 minutos de descanso
          }
        })
      }, 1000)
    }
    return () => clearInterval(intervalo)
  }, [pause, fase])

  //Cambio de imagen cada 10 segundos
  useEffect(() => {
    let imageInterval
    if (!pause && fase) {
      imageInterval = setInterval(() => {
        setImagenIndex(prev => (prev + 1) % images.length)
        setCuenta(10)
      }, 10000)
    }
    return () => clearInterval(imageInterval)
  }, [pause, fase])

  useEffect(() => {
    let cuentaInterval
    if (!pause && fase) {
      cuentaInterval = setInterval(() => {
        setCuenta(prev => (prev > 1 ? prev - 1 : 1))
      }, 1000)
    }
    return () => clearInterval(cuentaInterval)
  }, [pause, fase])

  const minutos = Math.floor(segundos / 60)
  const segundosRestantes = segundos % 60

  return (
        <div className='container text-center mt-4' style={{backgroundColor: 'white', padding: '40px', marginTop: 0}}>
            <h1 style={{fontSize: '70px', fontStyle:'italic', color: '#d1006a'}}>{fase ? '¡A entrenar!' : 'Descanso'}</h1>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d1006a' }}>
                {String(minutos).padStart(2, '0')}:{String(segundosRestantes).padStart(2, '0')}
            </p>
            <button onClick={handlePause} className='btn-custom-ex-Rut'>
                {pause ? 'Iniciar' : 'Pausar'}
            </button>            
            <p 
                style={{ fontSize: '1.5rem', marginTop: '10px', fontWeight: 'bold' }}>
                  Siguiente ejercicio en: {cuenta}s
            </p>

            {fase && (
            <div className='row justify-content-center'>
                {images.map((img, index) => (
                <div
                    key={index}
                    className='col-md-4 text-center mb-4'
                    style={{
                      opacity: imagenIndex === index ? 1 : 0.2,
                      transform: imagenIndex === index ? 'scale(1.1)' : 'scale(0.95)',
                      transition: 'all 0.5s ease-in-out',
                      padding: '20px',
                      margin: '15px',   
                      borderRadius: '10px',
                      boxShadow: '8px 8px 8px 8px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <img
                    src={img}
                    alt={`Ejercicio ${index}`}
                    className='img-fluid custom-img'
                    style={{ maxHeight: '300px',
                              objectFit: 'contain',
                            }}
                    />    
                 </div>
                ))}
            </div>
            )}
        </div>
  )
}

export default ExerciceRut
