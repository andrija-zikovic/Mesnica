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

    const handleLogin = async (username, password) => {
        try {
            const url = process.env.REACT_APP_LOGIN;
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
        
            if (response.ok) {
              setIsLoggedIn(true); // Set isLoggedIn to true if the response is positive
            } else {
              // Handle authentication failure, show error message, etc.
              console.error('Authentication failed');
            }
          } catch (error) {
            // Handle network errors, server errors, etc.
            console.error('Error occurred during login:', error);
          }
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
        <section className='adminLogInSection'>
            <h3 style={{marginBottom: 0}}>Log in:</h3>
            <AdminLogIn handleLogin={handleLogin} />
            <p>username: admin | password: admin</p>
        </section>
      ) : (
        <>
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
        </>
      )}
    </main>
    )
}

export default Admin