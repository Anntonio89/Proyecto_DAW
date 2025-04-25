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
import CreateProgres from './Pages/Progres/CreateProgres'
import DetailsProgres from './Pages/Progres/DetailsProgres'
import ExerciceList from './Pages/Exercices/ExerciceList'
import DetailsExercice from './Pages/Exercices/DetailsExercice'
import EditExercice from './Pages/Exercices/EditExercice'

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/exercice' element={<ExerciceList/>}/>
        <Route path='/exerciceDetail/:id' element={<DetailsExercice/>}/>
        <Route path='/exerciceEdit/:id' element={<EditExercice/>}/>
        {/* Rutas protegidas encapsuladas dentro de este Route */}
        {/* <Route element={<ProtectedRoutes/>}> */}
          <Route path='/exerciceFun' element={<ExercicesFun/>}/>
          <Route path='/progres' element={<CreateProgres/>}/>
          <Route path='/details-progres' element={<DetailsProgres/>}/>
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
