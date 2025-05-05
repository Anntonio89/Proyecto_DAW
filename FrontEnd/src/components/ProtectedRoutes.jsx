import React from 'react'
import storage from '../utils/storage'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'

function ProtectedRoutes({rolPermitido}) {

    const authUser=storage.get('authUser')
    const location=useLocation()

    if(!authUser){//En caso de no haber usuario autenticado, se redirige a la pagina de login
        return <Navigate to="/login"/>
    }
    if(!rolPermitido.includes(authUser.rol)){//Si el rol del usuario autenticado es uno de los permitidos, se permite el acceso a la ruta
        Swal.fire({
            title:'Acceso Denegado',
            text:'Sin permisos de acceso a esta sección',
            icon:'error',
            background:'black',
            confirmButtonColor: '#d1006a',
            confirmButtonText:'Volver',
            showClass:{
              popup:''
            },
            hideClass:{
              popup:''
            }
        })
        return <Navigate to='/'/>
        
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes