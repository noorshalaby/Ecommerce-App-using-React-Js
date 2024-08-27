import axios from "axios";
import { createContext } from "react";


const headers = {
    token:window.localStorage.getItem("token")
}



export let WishlistContext= createContext(); 

function addWishlist(productId){
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {productId},
        {headers})
        .then(res => res)
        .catch(err => err) 
}

function getWishlist(){
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {headers})
        .then(res => res.data)
        .catch(err =>  err.reponse.data)
}

function deleteWishlist(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {headers})
    .then(res => res.data)
    .catch(err => err.reponse.data)
}


                                  


export default function WishlistContextProvider({children}){

    return <WishlistContext.Provider value={{addWishlist,getWishlist,deleteWishlist}}>
        {children}
    </WishlistContext.Provider>
}


