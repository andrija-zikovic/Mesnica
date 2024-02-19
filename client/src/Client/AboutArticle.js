import React from "react";

const AboutArticle = ({ title, text, bacgroundImg, title2, text2, index }) => {
  return (
    <>
      <article
        className="about_article"
        style={{ backgroundImage: bacgroundImg, backgroundSize: "cover" }}
        loading="lazy"
        id={"about_article" + index}
      >
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
      <article className="about_article2" id={"about_article2" + index}>
        <h2>{title2}</h2>
        <p>{text2}</p>
      </article>
    </>
  );
};

export default AboutArticle;
