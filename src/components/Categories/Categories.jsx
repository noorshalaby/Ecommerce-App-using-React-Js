import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import Slider from 'react-slick'

export default function Categories() {
    let [categories,setCategories]= useState()

    var settings = {
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    useEffect( ()=>{
      getCategories()
    } , [])

  function getCategories(){
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then(({data}) => setCategories(data.data) )
    .catch((err) => console.log(err))
  }

  return (
    <>

    <Slider {...settings}>
    {categories?.map((category,i) => <div className='my-8' key={i}>
      <img src={category?.image} className='w-full object-cover max-h-[300px]' />
      <h2 className='text-2xl text-center text-main font-bold mt-2'>{category?.name}</h2>
    </div>)}
    </Slider>
    
    </>
  )
}
