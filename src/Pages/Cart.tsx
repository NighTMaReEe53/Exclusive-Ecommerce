import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import CartComponent from "../Components/UI/Cart/CartComponent";

const Cart = () => {
  return (
    <div className="p-4 relative">
      <div className="container mx-auto">
        <div className="flex justify-between flex-col md:flex-row gap-2 items-center mb-4">
          <div className="flex gap-2 text-[15px] sm:text-lg font-medium tracking-wide">
            <Link to={"/"} className="text-indigo-600 flex gap-2 items-center">
              <Home size={20} />
              Home
            </Link>
            <span className="pointer-events-none text-gray-800">/</span>
            <span className="flex gap-2 items-center text-gray-800">Cart</span>
          </div>
        </div>
        <CartComponent />
      </div>
    </div>
  );
};

export default Cart;
