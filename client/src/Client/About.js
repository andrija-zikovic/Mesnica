import React from "react";
import "./About.css";
import AboutArticle from "./AboutArticle";
import img from "../img/shop.png";
import img2 from "../img/shop2.png";
import img3 from "../img/shop3.png";

const About = () => {
  const content = [
    {
      id: 1,
      title: "A Hundred Years of Tradition!",
      text: "Since 1923!",
      backgroundImg: `url(${img})`,
      title2: "Tradition!",
      text2:
        "Our family business has been around for almost a hundred years! We are proud to say that we have been serving our customers with the best meat in town since 1923! We are looking forward to serving you for another hundred years!",
    },
    {
      id: 2,
      title: "All Kinds of Meat!",
      text: "Our offer includes a variety of meat, from beef to pork and chicken!",
      backgroundImg: `url(${img3})`,
      title2: "Variety!",
      text2:
        "We offer a variety of meat, from beef to pork and chicken! We are sure that you will find something for yourself! Our meat is always fresh and of the highest quality, from local farmers! Great taste guaranteed!",
    },
    {
      id: 3,
      title: "Visit Us!",
      text: "Join us with your family and friends and enjoy the best meat in town!",
      backgroundImg: `url(${img2})`,
      title2: "We are waiting for you!",
      text2:
        "We are waiting for you! Join us with your family and friends and enjoy the best meat in town! We will provide you with the best service and the best meat!  We are open every day from 8 am to 8 pm!",
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
            title2={item.title2}
            text2={item.text2}
            key={item.id}
            index={item.id}
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
