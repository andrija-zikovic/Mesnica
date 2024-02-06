import React from "react";
import ProductsList from "./ProductsList";
import About from "./About";
import "./Home.css";

const Home = () => {
  return (
    <main className="home">
      <h2 className="prducts-list__h2">TOP SELLERS</h2>
      <ProductsList meatType={""} host={"home"} />
      <About />
    </main>
  );
};

export default Home;
