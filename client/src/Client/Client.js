import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import DataClient from "../context/DataClient";
import Nav from "./Nav";
import Header from "./Header";
import Home from "./Home";
import AboutUs from "./AboutUs";
import OrderForm from "./OrderForm";
import Products from "./Products";
import Footer from "./Footer";
import Bucket from "./Bucket";

const Client = React.forwardRef(() => {
  const { referenceElement, isBucketVisible } = useContext(DataClient);

  return (
    <div className="client">
      <div className="client_top" ref={referenceElement}>
        <Header title={"Bucher shop"} />
        <Nav />
        {isBucketVisible && <Bucket />}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/order" element={<OrderForm />} />
      </Routes>
      <Footer />
    </div>
  );
});

export default Client;
