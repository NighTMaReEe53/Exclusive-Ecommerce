import { Facebook, Linkedin, Twitter } from "lucide-react";
import MainTitle from "./MainTitle";

const Testmonials = () => {
  return (
    <div>
      <MainTitle text="Our Team" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="shadow-sm p-3 rounded-md tesmonial  relative">
          <div className="image">
            <img
              src="/testmonials/char1.png"
              className="w-full h-[300px] object-contain"
              alt=""
            />
          </div>
          <div className="text">
            <h2 className="font-bold text-2xl text-gray-800">YouseF AdeL</h2>
            <p className="text-gray-400 capitalize">Frontend Developer</p>
          </div>
          <div className="info absolute top-0 left-0 bg-[#1d1f1f] w-full h-full opacity-0 pointer-events-none transition-all">
            <div className="image">
              <img
                src="/testmonials/char1.png"
                className="w-[300px] h-[300px] -left-10 sm:left-4 md:-left-14 object-contain absolute bottom-0"
                alt=""
              />
            </div>
            <div className="links text-white absolute right-10 top-10 flex flex-col gap-3">
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Facebook size={25} />
              </span>{" "}
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Twitter size={25} />
              </span>
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Linkedin size={25} />
              </span>
            </div>
            <div className="text">
              <h2 className="text-gray-600 text-2xl font-bold tracking-wider absolute right-10 bottom-10">
                YouseF AdeL
              </h2>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm p-3 rounded-md tesmonial relative">
          <div className="image">
            <img
              src="/testmonials/char4.png"
              className="w-full h-[300px] object-contain"
              alt=""
            />
          </div>
          <div className="text">
            <h2 className="font-bold text-2xl text-gray-800">Moamen</h2>
            <p className="text-gray-400 capitalize">
              UI/UX Developer
            </p>
          </div>
          <div className="info absolute top-0 left-0 bg-[#1d1f1f] w-full h-full pointer-events-none transition-all">
            <div className="image">
              <img
                src="/testmonials/char4.png"
                className="w-[300px] h-[300px] -left-10 sm:left-4 md:-left-14 object-contain absolute bottom-0"
                alt=""
              />
            </div>
            <div className="links text-white absolute right-10 top-10 flex flex-col gap-3">
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Facebook size={25} />
              </span>{" "}
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Twitter size={25} />
              </span>
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Linkedin size={25} />
              </span>
            </div>
            <div className="text">
              <h2 className="text-gray-600 text-2xl font-bold tracking-wider absolute right-10 bottom-10">
                Moamen
              </h2>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm p-3 rounded-md tesmonial relative">
          <div className="image">
            <img
              src="/testmonials/char2.png"
              className="w-full h-[300px] object-contain "
              alt=""
            />
          </div>
          <div className="text">
            <h2 className="font-bold text-2xl text-gray-800">Nasser Mosad</h2>
            <p className="text-gray-400 capitalize">FullStack Developer</p>
          </div>
          <div className="info absolute top-0 left-0 bg-[#1d1f1f] w-full h-full opacity-0 pointer-events-none transition-all">
            <div className="image">
              <img
                src="/testmonials/char2.png"
                className="w-[300px] h-[300px] -left-10 sm:left-4 md:-left-14 object-contain absolute bottom-0"
                alt=""
              />
            </div>
            <div className="links text-white absolute right-10 top-10 flex flex-col gap-3">
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Facebook size={25} />
              </span>{" "}
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Twitter size={25} />
              </span>
              <span className="w-[40px] h-[40px] bg-[#fff1] rounded-md flex items-center justify-center cursor-pointer text-gray-300 hover:text-white hover:-translate-x-3 transition-all">
                <Linkedin size={25} />
              </span>
            </div>
            <div className="text">
              <h2 className="text-gray-600 text-2xl font-bold tracking-wider absolute right-10 bottom-10">
                Nasser Mosad
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testmonials;
