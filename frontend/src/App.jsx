import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shops" element={<Shops/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/card" element={<Card/>} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path="/product/details/:slug" element={<Details/>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
