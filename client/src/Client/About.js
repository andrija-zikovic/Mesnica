import React from "react";
import "./About.css";
import AboutArticle from "./AboutArticle";
import img from "../img/shop.png";

const About = () => {
  const content = [
    {
      title: "A Hundred Years of Tradition!",
      text: "Since 1923!",
      backgroundImg: `url(${img})`,
    },
    {
      title: "All Kinds of Meat!",
      text: "Our offer includes a variety of meat, from beef to pork and chicken!",
      backgroundImg: `url(${img})`,
    },
    {
      title: "Visit Us!",
      text: "Join us with your family and friends and enjoy the best meat in town!",
      backgroundImg: `url(${img})`,
    },
  ];
  return (
    <section className="about">
      <>
        {content.map((item) => (
          <AboutArticle
            title={item.title}
            text={item.text}
            bacgroundImg={item.backgroundImg}
          />
        ))}
      </>
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
