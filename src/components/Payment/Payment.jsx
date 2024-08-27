import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Payment.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { CartContext } from './../../../Context/CartContext';


export default function Payment() {

  const {cartId} = useContext(CartContext)

  const headers = {
    token:window.localStorage.getItem("token")
}
  function createCashOrder(values){
     const backendBody = {
      shippingAddress: values,  
     }
     axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,backendBody,{headers}).then((res) => {
      console.log('after order',res);
     })
     .catch((err)=>{
       console.log(err,"err");
     })
  }
  
   const paymentFormik =  useFormik({
      initialValues:{
        details:'',
        phone:'',
        city:''
      },
      onSubmit:createCashOrder
    })


  //  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/
  //   ${cartId}?url=http://localhost:5173/`,{shippingAddress},{headers:{token}})


return (
  <>
    <div className="container mx-auto p-5">
          <form onSubmit={paymentFormik.handleSubmit}  className='mt-10 mx-auto max-w-lg'>
        <div className="mb-5">
        <label htmlFor="text" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your Details</label>
        <input type="details" id="details" name='details' value={paymentFormik.values.details} onBlur={paymentFormik.handleBlur} onChange={paymentFormik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Details"/>
        </div>
        {paymentFormik.errors.details && paymentFormik.touched.details ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{paymentFormik.errors.details}</span>
        </div> : null }
      

        <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your phone</label>
        <input type="tel" id="phone" name='phone' value={paymentFormik.values.phone} onBlur={paymentFormik.handleBlur} onChange={paymentFormik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Phone"/>
        </div>

        {paymentFormik.errors.phone && paymentFormik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{paymentFormik.errors.phone}</span>
        </div> : null }
        
        <div className="mb-5">
        <label htmlFor="city" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your city</label>
        <input type="text" id="city" name='city' value={paymentFormik.values.city} onBlur={paymentFormik.handleBlur} onChange={paymentFormik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your city"/>
        </div>

        {paymentFormik.errors.city && paymentFormik.touched.city ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{paymentFormik.errors.city}</span>
        </div> : null }

        <div className="mb-5">  
        <button type="submit"  className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cash Order
          </button>
        </div>
  </form>

    </div>  
  </>
)
}

