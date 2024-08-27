import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import { UserTokenContext } from '../../../Context/UserTokenContext';




export default function ResetCode() {
  let[apiErr,setApiErr] = useState(null)
  let[isLoading,setIsLoading] = useState(false)
  let navigate = useNavigate()
  let tokenContext = useContext(UserTokenContext)

  useEffect(()=>{},[])

async function ResetCode(formValue){
   setApiErr(null)
   setIsLoading(true)
try {
  
  let {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",formValue) 
  console.log(data);
  if(data.status ==='Success'){
    setIsLoading(false)
    navigate("/newpassword")
  }
} catch (error) {
  setApiErr(error?.response.data.message)
  setIsLoading(false)
}

 console.log(data);
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  let myForm = useFormik({
    initialValues:{
    resetCode:"",
    },
    onSubmit:ResetCode
  })


return (
  <>
 {apiErr && <div className=" mx-auto max-w-lg p-4 my-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apiErr}</span>
  </div>}

  <form onSubmit={myForm.handleSubmit}  className='mt-10 mx-auto max-w-lg'>
  <div className="mb-5">
  <label htmlFor="resetCode" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white">Verify Reset Code</label>
  <input type="text" id="resetCode" name='resetCode' value={myForm.values.resetCode} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Code"/>
  </div>

  <div className="mb-5">  
  <button type="submit"  className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading ? <i className='fa fa-spinner fa-spin text-2xl'></i> : "Submit"} 
    </button>
  </div>
  </form>

  </>
)
}
