import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    let[apiErr,setApiErr] = useState(null)
    let[isLoading,setIsLoading] = useState(false)
    let navigate = useNavigate()
    useEffect(()=>{},[])
  
   function register(formValue){
     setApiErr(null)
     setIsLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",formValue)
    .then((res)=> {
      let {data} = res;
      // console.log(data.message,"data.message");
      if(data.message == "success"){
       navigate('/login')
        //login
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
      name:Yup.string().min(3,"Name should be at least 3").max(10,"Max is 10 Characters").required("Required"),
      email:Yup.string().email("Invalid Email").required("Required"),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/).required("Required"),
      rePassword:Yup.string().oneOf([Yup.ref("password")],"Repassword should match Password").required("Required"),
      phone:Yup.string().matches(/^01[125][0-9]{8}$/).required("Required")
    })
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    let myForm = useFormik({
      initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
      },
      validationSchema,
      onSubmit:register
    })

  return (
    <>
   {apiErr && <div className=" mx-auto max-w-lg p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{apiErr}</span>
    </div>}

    <form onSubmit={myForm.handleSubmit}  className='mt-10 mx-auto max-w-lg'>
    <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" id="name" name='name' value={myForm.values.name} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Name"/>
    </div>

    {myForm.errors.name && myForm.touched.name ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{myForm.errors.name}</span>
    </div> : null }
   

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
    <label htmlFor="rePassword" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Repassword</label>
    <input type="password" id="rePassword" name='rePassword' value={myForm.values.rePassword} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type RePassword"/>
    </div>

    {myForm.errors.rePassword && myForm.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{myForm.errors.rePassword}</span>
    </div> : null }
   

    <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Your Phone</label>
    <input type="tel" id="phone" name='phone' value={myForm.values.phone} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Phone"/>
    
    {myForm.errors.phone && myForm.touched.phone ? <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{myForm.errors.phone}</span>
    </div> : null }
    
    <button type="submit" disabled={isLoading} className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {isLoading ? <i className='fa fa-spinner fa-spin text-2xl'></i> : "Submit"} 
      </button>
    </div>
    </form>
    
    </>
  )
}


