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
    const [token, setToken] = useState('');
    const dropdownRef = useRef(null);
    const [message, setMessage] = useState("");

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
                const { accessToken } = await response.json();
                setToken(accessToken);
                setIsLoggedIn(true); // Set isLoggedIn to true if the response is positive
            } else {
                // Handle authentication failure, show error message, etc.
                const errorResponse = await response.json();
                setMessage(errorResponse.error);
                console.error('Authentication failed');
            }
          } catch (error) {
            // Handle network errors, server errors, etc.
            console.error('Error occurred during login:', error);
          }
    };

    const logOut = async () => {
        try {
            const url = process.env.REACT_APP_LOGOUT;
            const response = await fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (response.ok) {
                setIsLoggedIn(false);
                console.log('Logout successful');
            } else {
                console.error('Logout failed');
            }
          } catch (error) {
            console.error('Error during logout:', error);
          }
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

   /*  const refreshTokens = async () => {
        try {
          const refreshResponse = await fetch(process.env.REACT_APP_REFRESH, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (refreshResponse.ok) {
            setIsLoggedIn(true);
            console.log('Tokens refreshed successfully');
          } else {
            // Handle refresh failure
            setIsLoggedIn(false);
            console.error('Token refresh failed');
          }
        } catch (error) {
          // Handle network errors, server errors, etc.
          console.error('Error occurred during token refresh:', error);
        }
      }; */

    
    return (
        <main className='adminMain'>
      {!isLoggedIn ? (
        <section className='adminLogInSection'>
            <h3 style={{marginBottom: 0, color: 'var(--LINK-ACTIVE)'}}>Log in:</h3>
            <AdminLogIn handleLogin={handleLogin} />
            {message && (
              <p style={{ color: 'red' }}>{message}</p>
            )}
            <p>username: admin | password: admin</p>
        </section>
      ) : (
        <>
            <div className='nav__admin'>
                <div className='nav__ul'>
                    <div className='link__nav__dropdown' onClick={toggleDropdown} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} ref={dropdownRef}>
                        Proizvodi
                        {isDropdownOpen && (
                            <div className='dropdown'>
                                <div>
                                    <Link to='/admin'>Lista</Link>
                                </div>
                                <div>
                                    <Link to='addProduct'>Dodaj</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='link__nav'>
                        <Link to="adminorders">Naruđbe</Link>
                    </div>
                    <div className='link__nav'>
                        <Link to="adminstats">Statistika</Link>
                    </div>
                    <div className='link__nav_logOut' onClick={logOut}>
                        Log out
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<AdminProducts token={token}/>} />
                <Route path='/adminorders' element={<AdminOrders token={token}/>} />
                <Route path='/adminstats' element={<AdminStats token={token}/>} />
                <Route path='/addproduct' element={<AddProducts token={token}/>} />
            </Routes>
            <Outlet />
        </>
      )}
    </main>
    )
}

export default Admin