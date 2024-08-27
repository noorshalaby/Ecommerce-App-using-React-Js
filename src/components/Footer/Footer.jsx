import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
    let[count,setCount] = useState(10)

    useEffect(()=>{},[])
  return (
    <div className='light-color text-center text-2xl fixed bottom-0 left-0 right-0 p-3 font-semibold text-black'>
      All Copy Right &copy; Reserved to Route 2024
    </div>
  )
}

