import React, { useState, useEffect } from 'react'

function ExerciceRut() {
  const [pause, setPause] = useState(true)
  const [minutos, setMinutos] = useState(10)
  const [segundos, setSegundos] = useState(0)
  const [fase, setFase] = useState(true) // true = entrenamiento, false = descanso

  const [imagenIndex, setImagenIndex] = useState(0)
  const [cuenta, setCuenta] = useState(10)

  const images = [
    '/exercices/abdominales-asistidos-oblicuos.gif',
    '/exercices/abdominales crunch oblicuo.gif',
    '/exercices/abdominales crunch piernas elevadas.gif'
  ]

  const handlePause = () => {
    setPause(prev => !prev)
  }

  //Temporizador Pomodoro
  useEffect(() => {
    let intervalo
    if (!pause) {
      intervalo = setInterval(() => {
        setSegundos(prev => {
          if (prev > 0) return prev - 1
          if (minutos > 0) {
            setMinutos(prevMin => prevMin - 1)
            return 59
          } else {
            const siguienteFase = !fase
            setFase(siguienteFase)
            setMinutos(siguienteFase ? 10 : 3)
            return 0
          }
        })
      }, 1000)
    }
    return () => clearInterval(intervalo)
  }, [pause, minutos, fase])

  //Cambio de imagen cada 10 segundos
  useEffect(() => {
    let imageInterval
    if (!pause) {
      imageInterval = setInterval(() => {
        setImagenIndex(prev => (prev + 1) % images.length)
        setCuenta(10)
      }, 10000)
    }
    return () => clearInterval(imageInterval)
  }, [pause])

  useEffect(() => {
    let cuentaInterval
    if (!pause) {
      cuentaInterval = setInterval(() => {
        setCuenta(prev => (prev > 1 ? prev - 1 : 1))
      }, 1000)
    }
    return () => clearInterval(cuentaInterval)
  }, [pause])

  return (
    <div className='exercice-Rut-Container'>
        <div className='container text-center mt-4'>
            <h1 className='exer-Rut-Edit-Titulo'>Rutina Funcional</h1>
            <button onClick={handlePause} className='btn-custom-ex-Rut'>
                {pause ? 'Iniciar' : 'Pausar'}
            </button>

            <h2>{fase ? 'Fase: Entrenamiento' : 'Fase: Descanso'}</h2>

            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d1006a' }}>
                {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
            </p>

            <div className='row justify-content-center'>
                {images.map((img, index) => (
                <div
                    key={index}
                    className='col-md-4 text-center mb-4'
                    style={{
                    opacity: imagenIndex === index ? 1 : 0.4,
                    transform: imagenIndex === index ? 'scale(1.1)' : 'scale(0.95)',
                    transition: 'all 0.5s ease-in-out'
                    }}
                >
                    <img
                    src={img}
                    alt={`Ejercicio ${index}`}
                    className='img-fluid custom-img'
                    style={{ maxHeight: '250px', objectFit: 'contain' }}
                    />
                    {imagenIndex === index && (
                    <p style={{ fontSize: '1.5rem', marginTop: '10px', fontWeight: 'bold' }}>
                        Cambia en: {cuenta}
                    </p>
                    )}
                </div>
                ))}
            </div>
            
        </div>
    </div>
  )
}

export default ExerciceRut
