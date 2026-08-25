import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SopList from './pages/SopList';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Template from './pages/Template';
const App = () => {

  
  return (
    <>

      <ToastContainer position='top-right' />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
          <Route path='/sops' element={<ProtectedRoute>
            <SopList/>
          </ProtectedRoute>}/>

            <Route path='/how-it-works' element={<HowItWorks/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/templates' element={<Template/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App