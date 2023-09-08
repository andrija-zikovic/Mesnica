import './App.css';
import Nav from './Nav'
import Header from './Header';
import Home from './Home';
import AboutUs from './AboutUs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Products';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAmountChange = (operation, id, title, price, selectedUnit, amount, setAmount) => {
    const incrementValue = selectedUnit === 'kg' ? 1 : 10;
    const newAmount = operation === 'increment' ? amount + incrementValue : amount - incrementValue;

    if (newAmount >= 1) {
      setAmount(newAmount);

      // Create an item object
      const item = {
        id: id,
        title: title,
        price: price,
        amount: newAmount,
        unit: selectedUnit,
      };

      if (cartItems.length === 0) {
        setCartItems([item]);
      } else {
        // If the cart is not empty, check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === id);

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
    }
  };

  console.log('cartItems:', cartItems);

  return (
    <BrowserRouter>
      <Nav />
      <Header title={'Mesnica'} cartItems={cartItems} setCartItems={setCartItems}/>
      <Routes>
        <Route index element={<Home handleAmountChange={handleAmountChange} />} />
        <Route path='proizvodi' element={<Products handleAmountChange={handleAmountChange} />} />
        <Route path='o_nama' element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
