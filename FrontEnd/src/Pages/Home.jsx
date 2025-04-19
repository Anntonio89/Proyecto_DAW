import { useNavigate} from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate('/login')
    }

  return (
    <div className="home-Container">
        <div className='home-content'>
            <div className="logo">
                <img src='/Logotipo.png' alt='logo'/>
            </div>
            <button className="comienza-Button" onClick={handleClick}>Comienza tu cambio</button>
        </div>
        
    </div>
  )
}

export default Home