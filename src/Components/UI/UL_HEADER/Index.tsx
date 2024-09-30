import { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { Data_Parsing, useGetOrders } from "../../../Services/Index";

interface IUl extends HTMLAttributes<HTMLUListElement> {
  className: string;
  classLinks?: string;
}

const UL_LIST = ({ className, classLinks, ...rest }: IUl) => {
  const { dataOrders } = useGetOrders();

  return (
    <ul className={`${className}`} {...rest}>
      <li>
        <NavLink
          to="/"
          className={`text-[16px] font-medium ${classLinks}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/products"
          className={`text-[16px] font-medium ${classLinks}`}
        >
          Product`s
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cart"
          className={`text-[16px] font-medium ${classLinks}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={`text-[16px] font-medium ${classLinks}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          About
        </NavLink>
      </li>
      {dataOrders?.orders?.length ? (
        <>
          <li>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/order"
              className={`text-[16px] font-medium relative ${classLinks} w-fit mx-auto lg:w-full`}
            >
              Order`s
              <span className="absolute -top-3 -right-3 bg-indigo-600 text-white text-[13px] w-5 h-5 font-bold flex items-center justify-center rounded-full ">
                {dataOrders?.orders?.length}
              </span>
            </NavLink>
          </li>
        </>
      ) : null}

      <li>
        <NavLink
          to="/contact"
          className={`text-[16px] font-medium ${classLinks}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Contact
        </NavLink>
      </li>
      {!Data_Parsing?.jwt && (
        <li>
          <NavLink
            to="/register"
            className={`text-[16px] font-medium ${classLinks}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Sign Up
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default UL_LIST;
