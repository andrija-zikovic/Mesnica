import React, { useEffect, useState, useContext } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import DataClient from "../context/DataClient";
import Loading from "./Loading";

const ProductList = ({ meatType, host }) => {
  const [noProductsCheck, setNoProductsCheck] = useState(false);
  const { products, setProducts } = useContext(DataClient);

  useEffect(() => {
    const fetchData = async () => {
      let success = false;
      while (!success) {
        try {
          const baseUrl = process.env.REACT_APP_PRODUCTS_CALL_API;
          const url = `${baseUrl}/${meatType}`;

          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          if (res.status === 204) {
            setNoProductsCheck(true);
          } else {
            const productsData = await res.json();
            setProducts(productsData);
            setNoProductsCheck(false);
          }

          success = true;
        } catch (error) {
          console.error("Error fetching data:", error);

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    };

    fetchData();
  }, [meatType, setProducts]);

  if (noProductsCheck) {
    return <h2 className="noProducts">No products!</h2>;
  } else {
    return (
      <section className={`${host === "home" ? "homeList" : "products-list"}`}>
        {products.length < 1 ? (
          <Loading className={"loading_client"} />
        ) : host === "home" ? (
          products
            .slice(0, 4)
            .map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                src={product.imgSrc}
                title={product.title}
                price={product.price}
                quantityType={product.quantityType}
                description={product.description}
                meatType={product.meatType}
              />
            ))
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              src={product.imgSrc}
              title={product.title}
              price={product.price}
              quantityType={product.quantityType}
              description={product.description}
              meatType={product.meatType}
            />
          ))
        )}
      </section>
    );
  }
};

export default ProductList;
