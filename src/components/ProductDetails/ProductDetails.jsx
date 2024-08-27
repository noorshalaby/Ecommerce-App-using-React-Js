import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';
import ProductItem from '../ProductItem/ProductItem';
import Slider from 'react-slick';
import { CartContext } from './../../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../../Context/WishlistContext';

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    let [productDetails,setProductDetails] = useState([])
    let [isLoading,setIsLoading] = useState(true)
    let [relatedProducts,setRelatedProducts] = useState([])
    let {id,categoryId} = useParams()

    let {addProductToCart} = useContext(CartContext)

    let {addWishlist} =useContext(WishlistContext)

    useEffect(()=>{
      getProductDetails()
      getRelatedProducts()
    },[id])

 function getProductDetails(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  .then(({data}) => {
    setIsLoading(false)    
    setProductDetails(data.data) 
    if(relatedProducts.length){
      getFilteredData(relatedProducts)
    }
  })
  .catch((err) => console.log(err) )
 }

 function getRelatedProducts(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  .then(({data}) => {
    getFilteredData(data.data)
})
  .catch((err) => console.log(err) ) 
 }


 function getFilteredData(data){
  let res = data.filter(ele => ele.category._id == categoryId && ele.id != id)  
  setRelatedProducts(res)
 }

async function addWishlistItem(id){
  let data = await addWishlist(id)
  console.log(data);
  if(data.data.status == 'success'){
    toast.success(data.data.message,{
      className:"text-xl text-green-600 font-bold text-center w-full",duration:2000
    }
  )
  }else{
    toast.error(data.data.message)
  }
}


async function addToCartItem(id){
 let data =  await addProductToCart(id)
 console.log(data);
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

  <div className="row my-5 items-center">
    
    {isLoading ?  <div className="flex bars justify-center"> <CirclesWithBar width={120}  height={120}/> </div> :
    <>
     <div className="md:w-1/4 ">
     <Slider  {...settings}>
      {productDetails.images.map((src,h) => <img src={src}  key={h}/> )}
      </Slider> 
      </div>
      <div className="md:w-3/4">
        <h2 className='text-4xl text-center py-4'>{productDetails.title}  </h2>
        <p className='font-thin text-gray-400 text-center py-4 mb-5'>{productDetails.description}</p>
        <span className='font-bold ps-2'>{productDetails.category.name}</span>
        <div className=" py-2 flex justify-between">
            <span className='ps-2 my-2'>{productDetails.price} EGP</span>
            <span className='my-2'><i className="fa-solid fa-star rating-color"></i> {productDetails.ratingsAverage} </span>
          </div>
          <div className="flex justify-between">
          <button className='w-96 bg-main my-3 p-3 rounded-lg font-semibold ps-2 text-white' onClick={() => addToCartItem(productDetails.id)}> + Add  to cart</button>
         <button><i className="fa-solid fa-heart h3 text-5xl" onClick={() => addWishlistItem(productDetails.id)}></i></button>
          </div>
      </div>
    </>
    }
  </div>
    
     <h2 className='main-color text-3xl font-bold text-center mb-3'>Related Products</h2>
    <div className="row">
        {relatedProducts.map( (product,a) => <ProductItem product={product} key={a} />)}
    </div>

  </>
  )
}
