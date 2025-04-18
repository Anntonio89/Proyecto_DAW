import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './Pages/Login'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App
