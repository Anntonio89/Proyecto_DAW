import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './Pages/Home'
import Error from './Pages/Error'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Services from './Pages/Services'
import Contact from './Pages/Contact'
import ProgresList from './Pages/Progres/ProgresList'
import CreateProgres from './Pages/Progres/CreateProgres'
import DetailsProgres from './Pages/Progres/DetailsProgres'
import EditProgres from './Pages/Progres/EditProgres'
import ExerciceList from './Pages/Exercices/ExerciceList'
import CreateExercice from './Pages/Exercices/CreateExercice'
import DetailsExercice from './Pages/Exercices/DetailsExercice'
import EditExercice from './Pages/Exercices/EditExercice'
import UsersList from './Pages/Users/UsersList'
import EditUser from './Pages/Users/EditUsers'
import PlanList from './Pages/Plan/PlanList'
import CreatePlan from './Pages/Plan/CreatePlan'
import ExerciceRut from './Pages/ExercicesRutina'
import EditPlan from './Pages/Plan/EditPlan'
import DetailsPlan from './Pages/Plan/DetailsPlan'
import PlanUser from './Pages/Plan/PlanUser'
import CreateDetails from './Pages/Details/CreateDetails'
import DetailList from './Pages/Details/DetailList'
import EditDetail from './Pages/Details/EditDetails'

function App() {

  const [filtro, setFiltro] = useState('')

  return (
    <>
    <Router>
      <Header filtro={filtro} setFiltro={setFiltro}/>
      <Routes>
        {/* Rutas publicas */}
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path="/users" element={<Register/>}/>
        <Route path="/login" element={<Login />} />   
        <Route path='/contact' element={<Contact/>}/>
        <Route element={<ProtectedRoutes rolPermitido={['USUARIO','ENTRENADOR', 'ADMIN']}/>}>
          <Route path='/details-progres' element={<DetailsProgres/>}/>
          <Route path='/exerciceRutina' element={<ExerciceRut/>}/>  
          <Route path='/planUser' element={<PlanUser/>}/> 
          <Route path='/exerciceList' element={<ExerciceList filtro={filtro}/>}/>
          <Route path='/exerciceDetail/:id' element={<DetailsExercice/>}/>
          <Route path="/planDetails/:id" element={<DetailsPlan />}/>
        </Route>

         {/* Rutas protegidas con permiso solo para ENTRENADORES */}
        <Route element={<ProtectedRoutes rolPermitido={['ENTRENADOR', 'ADMIN']}/>}>
          {/* CRUD PROGRESOS */}
          <Route path='/progresList' element={<ProgresList filtro={filtro}/>}/>
          <Route path='/progresCreate' element={<CreateProgres/>}/>
          <Route path='/progresEdit/:id' element={<EditProgres/>}/>
          {/* CRUD EJERCICIOS */}
          <Route path='/exerciceCreate' element={<CreateExercice/>}/>
          <Route path='/exerciceEdit/:id' element={<EditExercice/>}/>
          {/* CRUD PLANES */}
          <Route path='/planList' element={<PlanList filtro={filtro}/>}/>
          <Route path='/createPlan' element={<CreatePlan/>}/>
          <Route path='/planEdit/:id' element={<EditPlan/>}/>
          {/* CRUD DETALLES */}
          <Route path='/detailsList' element={<DetailList/>}/>
          <Route path='/createDetails/:idPlan' element={<CreateDetails/>}/>
          <Route path='/createDetails' element={<CreateDetails/>}/>
          <Route path='/detailEdit/:id' element={<EditDetail/>}/>
          {/* LISTA USUARIOS */}
          <Route path='/usersList' element={<UsersList filtro={filtro}/>}/>
        </Route>        
        {/* Rutas protegidas con permiso solo para ADMIN */}
        <Route element={<ProtectedRoutes rolPermitido={['ADMIN']}/>}>          
          <Route path='/userEdit/:id' element={<EditUser/>}/>
        </Route>      
        <Route path='*' element={<Error/>}/>

      </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App
