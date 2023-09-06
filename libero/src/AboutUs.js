import React, { useState, useEffect } from 'react'
import './AboutUs.css'

const AboutUs = () => {
    const images = [
        'img/Svinjska-Lopatica600x400.jpg',
        'img/Svinjska-Lopatica600x400.jpg',
        'img/Svinjska-Lopatica600x400.jpg',
        'img/Svinjska-Lopatica600x400.jpg',
        'img/Svinjska-Lopatica600x400.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <main className='aboutUs'>
            <section className='aboutUs__section'>
                <article className='aboutUs__article-imgs'>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={process.env.PUBLIC_URL + image}
                            alt="img"
                            className={`fade ${index === currentIndex ? 'show' : ''}`}
                        />
                    ))}
                </article>
                <article className='aboutUs__article'>OPIS</article>
                <article className='aboutUs__article'>LOKACIJA</article>
                <article className='aboutUs__article'>CONTACT</article>
                <article className='aboutUs__article'>CONTACT FORM</article>
            </section>

        </main>
    )
}

export default AboutUs