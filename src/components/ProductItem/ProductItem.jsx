import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom'
import { WishlistContext } from '../../../Context/WishlistContext'
import toast from 'react-hot-toast'

export default function ProductItem({product,addCart,loading,currentIds}) {

  let {addWishlist} =useContext(WishlistContext)

  async function addWishlistItem(id){
    let data = await addWishlist(id)
    // console.log(data);
    if(data.data.status == 'success'){
      toast.success(data.data.message,{
        className:"text-xl text-green-600 font-bold text-center w-full",duration:2000
      }
    )
    }else{
      toast.error(data.data.message)
    }
  }

    useEffect(()=>{},[])
  return (
   <>
    <div className="xl:w-1/4 md:w-2/4 p-2 gap-2" >
        <div className="product hover:rounded-lg overflow-hidden p-1">
          <Link to={`/productdetails/${product.id}/${product.category._id}`}>
          <div className='product-info'>
          <img src={product.imageCover} className='w-full'  alt={product.title} />
          <div className="p-5">
          <span className='main-color py-2 '>{product.category?.name}</span>
          <h2 className='font-bold py-2 '>{product.title.split(" ").splice(0,2).join(" ")}</h2>
          <div className=" py-2 flex justify-between">
            <span>{product.price} EGP</span>
            <span><i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage} </span>
          </div>
         <button><i className="fa-solid fa-heart text-5xl mx-auto relative left-[50%]" onClick={() => addWishlistItem(product.id)}></i></button> 
          </div>
          </div>
          </Link>
          <button className='btn my-3 p-3 rounded-lg font-semibold' onClick={() =>  addCart(product.id) } > 
            {loading && currentIds[product.id] ? <i className='fa fa-spinner fa-spin'></i> : <span> + Add To Cart  </span> }  
          </button>
        </div>
      </div>
   </>
  )
}
