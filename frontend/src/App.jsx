// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateComponent from "./components/PrivateComponent";
import AddProduct from "./components/AddProduct";
import ProductListing from "./components/ProductListing";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <>
      <div className="main-app">
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductListing />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout from App</h1>} />
            <Route path="/profile" element={<h1>Visit Profile</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
