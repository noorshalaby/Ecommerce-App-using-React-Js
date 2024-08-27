import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import NotFound from './../NotFound/NotFound';
import { CirclesWithBar } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  let filteredProducts=[];
  
  
  function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  const{data,isError,isLoading,isSuccess}=useQuery({
    queryKey:['allProducts'],
    queryFn:getAllProducts
  })
  if(isError){
    return(
      <NotFound/>
    ) 
  }
  if(isLoading){
    return (
      <div className="flex bars justify-center bg-transparent"> <CirclesWithBar width={120}  height={120}/> </div>
    )
  }
  if(isSuccess){
    filteredProducts=data.data.data.filter(product=>product.title.toLowerCase().includes(searchQuery.toLowerCase()));
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
    
    {filteredProducts.map(product=> <>
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
          </div>
          </div>
          </Link>
          <button className='btn my-3 p-3 rounded-lg font-semibold' onClick={() =>  addCart(product.id) } > 
            {isLoading && currentIds[product.id] ? <i className='fa fa-spinner fa-spin'></i> : <span> + Add To Cart  </span> }  
          </button>
        </div>
      </div>
    </>
    )}
    
  </div>
    </>
  )
}
}

