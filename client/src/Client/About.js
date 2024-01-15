import React from "react";
import "./About.css";
import Mesnica1987 from "../img/1987_mesnica.jpg";

const About = () => {
  return (
    <section className="about">
      <article className="about_article">
        <h2>A Hundred Years of Tradition!</h2>
        <img
          src={Mesnica1987}
          width="736px"
          height="486px"
          alt="1987"
          className="about_article01_img"
        />
        <h2>Since 1923!</h2>
      </article>
      <article className="about_article">
        <h2>All Kinds of Meat!</h2>
        <p>
          Our offer includes a variety of meats, from fresh cuts and delicious
          sausages to special meat preparations that we make with love.
        </p>
      </article>
      <article className="about_article">
        <h2>Visit Us!</h2>
        <p>
          Join us with your family and friends in discovering the true flavors.
          Be sure that we will win you over with our quality, service, and
          passion for meat.
        </p>
      </article>
      <article className="about_location">
        <h2>Location</h2>
        <address>
          <p>Sample Road 5</p>
          <p>52100 Sampletown</p>
          <p>Samplestate</p>
        </address>
      </article>
    </section>
  );
};

export default About;
