import axios from "axios";
import { createContext, useState } from "react";


const headers = {
    token:window.localStorage.getItem("token")
}



export let CartContext = createContext(); 

export default function CartContextProvider({children}){
  let [cartId,setCartId] = useState(null)

function addProductToCart(productId){
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId},
        {headers})
        .then(res => res  )
        .catch(err => err) 
}

function getCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
        .then(res => {
            setCartId(res.data.data._id);
            return res.data;
        })
        .catch(err => {
            console.error('Error fetching cart:', err.response ? err.response.data : err.message);
            throw err;
        });
}

function deleteProduct(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers})
    .then(res => res.data)
    .catch(err => err.reponse.data)
}

function updateProductCount(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count} ,{headers})
    .then(res => res.data)
    .catch(err => err.reponse.data)
}
                                  
function clearCart(){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers})
        .then(res => res  )
        .catch(err => err) 
}
    
    return <CartContext.Provider value={{addProductToCart,getCart,deleteProduct,updateProductCount,clearCart,cartId}}>
        {children}
    </CartContext.Provider>
}


