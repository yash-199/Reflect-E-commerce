import React, { useEffect } from 'react'
import Navbar from './components/Navbar';
import Home from './page/Home';
import { Route, Routes } from 'react-router-dom';
import ProductListing from './page/ProductListing';
import ProductDetails from './page/ProductDetails';
import Checkout from './page/Checkout';
import Login from './page/Login';
import CategoryProduct from './page/CategoryProduct';
import WishlistProduct from './page/WishlistProduct';
import PlaceOrder from './page/PlaceOrder';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/productlist' element={<ProductListing/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path="/category/:categoryName" element={<CategoryProduct />} />
        <Route path='/wishlist' element={<WishlistProduct/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
  )
}

export default App