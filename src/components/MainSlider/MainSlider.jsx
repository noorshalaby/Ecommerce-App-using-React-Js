import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './MainSlider.module.css'
import Slider from 'react-slick'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import slider4 from '../../assets/images/slider-2.jpeg'

export default function MainSlider() {
    let [count,setCount] = useState()
    var settings = {
      dots: true,
      infinite: true,
      fade:true,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    useEffect( ()=>{} , [])
  return (
   <div className="row mt-10 overflow-hidden">
    <div className="w-3/4">
    <Slider {...settings} > 
      <img src={slider3} className='h-[600px] object-cover' alt=''/>
      <img src={slider4} className='h-[600px] object-cover' alt=''/>
      <img src={slider1} className='h-[600px] object-cover'  alt=''/> 
    </Slider>
    </div>
    <div className="w-1/4 overflow-hidden">
      <img src={slider2} className='h-[300px] object-cover' alt=''/>
      <img src={slider3} className='h-[300px] object-cotain' alt=''/>
    </div>
   </div>
  )
}
