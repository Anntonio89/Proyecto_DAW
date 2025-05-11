import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

function Contact() {
    const [email,setEmail]=useState('')
    const [mensaje, setMensaje]=useState('')
    const [aceptaPoliticas, setAceptaPoliticas]=useState(false)
    const navigate=useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!aceptaPoliticas) {
            Swal.fire({
              title: 'Aviso',
              text: 'Debes aceptar las políticas de privacidad',
              icon: 'warning',
              background: 'black',
              confirmButtonColor: '#d1006a'
            })
            return
          }
      
          Swal.fire({
            title: 'Enviado',
            text: 'Tu mensaje ha sido enviado con éxito',
            icon: 'success',
            background: 'black',
            confirmButtonColor: '#d1006a'
          })
      
          setEmail('')
          setMensaje('')
          setAceptaPoliticas(false)
        }
      
        return (
          <div className="contacto-container">
            <div className="contacto-form">
              <h1 className="contacto-titulo">¡CUENTA CON NOSOTROS!</h1>
              <form onSubmit={handleSubmit}>
                <label className="contacto-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="contacto-input"
                />
                <label className="contacto-label">Mensaje</label>
                <textarea
                  value={mensaje}
                  onChange={e => setMensaje(e.target.value)}
                  required
                  rows={5}
                  className="contacto-textarea"
                />
                <div className="contacto-politicas">
                  <input
                    type="checkbox"
                    checked={aceptaPoliticas}
                    onChange={e => setAceptaPoliticas(e.target.checked)}
                  />
                  <label>Acepto las políticas de privacidad</label>
                </div>
                <button type="submit" className="contacto-boton">ENVIAR</button>
              </form>
            </div>
      
            <div className="contacto-info">
              <h2 className="contacto-titulo">ENCUÉNTRANOS</h2>
              <p><strong>DIRECCIÓN</strong></p>
              <p>Bulevar Ambrosio Cotes 22, Villena, CP 03400</p>
              <p><strong>TELÉFONO</strong></p>
              <p>900 900 922</p>
            </div>
          </div>
        )
      
}

export default Contact