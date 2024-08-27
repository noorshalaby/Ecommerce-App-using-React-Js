import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { WishlistContext } from '../../../Context/WishlistContext'
import { CirclesWithBar } from 'react-loader-spinner'
import { CartContext } from '../../../Context/CartContext'
import toast from 'react-hot-toast'


export default function Wishlist() {
    let [wishInfo,setWishInfo] = useState(null)
    let {addWishlist,getWishlist,deleteWishlist} = useContext(WishlistContext)

    let {addProductToCart} = useContext(CartContext)

    useEffect( ()=>{
      getWish()
    },[])
    
   async function getWish(){
     let res =  await getWishlist();
    //  console.log(res);
     setWishInfo(res);
    }

   async function addWish(id){
    let res = await addWishlist(id);
    // console.log(res);
    setWishInfo(res)
   }


   async function removeWish(id){
     let res = await deleteWishlist(id)
    //  console.log(res);
    getWish(res)
    }  

    async function addToCartItem(id){
      let data =  await addProductToCart(id)
      // console.log(data);
       if(data.data.status == 'success'){
         toast.success(data.data.message,{
           className:"text-xl  font-bold text-center w-full",duration:2000
         }
       )
       }else{
         toast.error(data.data.message)
       }
     }
     

  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
    <h2 className='text-5xl main-color font-bold text-center'>Your WISHLIST</h2>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {wishInfo?.data?.map(ele =>  <>
            <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                <td className="p-4">
                    <img src={ele.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele.title}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {ele.price} L.E
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-between">
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>removeWish(ele.id)}>Remove <i className="fa-solid fa-trash text-red-600"></i></button>
                <button className='w-50 bg-main my-3 p-3 rounded-lg font-semibold mx- text-white' onClick={() => addToCartItem(ele.id)}> + Add  to cart</button>
                </div>
                </td>
            </tr>     
          </> )}
        </tbody>
    </table>
</div>  
    </> 
  )
}
