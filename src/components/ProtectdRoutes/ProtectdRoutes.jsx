import React, { useEffect, useState } from 'react'
import styles from './ProtectdRoutes.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectdRoutes({children}) {
    let[count,setCount] = useState(10)

    useEffect(()=>{},[])
    
    if(localStorage.getItem("token")){
      return children
    }else {
     return <Navigate to ={"/login"}/>
    }
 
}
