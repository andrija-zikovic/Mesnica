import React from 'react'
import './Nav.css'

const Nav = () => {
    return (
        <nav className='nav'>
            <ul>
                <li className='link__nav'>
                    <p>Home</p>
                </li>
                <li className='link__nav'>
                    <p>Proizvod</p>
                </li>
                <li className='link__nav'>
                    <p className='nowrap'>O nama</p>
                </li>
                <li>
                    <form>
                        <label></label>
                        <input type='text' placeholder='Proizvod..'></input>
                    </form>
                </li>
            </ul>
        </nav>
    )
}

export default Nav