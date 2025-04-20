import React from 'react'
import storage from '../utils/storage'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

function ProtectedRoutes() {

    const authUser=storage.get('authUser')
    const location=useLocation()

    if(!authUser){//En caso de no haber usuario autenticado, se redirige a la pagina de login
        return <Navigate to="/login"/>
    }
    if(authUser.rol==='USUARIO' && location.pathname ==='/services'){
        alert('Acceso Denegado')
        return <Navigate to='/'/>
        
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes