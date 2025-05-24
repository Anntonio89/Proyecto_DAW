import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axiosClient from '../../utils/function'
import storage from '../../utils/storage'

function PlanUser() {
    const [plans, setPlans] = useState([])
    const [user] = useState(storage.get('authUser'))

    useEffect(() => {
        if (user) {
            const fetchPlanes = async () => {
                try {
                    const res = await axiosClient.get('http://localhost:3015/plan/plan') 
                    setPlans(res.data)
                    console.log(res.data)
                } catch (error) {
                    console.error(error)
                }
            }
            fetchPlanes()
        }
    }, [user])

    return (
        <div className='details-Container'>
            <h1 className='details-Titulo'>Planes de {user.nombre}</h1>
            <div className='details-Card'>
                {plans.length>0 ? (
                    plans.map((plan) =>(
                    <div key={plan.id} className='progres-card'>  
                     <div className='progres-card destacada'>                    
                        <p style={
                            {   fontSize:'40px',
                                fontWeight:'bold',
                            }}>Plan</p>
                        <p><strong>Nivel:</strong>{plan.nivel}</p>
                        <p><strong>Nombre:</strong>{plan.plan}</p>
                        <Link to={`/planDetails/${plan.id}`} className='user-Progres' 
                            style={
                            {
                                color:'#d1006a',
                                textDecoration:'none',
                                fontWeight:'bold',
                                marginBottom:'20px',
                            }}>
                            Ver detalles del plan
                        </Link>
                    </div>
                    </div>
                    ))
                    ) : (
                    <p>No tiene un plan asignado todavía. Póngase en contacto con su entrenador personal</p>
                    )}
                <div style={
                    {   display:'flex',
                        justifyContent:'center',
                        marginTop:'20px',
                    }}>
                
                    <NavLink to='/login' className='link-Error'>Volver</NavLink>

                </div>    
            </div>
        </div>
    )
}

export default PlanUser
