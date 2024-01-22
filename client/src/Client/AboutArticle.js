import React from "react";

const AboutArticle = ({ title, text, bacgroundImg, title2, text2 }) => {
  return (
    <>
      <article
        className="about_article"
        style={{ backgroundImage: bacgroundImg, backgroundSize: "cover" }}
      >
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
      <article className="about_article2">
        <h2>{title2}</h2>
        <p>{text2}</p>
      </article>
    </>
  );
};

export default AboutArticle;
