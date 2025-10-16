import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Logos from "./Logos";
import Products from "../components/Product/Products";
import Footer from "../components/Footer/Footer";
import Checkout from "./Checkout";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Logos />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
