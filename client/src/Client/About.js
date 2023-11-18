import React from 'react'
import './About.css'
import Mesnica1987 from '../img/1987_mesnica.jpg';

const About = () => {
  return (
    <section className='about'>
      <article className='about_article'>
        <h2>Stogodisnja tradicija!</h2>
        <img src={Mesnica1987} width='736px' height='486px' alt='1987' className='about_article01_img'/> 
        <h2>Od 1923.!</h2>
      </article>
      <article className='about_article'>
        <h2>Sve vrste mesa!</h2>
        <p>Naša ponuda obuhvaća raznolikost mesa, od svježih odrezaka i ukusnih kobasica do posebnih mesnih pripravaka koje pripremamo s ljubavlju.</p>
      </article>
      <article className='about_article'>
        <h2>Posjetite nas!</h2>
        <p>Zajedno sa svojom obitelji i prijateljima, pridružite nam se u otkrivanju pravih okusa. Budite sigurni da ćemo vas osvojiti našom kvalitetom, uslugom i strašću prema mesu.</p>
      </article>
      <article className='about_location'>
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