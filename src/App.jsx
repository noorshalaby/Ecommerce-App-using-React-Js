import './App.css'
import Home from './components/Home/Home';
import About from './components/About/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Wishlist from './components/Wishlist/Wishlist';
import ProtectdRoutes from './components/ProtectdRoutes/ProtectdRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CounterContextProvider from '../Context/CounterContext';
import UserTokenContextProvider from '../Context/UserTokenContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from '../Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Forget from './components/Forget/Forget';
import ResetCode from './components/ResetCode/ResetCode';
import NewPassword from './components/NewPassword/NewPassword';
import RecentProducts from './components/RecentProducts/RecentProducts';
import WishlistContextProvider from '../Context/WishlistContext';
import Payment from './components/Payment/Payment';


let query = new QueryClient()

ReactQueryDevtools

function App() {

const routes = createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>},
    {path:"forget",element:<Forget/>},
    {path:"reset",element:<ResetCode/>},
    {path:"newpassword",element:<NewPassword/>},
    {path:"wishlist",element:<ProtectdRoutes> <Wishlist/> </ProtectdRoutes>},
    {path:"products",element: <ProtectdRoutes> <RecentProducts/></ProtectdRoutes>},
    {path:"home",element: <ProtectdRoutes> <Home/> </ProtectdRoutes>},
    {path:"cart",element:<ProtectdRoutes> <Cart/> </ProtectdRoutes> },
    {path:"about",element:<ProtectdRoutes> <About/> </ProtectdRoutes> },
    {path:"categories",element:<ProtectdRoutes> <Categories/> </ProtectdRoutes>},
    {path:"productdetails/:id",element:<ProtectdRoutes> <ProductDetails/> </ProtectdRoutes> },
    {path:"productdetails/:id/:categoryId",element:<ProtectdRoutes> <ProductDetails/> </ProtectdRoutes> },
    {path:"brands",element: <ProtectdRoutes> <Brands/> </ProtectdRoutes> },
    {path:"payment",element: <ProtectdRoutes> <Payment/> </ProtectdRoutes> },
    {path:"*",element:<NotFound/> }
  ]}
])

  return (
  <>
    <QueryClientProvider client={query}>
    <UserTokenContextProvider> 
      <CounterContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
         <RouterProvider router={routes}></RouterProvider>
         </WishlistContextProvider>
      </CartContextProvider>
      <Toaster />
         <ReactQueryDevtools></ReactQueryDevtools>
       </CounterContextProvider> 
  </UserTokenContextProvider>
    </QueryClientProvider>
 
  </>
  )
}

export default App
