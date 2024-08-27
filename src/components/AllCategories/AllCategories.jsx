import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './AllCategories.module.css'
import { useQuery } from '@tanstack/react-query';
import { CirclesWithBar } from 'react-loader-spinner';

export default function AllCategories() {
  function getAllCategories(){
    return  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let {isLoading,data,isError} =  useQuery({
    queryKey: ["allcategories"],
    queryFn: getAllCategories,
  })

  if(isLoading){
    return <div className="flex bars justify-center bg-transparent"> <CirclesWithBar width={120}  height={120}/> </div>
  }


  if(isError){
    return <div > Error</div>
  }

    useEffect( ()=>{} , [])


  return (
    <>
    <div className="row">
    {data?.data.data.map( (category)=> <>
    <div className="md:w-1/3  product gap-10" >
      <div className="p-5">
       <img src={category.image} className='w-full '  alt="" /> 
       </div>
      <h1 className='text-center font-bold mb-10'>{category.name}</h1>
      </div>
    </>  )}
    </div>
    </>
  )
}
