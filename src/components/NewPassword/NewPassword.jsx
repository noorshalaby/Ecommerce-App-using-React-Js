import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import { UserTokenContext } from '../../../Context/UserTokenContext';




export default function NewPassword() {
  let[apiErr,setApiErr] = useState(null)
  let[isLoading,setIsLoading] = useState(false)
  let navigate = useNavigate()
  let tokenContext = useContext(UserTokenContext)

  useEffect(()=>{},[])

  async function Newpassword(formValue){
    setApiErr(null)
    setIsLoading(true)
 try {
   
   let {data} =  await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",formValue) 
   console.log(data);
   if(data.token){
     navigate("/login")
   }
 } catch (error) {
   setApiErr(error?.response.data.message)
   setIsLoading(false)
 }
 
  console.log(data);
 }


 ////// ! YUP Validation //////////
 const validationSchema = ()=>{
 return Yup.object({
    email:Yup.string().email("Invalid Email").required("Required"),
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/).required("Required"),
  })
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  let myForm = useFormik({
    initialValues:{
    email:"",
    newPassword:""
    },
    validationSchema,
    onSubmit:Newpassword
  })


return (
  <>
 {apiErr && <div className=" mx-auto max-w-lg p-4 my-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apiErr}</span>
  </div>}
  <h2 className='my-3 text-2xl main-color text-center font-bold mt-5'>New Password:</h2>
  <form onSubmit={myForm.handleSubmit}  className='mt-10 mx-auto max-w-lg'>
  <div className="mb-5">
  <label htmlFor="email" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your email</label>
  <input type="email" id="email" name='email' value={myForm.values.email} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ForEx name@gmail.com"/>
  </div>
  {myForm.errors.email && myForm.touched.email ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{myForm.errors.email}</span>
  </div> : null }
 

  <div className="mb-5">
  <label htmlFor="newPassword" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">New Password</label>
  <input type="password" id="newPassword" name='newPassword' value={myForm.values.newPassword} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Password"/>
  </div>

  {myForm.errors.newPassword && myForm.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{myForm.errors.newPassword}</span>
  </div> : null }
   

  <div className="mb-5">  
  <button type="submit" disabled={isLoading} className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading ? <i className='fa fa-spinner fa-spin text-2xl'></i> : "Submit"} 
    </button>
  </div>
  </form>

  </>
)
}
