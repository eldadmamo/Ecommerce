import React, {useEffect} from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { get_category } from "./store/reducers/homeReducer";
import { useDispatch } from 'react-redux';
import CategoryShop from "./pages/CategoryShop";
import SearchProduct from "./pages/SearchProduct";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/protectUser";
import Index from "./components/dashboard";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";



const App = () => {

  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(get_category())
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shops" element={<Shops/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/card" element={<Card/>} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/products?" element={<CategoryShop/>} />
        <Route path="/products/search?" element={<SearchProduct/>} />
        <Route path="/product/details/:slug" element={<Details/>} />


        <Route path="/dashboard" element={<ProtectUser/>}>
        <Route path="" element={<Dashboard/>}>
        <Route path="" element={<Index/>} />
        <Route path="my-orders" element={<Orders/>} />
        <Route path="change-password" element={<ChangePassword/>} />
        <Route path="my-whishlist" element={<Wishlist/>} />

        </Route>
        </Route>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
