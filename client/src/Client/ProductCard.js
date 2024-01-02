import React, { useState, useEffect } from "react";
import "./ProductCard.css";

const ProductCard = ({ id, src, title, price, handleAmountChange }) => {
  // Initialize state for input value and selected unit
  const [selectedUnit, setSelectedUnit] = useState("kg");
  const [amount, setAmount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  function setFontSizeToFit(elementId) {
    const element = document.querySelector(`#${elementId}`);
    if (!element) return;

    const parentElement = element.parentElement;
    console.log(parentElement.offsetHeight);
    const parentHeight = parentElement.offsetHeight;
    let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    console.log(fontSize);
    while (element.scrollHeight > parentHeight && fontSize > 5) {
      // Minimum font size of 10px
      console.log(element.scrollHeight);
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
    }
  }

  useEffect(() => {
    const adjustFontSize = () => {
      setFontSizeToFit(`title${id}`);
    };

    adjustFontSize();

    window.addEventListener("resize", adjustFontSize);

    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  }, [id]);

  return (
    <article className={`product-card ${imageLoaded ? "loaded" : ""}`} id={id}>
      <form id={id} onSubmit={(e) => e.preventDefault()}>
        <div className="title__container">
          <p className="product-card__title" id={`title${id}`}>
            {title}
          </p>
        </div>
        <img src={src} alt={title} onLoad={handleImageLoad} />
        {imageLoaded && (
          <>
            <p className="product-card__price">{price} € / kg</p>
            <div className="productCard_unit">
              <input
                type="radio"
                name="plusOne"
                id={id + "-plusOne"}
                checked={selectedUnit === "plusOne"}
                onChange={() => setSelectedUnit("plusOne")}
              />
              <label htmlFor={id + "-plusOne"}>+ 1</label>
              <input
                type="radio"
                name="plusTen"
                id={id + "-plusTen"}
                checked={selectedUnit === "plusTen"}
                onChange={() => setSelectedUnit("plusTen")}
              />
              <label htmlFor={id + "-plusTen"}>+ 10</label>
            </div>
            <div className="productCard_plusMinus">
              <button
                onClick={() =>
                  handleAmountChange(
                    "decrement",
                    id,
                    title,
                    price,
                    selectedUnit,
                    amount,
                    setAmount
                  )
                }
              >
                −
              </button>
              <input
                type="number"
                id={id + "-amount"}
                min={0}
                max={98}
                placeholder="0"
                value={amount}
                readOnly
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <button
                onClick={() =>
                  handleAmountChange(
                    "increment",
                    id,
                    title,
                    price,
                    selectedUnit,
                    amount,
                    setAmount
                  )
                }
              >
                +
              </button>
            </div>
          </>
        )}
      </form>
    </article>
  );
};

export default ProductCard;
