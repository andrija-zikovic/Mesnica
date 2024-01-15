import React, { useState, useEffect } from "react";
import "./ProductCard.css";

const ProductCard = ({ id, src, title, price, handleAmountChange, about }) => {
  // Initialize state for input value and selected unit
  const [selectedUnit, setSelectedUnit] = useState("kg");
  const [amount, setAmount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  function setFontSizeToFit(elementId) {
    const element = document.querySelector(`#${elementId}`);
    if (!element) return;

    const parentElement = element.parentElement;
    const parentHeight = parentElement.offsetHeight;
    let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    while (element.scrollHeight > parentHeight && fontSize > 5) {
      // Minimum font size of 10px
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
      <div className="product-card__showAbout">
        <button onClick={() => setShowAbout(!showAbout)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="10"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </button>
      </div>
      {showAbout && (
        <div className="product-card__about">
          <div className="product-card__showAbout">
            <button onClick={() => setShowAbout(!showAbout)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="10"
                viewBox="0 0 320 512"
              >
                <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
              </svg>
            </button>
          </div>
          <p>{about}</p>
        </div>
      )}
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
