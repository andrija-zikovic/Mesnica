import React from 'react'

const SideNav = () => {
    return (
        <section className='sideNav'>
            <h3>Proizvodi</h3>
            <ul className='sideNav__ul'>
                <li className='sideNav__li'>
                    <p className='sideNav__p'>Piletina</p>
                </li>
                <li className='sideNav__li'>
                    <p className='sideNav__p'>Svinjetina</p>
                </li>
                <li className='sideNav__li'>
                    <p className='sideNav__p'>Junetina</p>
                </li>
                <li className='sideNav__li'>
                    <p className='sideNav__p'>Suhomesnato</p>
                </li>
                <li className='sideNav__li'>
                    <p className='sideNav__p'>Mljeveno</p>
                </li>
                <li className='sideNav__li'>
                    <p className='sideNav__p'>Ostalo</p>
                </li>
            </ul>
        </section>
    )
}

export default SideNav