import {NavLink} from 'react-router-dom'

function Error() {
  return (
    <div className='error'>
        <h1>404 - Página no encontrada</h1>
        <p>La ruta a la que intentas acceder no existe.</p>
        <NavLink className='link-Error' to="/">Volver al inicio</NavLink>
    </div>
  )
}

export default Error