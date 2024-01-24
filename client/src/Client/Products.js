import { forwardRef, useState, useContext } from "react";
import SideNav from "./SideNav";
import ProductsList from "./ProductsList";
import "./Products.css";
import DataClient from "../context/DataClient";

const Products = forwardRef(() => {
  const { productsElement } = useContext(DataClient);
  const [meatType, setMeatType] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <main className="products" ref={productsElement}>
      <SideNav
        setMeatType={setMeatType}
        showSideNav={showSideNav}
        setShowSideNav={setShowSideNav}
      />
      <ProductsList meatType={meatType} host={""} />
    </main>
  );
});

export default Products;
