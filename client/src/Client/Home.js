import Hero from "./Hero";
import ProductsList from "./ProductsList";
import About from "./About";
import "./Home.css";
import { useContext } from "react";
import DataClient from "../context/DataClient";

const Home = () => {
  const { loaded } = useContext(DataClient);

  return (
    <main className="home">
      <Hero />
      {loaded && <h2 className="prducts-list__h2">TOP SELLERS</h2>}
      <ProductsList host={"home"} meatType={""} />
      <About />
    </main>
  );
};

export default Home;
