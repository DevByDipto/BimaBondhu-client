import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/shared/navber/Navber'
import Footer from '../pages/shared/fotter/Footer'

const MainLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout