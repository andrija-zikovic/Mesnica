import React from 'react'
import './Header.css'
import Bucket from './Bucket'

const Header = ({ title, cartItems, setCartItems }) => {
    return (
        <header className='header'>
            <h1 className='header__h1'>{title}</h1>
            <p>SINCE 1923.</p>
            <Bucket cartItems={cartItems} setCartItems={setCartItems}/>
        </header>
    )
}

export default Header