import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Header from "./Header";
import Home from "./Home";
import AboutUs from "./AboutUs";
import OrderForm from "./OrderForm";
import Products from "./Products";
import Footer from "./Footer";
import { useEffect, useState, useRef } from "react";

const Client = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "650ab10d30663028f708db34",
      description: "Svinjska lopatica",
      price: 4.19,
      "tax-rate": 5,
      quantity: 0.7,
      unit: "dag",
    },
    {
      id: "650ab19d30663028f708db36",
      description: "Čevapčići",
      price: 7.69,
      "tax-rate": 5,
      quantity: 1.2,
      unit: "kg",
    },
  ]);

  const deleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateQuantity = (newAmount, newUnite) => {
    return newAmount / 100;
  };

  const handleAmountChange = (
    operation,
    id,
    title,
    price,
    selectedUnit,
    amount,
    setAmount
  ) => {
    const incrementValue = selectedUnit === "plusOne" ? 1 : 10;
    const newAmount =
      operation === "increment"
        ? amount + incrementValue
        : amount - incrementValue;
    const newUnite = "kg";

    if (newAmount >= 1) {
      setAmount(newAmount);

      // Create an item object
      const item = {
        id: id,
        description: title,
        price: price,
        "tax-rate": 5,
        quantity: calculateQuantity(newAmount, newUnite),
        unit: newUnite,
      };

      if (cartItems.length === 0) {
        setCartItems([item]);
      } else {
        // If the cart is not empty, check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(
          (cartItem) => cartItem.id === id
        );

        if (existingItemIndex !== -1) {
          // If the item is in the cart, update its quantity
          const updatedCartItems = [...cartItems];
          updatedCartItems[existingItemIndex] = item;
          setCartItems(updatedCartItems);
        } else {
          // If not in the cart, add it
          setCartItems([...cartItems, item]);
        }
      }
    } else {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== id
      );
      setCartItems(updatedCartItems);
      setAmount(0);
    }
  };

  const referenceElement = useRef(null);
  const targetElement = useRef(null);
  const [bucketVisibleCheck, setBucketVisibleCheck] = useState(false);

  useEffect(() => {
    const reference = referenceElement.current;
    const target = targetElement.current;

    if (reference && target) {
      const updateTop = () => {
        const height = reference.offsetHeight;
        target.style.top = `${height}px`;
      };

      // Initialize with the current height
      updateTop();

      // Create a resize observer to observe reference element
      const resizeObserver = new ResizeObserver(() => {
        updateTop();
      });

      resizeObserver.observe(reference);

      // Cleanup function
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [bucketVisibleCheck]);

  return (
    <div className="client">
      <div className="client_top" ref={referenceElement}>
        <Header title={"Mesnica"} />
        <Nav
          cartItems={cartItems}
          setCartItems={setCartItems}
          deleteItem={deleteItem}
          clearCart={clearCart}
          setBucketVisibleCheck={setBucketVisibleCheck}
          ref={targetElement}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home handleAmountChange={handleAmountChange} />}
        />
        <Route
          path="/products"
          element={<Products handleAmountChange={handleAmountChange} />}
        />
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
    </div>
  );
};

export default Client;
