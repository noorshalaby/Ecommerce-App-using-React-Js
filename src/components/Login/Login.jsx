import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import { UserTokenContext } from '../../../Context/UserTokenContext';




export default function Login() {
  let[apiErr,setApiErr] = useState(null)
  let[isLoading,setIsLoading] = useState(false)
  let navigate = useNavigate()
  let tokenContext = useContext(UserTokenContext)

  useEffect(()=>{},[])

 function login(formValue){
   setApiErr(null)
   setIsLoading(true)
  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",formValue) 
  .then((res)=> {
    let {data} = res;
    // console.log(data.message,"data.message");
    if(data.message == "success"){
     localStorage.setItem("token",data.token)
     tokenContext.setToken(data.token)
     navigate('/home')
    }else{}
    
  })
  .catch((err) => {
    setApiErr(err.response.data.message)
    setIsLoading(false)
  })
//  console.log(data);
}


 ////// ! YUP Validation //////////
 const validationSchema = ()=>{
 return Yup.object({
    email:Yup.string().email("Invalid Email").required("Required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/).required("Required"),
  })
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  let myForm = useFormik({
    initialValues:{
    email:"",
    password:""
    },
    validationSchema,
    onSubmit:login
  })


return (
  <>
 {apiErr && <div className=" mx-auto max-w-lg p-4 my-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apiErr}</span>
  </div>}
  
  <form onSubmit={myForm.handleSubmit}  className='mt-10 mx-auto max-w-lg'>
  <div className="mb-5">
  <label htmlFor="email" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your email</label>
  <input type="email" id="email" name='email' value={myForm.values.email} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ForEx name@gmail.com"/>
  </div>
  {myForm.errors.email && myForm.touched.email ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{myForm.errors.email}</span>
  </div> : null }
 

  <div className="mb-5">
  <label htmlFor="password" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your Password</label>
  <input type="password" id="password" name='password' value={myForm.values.password} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Password"/>
  </div>

  {myForm.errors.password && myForm.touched.password ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{myForm.errors.password}</span>
  </div> : null }
   

  <div className="mb-5">  
  <button type="submit" disabled={isLoading} className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading ? <i className='fa fa-spinner fa-spin text-2xl'></i> : "Login"} 
    </button>
  </div>
  </form>

    <p className='text-center'><Link to='/forget' className='main-color font-bold underline'>Forget Password</Link></p>
  </>
)
}
