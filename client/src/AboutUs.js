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
            </section>
            <section className='aboutUs__section_o-nama'>
                <h2>O nama</h2>
                <article className='aboutUs__article_o-nama'>
                    <h3>Dobrodošli u Mesnicu sa Stoljetnom Tradicijom</h3>
                    <p>S ponosom vam predstavljamo našu mesnicu koja s ponosom služi svoju zajednicu od 1923. godine. S više od stoljetnom tradicijom u mesarskom poslu, posvećeni smo pružanju vrhunskih mesnih proizvoda i usluga našim vjernim kupcima.</p>
                </article>
                <article className='aboutUs__article_o-nama'>
                    <h3>Povijest</h3>
                    <p>Naša priča započela je prije više od 100 godina, kada je naša osnivačka obitelj prvi put otvorila vrata svoje mesnice. Od tada pa sve do danas, predani smo istoj strasti prema izvrsnosti, kvaliteti i ukusu. Generacije su se naslijedile u poslu, svaka donoseći svoje jedinstvene tehnike i recepte, no jedna stvar ostala je nepromijenjena - naša posvećenost vrhunskoj kvaliteti.</p>
                </article>
                <article className='aboutUs__article_o-nama'>
                    <h3>Kvaliteta i Izvrsnost</h3>
                    <p>Naša mesnica temelji se na visokim standardima kvalitete. Surađujemo s lokalnim dobavljačima i biramo samo najbolje sastojke kako bismo osigurali da naši proizvodi uvijek budu svježi i ukusni. Naši mesari su stručnjaci u svom poslu i pažljivo pripremaju svaku porciju mesa kako bi zadovoljili vaše zahtjeve.</p>
                </article>
                <article className='aboutUs__article_o-nama'>
                    <h3>Asortiman</h3>
                    <p>U našoj mesnici možete pronaći širok asortiman svježeg mesa, delikatesa, kobasica i drugih proizvoda po kojima smo poznati. Od klasičnih rezova mesa do specijalnih marinada i priprema, trudimo se ponuditi vam raznovrsne opcije kako biste zadovoljili svoje potrebe i želje.</p>
                </article>
                <article className='aboutUs__article_o-nama'>
                    <h3>Naša Zajednica</h3>
                    <p>Zahvalni smo našoj zajednici na dugogodišnjoj podršci. Sve ove godine, vaša podrška motivira nas da budemo još bolji i da nastavimo tradiciju kvalitete i pouzdanosti.</p>
                </article>
                <article className='aboutUs__article_o-nama'>
                    <h3>Posjetite Nas</h3>
                    <p>Pozivamo vas da nas posjetite i doživite okus tradicije koji pružamo već više od stoljeća. Naša vrata su vam uvijek otvorena, i radujemo se što ćemo
                        vas poslužiti.
                        <br />
                        Hvala vam što ste dio naše priče i tradicije.
                        <br />
                        Vaša Mesnica</p>
                </article>
            </section>
            <section className='aboutUs__section_lokacija'>
                <h2>LOKACIJA</h2>
                <article className='aboutUs__article_lokacija'>
                    <img src={process.env.PUBLIC_URL + 'img/libero-pula897x487.jpg'} alt='mesnica' width='600' height='400' />
                    <address>
                        Šijanska cesta 5 <br />
                        52100 Pula
                    </address>
                </article>
            </section>
            <section className='aboutUs__section_contact'>
                <article className='aboutUs__article_contact'>
                    <h2 style={{ textAlign: 'center' }}>Our Contact Form</h2>
                    <form action="https://httpbin.org/get" method="get" className="contact__form">
                        <fieldset className="contact__fieldset">
                            <legend className="offscreen">Send Us A Message</legend>
                            <p className="contact__p">
                                <label className="contact__lable" htmlFor="name">Name:</label>
                                <input className="contact__input" type="text" name="name" id="name" placeholder="your name"
                                    required />
                            </p>
                            <p className="contact__p">
                                <label className="contact__lable" htmlFor="email">Email:</label>
                                <input className="contact__input" type="email" name="email" id="email" placeholder="your email"
                                    required />
                            </p>
                            <p className="contact__p">
                                <label className="contact__lable" htmlFor="message">Your Message:</label>
                                <br />
                                <textarea className="contact__textarea" name="message" id="message" cols="30" rows="10"
                                    placeholder="Type your message here"></textarea>
                            </p>
                        </fieldset>
                        <div>
                            <button className="contact__button" type="submit">Send</button>
                            <button className="contact__button" type="reset">Reset</button>
                        </div>
                    </form>
                </article>
            </section>
        </main>
    )
}

export default AboutUs