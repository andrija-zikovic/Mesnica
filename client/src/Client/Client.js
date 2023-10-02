import React from 'react'
import { Routes, Route } from "react-router-dom";
import Nav from './Nav'
import Header from './Header';
import Home from './Home';
import AboutUs from './AboutUs';
import OrderForm from './orderForm';
import Products from './Products';
import { useState } from 'react';

const Client = () => {
    const [cartItems, setCartItems] = useState([]);
    const deleteItem = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const calculateQuantity = (newAmount, selectedUnit) => {
        if (selectedUnit === "kg") {
            return newAmount;
        } else {
            return newAmount / 100;
        }
    };

    const handleAmountChange = (operation, id, title, price, selectedUnit, amount, setAmount) => {
        const incrementValue = selectedUnit === 'kg' ? 1 : 10;
        const newAmount = operation === 'increment' ? amount + incrementValue : amount - incrementValue;

        if (newAmount >= 1) {
            setAmount(newAmount);

            // Create an item object
            const item = {
                "id": id,
                "description": title,
                "price": price,
                "tax-rate": 5,
                "quantity": calculateQuantity(newAmount, selectedUnit),
                "unit": selectedUnit,
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

    return (
        <div>
            <Nav cartItems={cartItems} setCartItems={setCartItems} deleteItem={deleteItem} clearCart={clearCart} />
            <Header title={'Mesnica'} />
            <Routes>
                <Route path='/' element={<Home handleAmountChange={handleAmountChange} />} />
                <Route path='/products' element={<Products handleAmountChange={handleAmountChange} />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/order' element={<OrderForm cartItems={cartItems} setCartItems={setCartItems} deleteItem={deleteItem} clearCart={clearCart} />} />
            </Routes>
        </div>
    )
}

export default Client