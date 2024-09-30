import { useEffect } from "react";
import Contact from "../Components/Contact";
import Arrival from "../Components/UI/Arrival";
import CategoryComponent from "../Components/UI/Category/Index";
import HeroSection from "../Components/UI/Hero/Index";
import Explore from "../Components/UI/Product/Explore";
import ProductComponent from "../Components/UI/Product/Index";
import Timer from "../Components/UI/Timer/Index";
import News from "../Components/UI/News";
import Branding from "../Components/UI/Branding";

const Home = () => {
  useEffect(() => {
    document.title = "Ecommerce App";
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryComponent />
      <ProductComponent />
      <Arrival />
      <div className="relative z-10 bg-[#f1f5f9] custom">
        <div className="tringle-right"></div>
        <Explore url="/products?populate=*" showmainTitle={true} />
        <Timer />
        <Branding />
        <News />
        <Contact />
      </div>
    </>
  );
};

export default Home;
