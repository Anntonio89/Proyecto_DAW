import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
