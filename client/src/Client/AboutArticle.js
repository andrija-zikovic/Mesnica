import React from "react";

const AboutArticle = ({ title, text, bacgroundImg }) => {
  return (
    <article
      className="about_article"
      style={{ backgroundImage: bacgroundImg, backgroundSize: "cover" }}
    >
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
};

export default AboutArticle;
