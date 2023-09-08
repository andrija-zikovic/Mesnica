import React from 'react'
import './Header.css'

const Header = ({ title }) => {
    return (
        <header className='header'>
            <h1 className='header__h1'>{title}</h1>
            <p>SINCE 1923.</p>
        </header>
    )
}

export default Header