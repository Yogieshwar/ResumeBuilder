import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './pages/Protected'
import ResumeTabs from './pages/ResumeTabs'
import ResumeForm from './pages/ResumeForm'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/resumetabs' element={<ResumeTabs/>}/>
        <Route path='/resumeform' element={<ResumeForm/>}/>
        </Routes>
      
    </div>
  )
}

export default App
