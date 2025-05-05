import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
        <div className='plan-details-container'>
            <h1 className='plan-details-titulo'>Plan de entrenamiento de {user.nombre}</h1>
            {plans.length>0 ? (
                plans.map((plan) =>(
                <div key={plan.id} className='plan-card'>
                    <p><strong>Nivel:</strong> {plan.nivel}</p>
                    <p><strong>Nombre: </strong> {plan.plan}</p>
                    <Link to={`/planDetails/${plan.id}`} className='btn-ver-detalles'>
                        Ver detalles del plan
                    </Link>
                </div>
                ))
                ) : (
                <p>No tienes un plan asignado todavía.</p>
                )}
        </div>
    )
}

export default PlanUser
