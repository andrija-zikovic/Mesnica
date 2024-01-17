import React, { useState } from "react";
import SideNav from "./SideNav";
import ProductsList from "./ProductsList";
import "./Products.css";

const Products = () => {
  const [meatType, setMeatType] = useState("");
  return (
    <main className="products">
      <SideNav setMeatType={setMeatType} />
      <ProductsList meatType={meatType} host={""} />
    </main>
  );
};

export default Products;
