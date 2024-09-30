import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import UL_LIST from "../UL_HEADER/Index";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Data_Parsing, GET_FAVOURITE, useFetch } from "../../../Services/Index";
import Button from "../Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store/Store";
import Example from "../Drawer/Example";

const Header = () => {
  // ! Redux

  // const { menu } = useSelector((state: RootState) => state.menuS);
  const dispatch = useDispatch<AppDispatch>();
  const [data, isLoading] = useFetch();

  // ! State With Ref
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isOpenInfo, setisOpenInfo] = useState(false);
  const userRef = useRef(null);
  const { pathname } = useLocation();
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isLoadingProduct, dataFavourite] = GET_FAVOURITE();

  const handleMenuClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };


  useEffect(() => {
    setIsMatch(
      window.location.href.includes("login") ||
        window.location.href.includes("register")
    );
  }, [pathname, dispatch]);

  const handleLogOut = () => {
    window.localStorage.removeItem("userInfo");
    toast.success("Success You Have Been Logout", {
      duration: 1500,
      position: "top-right",
    });
    setTimeout(() => {
      window.location.replace(pathname);
    }, 300);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target !== document.querySelector(".links")) {
        setIsOpen(false);
      }
      if (e.target !== userRef.current) {
        setisOpenInfo(false);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 400) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  const handleDrawer = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsOpenDrawer((prev) => !prev);
  }, []);

  if (isLoading) return false;
  if (isLoadingProduct) return false;

  return (
    !isMatch && (
      <header
        className={`header ${isScroll && "fixed top-0 left-0 h-[60px] bg-white/60 z-20 w-[100%]"} py-3 border-b transition-all duration-300 overflow-hidden`}
      >
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="logo text-2xl font-extrabold tracking-wider ">
            Exclusive
          </Link>
          <UL_LIST className="gap-3 items-center hidden lg:flex" />
          <UL_LIST
            classLinks="mb-4 block font-bold text-lg"
            className={`links gap-3 items-center fixed top-0 ${
              isOpen ? "left-0" : "left-[-100%]"
            } transition-all  h-screen lg:hidden bg-white z-40 w-[58%] p-4 border-r border-r-black/20 md:w-[30%] text-center`}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="icons flex gap-3 items-center">
            <span
              className="cursor-pointer lg:hidden"
              onClick={(e) => handleMenuClick(e)}
            >
              {isOpen ? <X className="text-red-500" /> : <Menu />}
            </span>

            <Link
              to={"/wishlist"}
              className="cursor-pointer relative"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="absolute bg-red-600 w-5 h-5 flex items-center justify-center rounded-full text-white text-base -top-2 -right-2">
                {dataFavourite.favourites.length}
              </span>

              <Heart />
            </Link>
            <span className="cursor-pointer relative" onClick={handleDrawer}>
              <span className="absolute bg-indigo-600 w-5 h-5 flex items-center justify-center rounded-full text-white text-base -top-2 -right-2">
                {data.carts.length}
              </span>
              <ShoppingBag />
            </span>
            {Data_Parsing?.jwt && (
              <span
                ref={userRef}
                className="cursor-pointer"
                onClick={(e) => {
                  setisOpenInfo((prev) => !prev);
                  e.stopPropagation();
                }}
              >
                <img src="/user.png" className="w-8 h-8 mb-[3px]" alt="" />
              </span>
            )}
          </div>

          {isOpenInfo && (
            <div className="info absolute right-4 md:right-20 lg:right-16 p-4 z-40 top-12 rounded-md md:backdrop-blur-sm space-y-2 bg-white border border-black/20">
              <h2 className="text-gray-800 font-medium">
                Username : {Data_Parsing?.user?.username}
              </h2>
              <h2 className="text-gray-800 font-medium">
                Email : {Data_Parsing?.user?.email}
              </h2>
              <Button
                className="bg-red-500 hover:bg-red-400 text-[15px]"
                WIDTH="w-full"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
        <Example
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />
      </header>
    )
  );
};

export default Header;
