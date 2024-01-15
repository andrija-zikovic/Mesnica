import React, { useState } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_FORM_SEND;
    // Send a request to the API with the form data
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          e.target.reset();
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="aboutUs">
      <section className="aboutUs__section_o-nama">
        <h2 style={{ whiteSpace: "nowrap" }}>About Us</h2>
        <article className="aboutUs__article_o-nama">
          <h3>Welcome to the Centuries-Old Butcher Shop</h3>
          <p>
            We proudly present our butcher shop, which has been proudly serving
            its community since 1923. With more than a century-long tradition in
            the butchery business, we are dedicated to providing top-quality
            meat products and services to our loyal customers.
          </p>
        </article>
        <article className="aboutUs__article_o-nama">
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide you with the best meat and meat products
            in town. We have proudly served our community for over 100 years,
            and we look forward to continuing the tradition of quality and
            reliability.
          </p>
        </article>
        <article className="aboutUs__article_o-nama">
          <h3>History</h3>
          <p>
            Our story began more than 100 years ago, when our founding family
            first opened the doors of their butcher shop. Since then, we have
            been committed to the same passion for excellence, quality, and
            taste. Generations have succeeded in the business, each bringing
            their unique techniques and recipes, but one thing has remained
            unchanged - our commitment to top quality.
          </p>
        </article>
        <article className="aboutUs__article_o-nama">
          <h3>Quality and Excellence</h3>
          <p>
            Our butcher shop is based on high standards of quality. We
            collaborate with local suppliers and select only the best
            ingredients to ensure that our products are always fresh and tasty.
            Our butchers are experts in their field and carefully prepare each
            cut of meat to meet your demands.
          </p>
        </article>
        <article className="aboutUs__article_o-nama">
          <h3>Assortment</h3>
          <p>
            In our butcher shop, you can find a wide range of fresh meats,
            delicacies, sausages, and other products for which we are known.
            From classic meat cuts to special marinades and preparations, we
            strive to offer you a variety of options to satisfy your needs and
            desires.
          </p>
        </article>
        <article className="aboutUs__article_o-nama">
          <h3>Our Community</h3>
          <p>
            We are grateful to our community for their long-standing support.
            All these years, your support motivates us to be even better and to
            continue the tradition of quality and reliability.
          </p>
        </article>
        <article className="aboutUs__article_o-nama">
          <h3>Our Customers</h3>
          <p>
            Our customers are our greatest asset. Everything we do, we do for
            you. Your satisfaction is our greatest reward, and we look forward
            to continuing to serve you.
          </p>
        </article>
        <article className="aboutUs__article_o-nama">
          <h3>Visit Us</h3>
          <p>
            We invite you to visit us and experience the taste of tradition that
            we have been providing for over a century. Our doors are always open
            to you, and we look forward to serving you.
            <br />
            Thank you for being a part of our story and tradition.
            <br />
            Your Butcher Shop
          </p>
        </article>
      </section>
      <section className="aboutUs__section_lokacija">
        <h2>Location</h2>
        <article className="aboutUs__article_lokacija">
          <img
            src={process.env.PUBLIC_URL + "libero-pula897x487.jpg"}
            alt="mesnica"
            width="600"
            height="400"
          />
          <address>
            <p>Sample Road 5</p>
            <p>52100 Sample city</p>
            <p>Sample state</p>
          </address>
        </article>
      </section>
      <section className="aboutUs__section_contact">
        <article className="aboutUs__article_contact">
          <h2 style={{ textAlign: "center" }}>Contact Us</h2>
          <form method="post" className="contact__form" onSubmit={handleSubmit}>
            <fieldset className="contact__fieldset">
              <legend className="offscreen">Pošaljite poruku</legend>
              <p className="contact__p">
                <label className="contact__lable" htmlFor="name">
                  Name:
                </label>
                <input
                  className="contact__input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name.."
                  onChange={handleInputChange}
                  required
                />
              </p>
              <p className="contact__p">
                <label className="contact__lable" htmlFor="email">
                  Email:
                </label>
                <input
                  className="contact__input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email.."
                  onChange={handleInputChange}
                  required
                />
              </p>
              <p className="contact__p">
                <label className="contact__lable" htmlFor="message">
                  Message:
                </label>
                <br />
                <textarea
                  className="contact__textarea"
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  placeholder="Write message here..."
                  onChange={handleInputChange}
                ></textarea>
              </p>
            </fieldset>
            <div>
              <button className="contact__button" type="submit">
                Send
              </button>
              <button className="contact__button" type="reset">
                Clear
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
};

export default AboutUs;
