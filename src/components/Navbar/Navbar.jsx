import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserTokenContext } from './../../../Context/UserTokenContext';
import { CounterContext } from './../../../Context/CounterContext';


export default function Navbar() {
    let x = useContext(CounterContext)

    let navigate = useNavigate()  
    let {token,setToken} = useContext(UserTokenContext)
    
    useEffect(()=>{},[])
    function logOut(){
      setToken(null);
      localStorage.removeItem("token");
      navigate("/login")
    }


  return (
    <nav className='light-color xl:fixed left-0 right-0 top-0 z-50'>
      <div className="container mx-auto flex justify-between p-2 items-center text-center flex-col lg:flex-row">
        <div className="items-center flex flex-col lg:flex-row lg:pe-5">
          <i className='fa-solid main-color fa-cart-shopping nav-icon  text-4xl'></i>
          <h1 className='text-3xl ps-1 font-semibold'><NavLink to='home'>Fresh Cart</NavLink></h1>
          </div>
            {token ?    <ul className="center-side flex flex-col lg:flex-row gap-5 lg:gap-10 text-2xl items-center text-white">
            
            <li>
              <NavLink to='home'>Home</NavLink>
            </li>
            <li>
              <NavLink to='Cart'>Cart</NavLink>
            </li>
            <li>
              <NavLink to='wishlist'>Wishlist</NavLink>
            </li>
            <li>
              <NavLink to='products'>Products</NavLink>
            </li>
            <li>
              <NavLink to='categories'>Categories</NavLink>
            </li>
            <li>
              <NavLink to='brands'>Brands</NavLink>
            </li>
          </ul> : null }

          {/*  */}

            <ul className='flex  flex-col lg:flex-row gap-5 lg:gap-5 text-2xl items-center text-white'>
           {token ?<>
           <li> <Link to='cart'> <div className="badge position-absolute text-white top-0 end-0 bg-main"></div> <i className="fa-solid fa-cart-shopping fs-3"> </i> </Link></li>
           <li> <button to='signout' className='text-black' onClick={logOut}>SignOut</button> </li>
           </>
           : <>
            <li>
              <NavLink to='register'>Register</NavLink>
            </li>
            <li>
              <NavLink to='login'>login</NavLink>
            </li>
           </> }
            </ul>
      </div>
    </nav>
  )
}


