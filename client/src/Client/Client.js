import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Header from "./Header";
import Home from "./Home";
import AboutUs from "./AboutUs";
import OrderForm from "./OrderForm";
import Products from "./Products";
import Footer from "./Footer";
import { useContext } from "react";
import DataClient, { DataClientProvider } from "../context/DataClient";

const Client = () => {
  const { referenceElement, cartItems, setCartItems, deleteItem, clearCart } =
    useContext(DataClient);

  return (
    <div className="client">
      <DataClientProvider>
        <div className="client_top" ref={referenceElement}>
          <Header title={"Bucher shop"} />
          <Nav />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/order"
            element={
              <OrderForm
                cartItems={cartItems}
                setCartItems={setCartItems}
                deleteItem={deleteItem}
                clearCart={clearCart}
              />
            }
          />
        </Routes>
        <Footer />
      </DataClientProvider>
    </div>
  );
};

export default Client;
