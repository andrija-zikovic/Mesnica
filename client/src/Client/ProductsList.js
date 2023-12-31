import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";

const ProductList = ({ handleAmountChange, meatType, host, setLoaded }) => {
  const [noProductsCheck, setNoProductsCheck] = useState(false);
  const [products, setProducts] = useState([]);

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
  }, [meatType]);

  if (noProductsCheck) {
    return <h2 className="noProducts">Nema proizvoda!</h2>;
  } else {
    if (host === "home") {
      setLoaded(true);
    }
    return (
      <section className={`${host === "home" ? "homeList" : "products-list"}`}>
        {products.length < 1 ? (
          <div className="loading">
            <svg
              width="100"
              height="80"
              fill="#e33535cc"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style>
                {`
                .spinner_DupU {
                    animation: spinner_sM3D 1.2s infinite;
                }
                .spinner_GWtZ { animation-delay: .1s; }
                .spinner_dwN6 { animation-delay: .2s; }
                .spinner_46QP { animation-delay: .3s; }
                .spinner_PD82 { animation-delay: .4s; }
                .spinner_eUgh { animation-delay: .5s; }
                .spinner_eUaP { animation-delay: .6s; }
                .spinner_j38H { animation-delay: .7s; }
                .spinner_tVmX { animation-delay: .8s; }
                .spinner_DQhX { animation-delay: .9s; }
                .spinner_GIL4 { animation-delay: 1s; }
                .spinner_n0Yb { animation-delay: 1.1s; }
                
                @keyframes spinner_sM3D {
                    0%, 50% { animation-timing-function: cubic-bezier(0, 1, 0, 1); r: 0; }
                    10% { animation-timing-function: cubic-bezier(.53, 0, .61, .73); r: 2px; }
                }
                `}
              </style>
              <circle className="spinner_DupU" cx="12" cy="3" r="0" />
              <circle
                class="spinner_DupU spinner_GWtZ"
                cx="16.50"
                cy="4.21"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_n0Yb"
                cx="7.50"
                cy="4.21"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_dwN6"
                cx="19.79"
                cy="7.50"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_GIL4"
                cx="4.21"
                cy="7.50"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_46QP"
                cx="21.00"
                cy="12.00"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_DQhX"
                cx="3.00"
                cy="12.00"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_PD82"
                cx="19.79"
                cy="16.50"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_tVmX"
                cx="4.21"
                cy="16.50"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_eUgh"
                cx="16.50"
                cy="19.79"
                r="0"
              />
              <circle
                class="spinner_DupU spinner_j38H"
                cx="7.50"
                cy="19.79"
                r="0"
              />
              <circle class="spinner_DupU spinner_eUaP" cx="12" cy="21" r="0" />
            </svg>
          </div>
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
                handleAmountChange={handleAmountChange}
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
              handleAmountChange={handleAmountChange}
            />
          ))
        )}
      </section>
    );
  }
};

export default ProductList;
