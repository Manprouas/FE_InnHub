import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path=''/>
        <Route/>
      </Routes>
    </div>
  ) 
}

export default Routers