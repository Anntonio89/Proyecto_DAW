import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Services from './Pages/Services'
import ExercicesFun from './Pages/ExercicesFun'
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
import ExerciceRut from './Pages/ExercicesRutina'

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/exerciceRutina' element={<ExerciceRut/>}/>
        <Route path='/exercice' element={<ExerciceList/>}/>
        <Route path='/exerciceDetail/:id' element={<DetailsExercice/>}/>
        <Route path='/exerciceEdit/:id' element={<EditExercice/>}/>
        <Route path='/exerciceCreate' element={<CreateExercice/>}/>
        <Route element={<ProtectedRoutes/>}>
            <Route path='/plans' element={<PlanList/>}/>
        </Route>
        
        <Route path='/usersList' element={<UsersList/>}/>
        <Route path='/userEdit/:id' element={<EditUser/>}/>
        {/* Rutas protegidas encapsuladas dentro de este Route */}
        {/* <Route element={<ProtectedRoutes/>}> */}
          <Route path='/exerciceFun' element={<ExercicesFun/>}/>
          <Route path='/progresList' element={<ProgresList/>}/>
          <Route path='/progres' element={<CreateProgres/>}/>
          <Route path='/details-progres' element={<DetailsProgres/>}/>
          <Route path='/progresEdit/:id' element={<EditProgres/>}/>
        {/* </Route> */}
        <Route path="/users" element={<Register/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App
