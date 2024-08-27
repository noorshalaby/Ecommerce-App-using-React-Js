import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';

export default function Layout() {
    let[count,setCount] = useState(10)

    useEffect(()=>{},[])
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto py-10">
      <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  )
}
