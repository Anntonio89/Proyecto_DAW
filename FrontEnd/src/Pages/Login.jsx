import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {login} from '../utils/auth'

function Login() {

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const navigate=useNavigate()

  return (
    <div>
        <h1>Login</h1>
        <form>
            <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email'/>
            <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Contraseña'/>
        </form>
    </div>
  )
}

export default Login