import React, { useState, useEffect, useRef } from 'react'
import AdminLogIn from './AdminLogIn'
import AdminOrders from './AdminOrders'
import AdminProducts from './AdminProducts'
import AdminStats from './AdminStats'
import AddProducts from './AddProducts'
import "./Admin.css";
import { Link, Outlet, Route, Routes } from 'react-router-dom'

const Admin = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogin = (username, password) => {
        
    };

    const logOut = () => {
        setIsLoggedIn(false);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <main className='adminMain'>
      {!isLoggedIn ? (
        <AdminLogIn onLogin={handleLogin} />
      ) : (
        <main className='adminMain'>
            <nav className='nav__admin'>
                <ul className='nav__ul'>
                    <li className='link__nav__dropdown' onClick={toggleDropdown} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} ref={dropdownRef}>
                        Proizvodi
                        {isDropdownOpen && (
                            <ul className='dropdown'>
                                <li>
                                    <Link to='/admin'>Lista</Link>
                                </li>
                                <li>
                                    <Link to='addProduct'>Dodaj</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className='link__nav'>
                        <Link to="adminorders">Naruđbe</Link>
                    </li>
                    <li className='link__nav'>
                        <Link to="adminstats">Statistika</Link>
                    </li>
                    <li className='link__nav' onClick={logOut}>
                        Log out
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<AdminProducts />} />
                <Route path='/adminorders' element={<AdminOrders />} />
                <Route path='/adminstats' element={<AdminStats />} />
                <Route path='/addproduct' element={<AddProducts />} />
            </Routes>
            <Outlet />
        </main>
      )}
    </main>
    )
}

export default Admin