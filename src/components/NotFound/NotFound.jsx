import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './NotFound.module.css'
import image1 from '../../assets/images/404.png'

export default function NotFound() {
    let [count,setCount] = useState()

    useEffect( ()=>{} , [])
  return (
    <>
    <div className="row">
      <h2 className='mx-auto text-6xl main-color my-7'>Page Not Found Error 404</h2>
      <img src={image1} alt='url not found image'/>
    </div>
    </>
  )
}
