import React, { useState, useEffect, useContext } from "react";
import DataClient from "../context/DataClient";
import "./ProductCard.css";

const ProductCard = ({ id, src, title, price, description, meatType }) => {
  // Initialize state for input value and selected unit
  const [amount, setAmount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const { handleAmountChange } = useContext(DataClient);

  useEffect(() => {
    const adjustFontSize = () => {
      setFontSizeToFit(`title${id}`);
    };

    adjustFontSize();

    window.addEventListener("resize", adjustFontSize);

    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  }, [id, imageLoaded]);

  const [totalProductPrice, setTotalProductPrice] = useState(0);

  useEffect(() => {
    const updateTotalProductPrice = () => {
      setTotalProductPrice((price * amount) / 100);
    };

    updateTotalProductPrice();
  }, [amount, price]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  function setFontSizeToFit(elementId) {
    const element = document.querySelector(`#${elementId}`);
    if (!element) return;

    const parentElement = element.parentElement;
    const parentHeight = parentElement.offsetHeight;
    let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    while (element.scrollHeight > parentHeight && fontSize > 10) {
      fontSize -= 1;
      if (fontSize > 20) {
        fontSize = 20;
      }
      element.style.fontSize = `${fontSize - 1}px`;
    }
  }

  return (
    <article className={`product-card ${imageLoaded ? "loaded" : ""}`} id={id}>
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
          <p>{description}</p>
        </div>
      )}
      <form id={id} onSubmit={(e) => e.preventDefault()}>
        <div className="product-card__showAbout">
          <button onClick={() => setShowAbout(true)}>
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
        <div className="title__container">
          <p className="product-card__title" id={`title${id}`}>
            {title}
          </p>
        </div>
        <img src={src} alt={title} onLoad={handleImageLoad} />
        {imageLoaded && (
          <>
            <p className="product-card__price">
              <span className="product-card__price_highlight">
                {totalProductPrice ? totalProductPrice.toFixed(2) : price} €
              </span>
              {meatType.includes("piece")
                ? " / piece"
                : totalProductPrice
                ? ` / ${(amount / 100).toFixed(2)}kg`
                : " / kg"}
            </p>
            <div className="productCard_plusMinus">
              <button
                onClick={() =>
                  handleAmountChange(
                    "decrement",
                    id,
                    title,
                    price,
                    amount,
                    setAmount,
                    meatType
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
                value={
                  meatType.includes("piece")
                    ? amount / 100
                    : (amount / 100).toFixed(2)
                }
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
                    amount,
                    setAmount,
                    meatType
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
