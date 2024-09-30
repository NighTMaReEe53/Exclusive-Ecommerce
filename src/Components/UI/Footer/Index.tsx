import {
  Facebook,
  Instagram,
  Linkedin,
  SendHorizontal,
  Twitter,
} from "lucide-react";
import { Data_Parsing } from "../../../Services/Index";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsMatch(
      window.location.href.includes("login") ||
        window.location.href.includes("register")
    );
  }, [pathname]);

  return (
    !isMatch && (
      <div className="bg-[#1D1F1F] relative pt-6 text-white z-20 overflow-hidden ">
        <div className="overlay absolute bg-white w-[200px] h-[200px] rounded-full right-0 bottom-0 md:top-0 -z-20 filter blur-[150px]"></div>
        <div className="container mx-auto place-items-start">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-center xl:text-start  xl:place-items-start mb-6">
            <div>
              <h2 className="my-3">Exclusive</h2>
              <ul className="space-y-1">
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Subscribe
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Get 10% off your first order
                </li>
                <li className="relative w-fit m-auto">
                  <input
                    type="text"
                    placeholder={`${Data_Parsing?.user.email}`}
                    disabled
                    className="bg-[#fff1] p-2 rounded-md"
                  />
                  <SendHorizontal
                    size={20}
                    className="absolute top-[50%] translate-y-[-50%] right-2"
                    color="#CCC"
                  />
                </li>
              </ul>
            </div>
            <div>
              <h2 className="my-3">Support</h2>
              <ul className="space-y-1">
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Dhaka, DH 1515 Bangladesh.
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  {Data_Parsing?.user?.email}
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  +88015-88888-9999
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h2 className="my-3">Account</h2>
              <ul className="space-y-1">
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  My Account
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Login / Register
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Cart
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Wishlist
                </li>
              </ul>
            </div>
            <div>
              <h2 className="my-3">Quick Link</h2>
              <ul className="space-y-1">
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Privacy Policy
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Terms Of Use
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  FAQ
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Contact
                </li>
              </ul>
            </div>
            <div>
              <h2 className="my-3">Download App</h2>
              <ul className="space-y-1">
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Save $3 with App New
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Qr Code
                </li>
                <li className="text-gray-400 text-base hover:text-white transition-colors">
                  Apple Store
                </li>
                <li className="flex gap-2 justify-center xl:justify-start ">
                  <span className="w-10 h-10 bg-[#fff1] flex items-center justify-center rounded-md text-gray-400 hover:text-white cursor-pointer transition-all hover:translate-y-3">
                    <Facebook size={20} />
                  </span>
                  <span className="w-10 h-10 bg-[#fff1] flex items-center justify-center rounded-md text-gray-400 hover:text-white cursor-pointer transition-all hover:translate-y-3">
                    <Twitter size={20} />
                  </span>
                  <span className="w-10 h-10 bg-[#fff1] flex items-center justify-center rounded-md text-gray-400 hover:text-white cursor-pointer transition-all hover:translate-y-3">
                    <Instagram size={20} />
                  </span>
                  <span className="w-10 h-10 bg-[#fff1] flex items-center justify-center rounded-md text-gray-400 hover:text-white cursor-pointer transition-all hover:translate-y-3">
                    <Linkedin size={20} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4 border-t border-t-white/20 flex items-center justify-between flex-col gap-4 lg:flex-row">
            <img src="/Payment.png" alt="" />
            <p className="copyRight text-[15px] text-center text-gray-400 font-medium md:text-base capitalize tracking-wide">
              &copy; Copyright Rimel 2024. All right reserved
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
