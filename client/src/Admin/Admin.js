import React from 'react'
import AdminOrders from './AdminOrders'
import AdminProducts from './AdminProducts'
import AdminStats from './AdminStats'
import "./Admin.css";
import { Link, Outlet, Route, Routes } from 'react-router-dom'

const Admin = () => {

    return (
        <main>
            <nav className='nav'>
                <ul>
                    <li className='link__nav'>
                        <Link to="">Proizvodi</Link>
                    </li>
                    <li className='link__nav'>
                        <Link to="adminorders">Naruđbe</Link>
                    </li>
                    <li className='link__nav'>
                        <Link to="adminstats">Statistika</Link>
                    </li>
                    <li className='link__nav'>
                        <Link to="">Log out</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<AdminProducts />} />
                <Route path='/adminorders' element={<AdminOrders />} />
                <Route path='/adminstats' element={<AdminStats />} />
            </Routes>
            <Outlet />
        </main>
    )
}

export default Admin