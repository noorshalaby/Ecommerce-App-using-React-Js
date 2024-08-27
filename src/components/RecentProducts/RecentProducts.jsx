import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import ProductItem from '../ProductItem/ProductItem'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { CirclesWithBar } from 'react-loader-spinner'
import { CartContext } from '../../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../../Context/WishlistContext'

export default function RecentProducts() {
  const [searchQuery, setSearchQuery] = useState('');

  let filteredProducts=[];

  let {addProductToCart} = useContext(CartContext)
  
  let [loading,setLoading] = useState(false) 

  let [currentIds,setCurrentIds] = useState([]) 

  let {addWishlist} =useContext(WishlistContext)

  function getProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

 let {isLoading,data,isSuccess} =  useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
    // staleTime:3000,
    // refetchInterval:5000,
    // retry:4,
    // retryDelay:4000
  })

  async function addToCartItem(id){
    setLoading(true)
    let x = [...currentIds];
    x.length = 0;
    setCurrentIds(x)
    setTimeout(()=>{
      currentIds[id] = true;
      setCurrentIds(currentIds)
    },10)

    // console.log(currentIds,"current ids");
    
   let data = await addProductToCart(id);
   console.log(data);
   if(data.data.status == 'success'){
    toast.success(data.data.message,{
      className:"text-xl font-bold text-center w-full",duration:2000}
    )
  }else{
    toast.error(data.data.message)
  }
   setLoading(false)
  }

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


  if(isLoading){
    return  <div className="flex bars justify-center bg-transparent"> <CirclesWithBar width={120}  height={120}/> </div> 
  }
 
  if(isSuccess){
    filteredProducts=data.data.data.filter(p=>p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    function handleSearchChange(e){
      setSearchQuery(e.target.value);
    }
  return (
    <>
    <div className="row">
    <form className="w-11/12 mx-auto my-12">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input value={searchQuery} onChange={handleSearchChange} type="search" id="default-search" className="  block w-full product-4 ps-10 text-sm text-gray-900 border focus:border-transparent border-transparent border-gray-300 rounded-lg bg-gray-50" placeholder="Search ..." required />
    <button type="submit" className="text-white absolute end-0.5 bottom-0.5 bg-main   font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
  </div>
</form>
    {filteredProducts.map( (product)=> <ProductItem product={product} loading ={loading} currentIds={currentIds} addWish={addWishlistItem} addCart={addToCartItem} key={product.id} />)}
  </div>
  </>
  )
}
}
