import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import Contact from "../Components/Contact";
import Testmonials from "../Components/UI/Testmonials";
import Project from "../Components/UI/Project";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <div className="pt-4 relative ">
      <div className="container mx-auto">
        <div className="flex gap-2 text-[15px] sm:text-lg font-medium tracking-wide mb-3">
          <Link to={"/"} className="text-indigo-600 flex gap-2 items-center">
            <Home size={20} />
            Home
          </Link>
          <span className="pointer-events-none text-gray-400">/</span>
          <span className="text-gray-950">About</span>
        </div>
        <div className="landing flex flex-col lg:flex-row items-center justify-between">
          <div className="text w-[100%] lg:w-[50%]">
            <h2 className="text-gray-800 font-bold text-3xl mb-3">Our Story</h2>
            <p className="text-gray-400 capitalize leading-[1.7] mb-3">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p className="text-gray-400 capitalize leading-[1.7] mb-3">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="image flex-1 w-[100%]">
            <img src="/about.svg" alt="" />
          </div>
        </div>
        <Project />
        <Testmonials />
      </div>
      <Contact />
    </div>
  );
};

export default About;
