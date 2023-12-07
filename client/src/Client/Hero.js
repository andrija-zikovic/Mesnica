import React from 'react';
import './Hero.css'
import myImage from '../img/pexels-geraud-pfeiffer-6607314.jpg';
import pig from '../img/9c590853903501.59458ff923562.gif';

const Hero = () => {
    return (
        <section className='hero'>
            <h2 className='hero__h2' loading="lazy">Dobrodošli</h2>
            <figure>
                <img className="mainHero" src={myImage} alt='hero.jbg' width="1954" height="644" />
                <img className="pig" src={pig} alt='pig.gif' width="442" height="442" />
                <figcaption className='offscreen'>
                    Meat on plate
                </figcaption>
            </figure>
        </section>
    )
}

export default Hero