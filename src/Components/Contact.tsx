import { Headset, ShieldCheck, Truck } from "lucide-react";
import MainTitle from "./UI/MainTitle";

const Contact = () => {
  return (
    <div className="contact container mx-auto my-10">
      <MainTitle text="Our Info" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 content">
        <div className="flex flex-col space-y-3 items-center">
          <span className="bg-[#1d1f1f] text-white w-12 h-12 flex items-center justify-center rounded-full relative before:absolute before:top-[-6px] before:left-[50%] before:translate-x-[-50%]  before:w-[60px] before:h-[60px] before:rounded-full before:bg-gray-300 before:-z-10">
            <Truck size={30} />
          </span>
          <div className="text text-center">
            <h2 className="font-bold text-lg text-gray-800">
              FREE AND FAST DELIVERY
            </h2>
            <p className="font-medium text-[15px] text-gray-400">
              Free delivery for all orders over $140
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-3 items-center">
          <span className="bg-[#1d1f1f] text-white w-12 h-12 flex items-center justify-center rounded-full relative before:absolute before:top-[-6px] before:left-[50%] before:translate-x-[-50%] before:-z-10 before:w-[60px] before:h-[60px] before:rounded-full before:bg-gray-300 before-item">
            <Headset />
          </span>
          <div className="text text-center">
            <h2 className="font-bold text-lg text-gray-800">
              24/7 CUSTOMER SERVICE
            </h2>
            <p className="font-medium text-[15px] text-gray-400">
              Friendly 24/7 customer support
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-3 items-center">
          <span className="bg-[#1d1f1f] text-white w-12 h-12 flex items-center justify-center rounded-full relative before:absolute before:top-[-6px] before:left-[50%] before:translate-x-[-50%] before:-z-10 before:w-[60px] before:h-[60px] before:rounded-full before:bg-gray-300 before-item">
            <ShieldCheck />
          </span>
          <div className="text text-center">
            <h2 className="font-bold text-lg text-gray-800">
              MONEY BACK GUARANTEE
            </h2>
            <p className="font-medium text-[15px] text-gray-400">
              We reurn money within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
