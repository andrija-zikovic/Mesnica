import React, { useState } from "react";
import SideNav from "./SideNav";
import ProductsList from "./ProductsList";
import "./Products.css";

const Products = ({ setLoaded }) => {
  const [meatType, setMeatType] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <main className="products">
      <SideNav
        setMeatType={setMeatType}
        showSideNav={showSideNav}
        setShowSideNav={setShowSideNav}
      />
      <ProductsList meatType={meatType} host={""} />
    </main>
  );
};

export default Products;
