import React, { useEffect, useRef } from 'react'
import './About.css'
import Mesnica1987 from '../img/1987_mesnica.jpg';

const About = () => {
  const art1 = useRef(null)
  const art2 = useRef(null)
  const art3 = useRef(null)
  const art4 = useRef(null)

  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.3, // When 50% of the element is in the viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slidein'); // Add .slidein class when in viewport
        }
      });
    }, observerOptions);

    // Observe each of the articles
    if (art1.current) {
      observer.observe(art1.current);
    }
    if (art2.current) {
      observer.observe(art2.current);
    }
    if (art3.current) {
      observer.observe(art3.current);
    }
    if (art4.current) {
      observer.observe(art4.current);
    }

  }, []);

  return (
    <section className='about'>
      <article className='about_article' ref={art1}>
        <h2>Stogodisnja tradicija!</h2>
        <img src={Mesnica1987} width='736px' height='486px' alt='1987' className='about_article01_img'/> 
        <h2>Od 1923.!</h2>
      </article>
      <article className='about_article' ref={art2}>
        <h2>Sve vrste mesa!</h2>
        <p>Naša ponuda obuhvaća raznolikost mesa, od svježih odrezaka i ukusnih kobasica do posebnih mesnih pripravaka koje pripremamo s ljubavlju.</p>
      </article>
      <article className='about_article' ref={art3}>
        <h2>Posjetite nas!</h2>
        <p>Zajedno sa svojom obitelji i prijateljima, pridružite nam se u otkrivanju pravih okusa. Budite sigurni da ćemo vas osvojiti našom kvalitetom, uslugom i strašću prema mesu.</p>
      </article>
      <article className='about_location' ref={art4}>
        <h2>Lokacija</h2>
        <address>
          <p>Šijanska cesta 5</p>
          <p>52100 Pula</p>
          <p>Hrvatska</p>
        </address>
      </article>
    </section>
  )
}

export default About