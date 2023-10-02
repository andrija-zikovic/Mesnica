import React from 'react';
import './Hero.css'
import myImage from '../img/pexels-geraud-pfeiffer-6607314.jpg';

const Hero = () => {
    return (
        <section className='hero'>
            <h2 className='hero__h2' loading="lazy">Dobrodošli</h2>
            <figure>
                <img src={myImage} alt='hero.jbg' width="1954" height="644" />
                <figcaption className='offscreen'>
                    Meat on plate
                </figcaption>
            </figure>
        </section>
    )
}

export default Hero