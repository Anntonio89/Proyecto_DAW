import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from '../../utils/function'
import Swal from 'sweetalert2'

function DetailsPlan() {
  const { id } = useParams()
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosClient.get(`/plan/${id}/details`)

        const diasOrden = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
        res.data.detalles.sort((a, b) => 
            diasOrden.indexOf(a.dia_semana) - diasOrden.indexOf(b.dia_semana)
        )
        
        setPlan(res.data)
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los detalles del plan',
          icon: 'error',
          background: 'black',
          confirmButtonColor: '#d1006a'
        })
      }
    }

    fetchDetails()
  }, [id])

  if (!plan) return <p className="text-center">Cargando detalles del plan...</p>

  return (
    <div className='List'>
      <div className="container mt-4">
        <h2>{plan.plan}</h2>
        <p><strong>Nivel:</strong> {plan.nivel}</p>
        <table className="table text-center">
          <thead>
            <tr>
              <th>Día</th>
              <th>Ejercicio</th>
              <th></th>
              <th>Series</th>
              <th>Reps</th>
              <th>Descanso (s)</th>
              <th>Grupo Muscular</th>
            </tr>
          </thead>
          <tbody>
            {plan.detalles.map((detalle) => (
              <tr key={detalle.id}>
                <td>{detalle.dia_semana}</td>
                <td>{detalle.ejercicio.nombre}</td>
                <td>
                    <img 
                      src={`http://localhost:3015/img_uploaded/${detalle.ejercicio.imagen}`} 
                      alt={detalle.ejercicio.nombre} 
                      style={{ maxWidth: '60px', height: 'auto' }} 
                      />
                </td>
                <td>{detalle.series}</td>
                <td>{detalle.repeticiones}</td>
                <td>{detalle.descanso}</td>
                <td>{detalle.ejercicio.grupo_muscular}</td>              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailsPlan
