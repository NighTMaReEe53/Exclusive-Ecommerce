import { Eye, Home, Star, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Data_Parsing, GET_FAVOURITE } from "../Services/Index";
import { ICollectionTesting } from "../interfaces/Index";
import Button from "../Components/UI/Button";
import { useEffect } from "react";
import { AxiosInstance } from "../config/Index";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/Store";
import { COUNTERINCREASEDATA } from "../Store/CounterData/CounterSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import Animated from "../../public/animation/animated3.json";

const WishList = () => {
  const [isLoadingProduct, dataFavourite] = GET_FAVOURITE();
  const naviagte = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.title = "Your WishList";
  }, []);

  if (isLoadingProduct)
    return (
      <div className="container mx-auto my-3">
        <h2 className="w-36 bg-gray-400 h-5 rounded-md animate-pulse"></h2>
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, indx) => (
            <div key={indx}>
              <div className="bg-gray-400 w-full h-[190px] animate-pulse rounded-md"></div>
              <h2 className="bg-gray-400 w-40 h-4 mt-2 rounded-md animate-pulse"></h2>
              <h2 className="bg-gray-400 w-24 h-3 mt-2 rounded-md animate-pulse"></h2>
              <div className="flex gap-1 mt-2">
                <span className="bg-gray-400 w-6 h-6 rounded-full animate-pulse"></span>
                <span className="bg-gray-400 w-6 h-6 rounded-full animate-pulse"></span>
                <span className="bg-gray-400 w-6 h-6 rounded-full animate-pulse"></span>
                <span className="bg-gray-400 w-6 h-6 rounded-full animate-pulse"></span>
              </div>
              <div className="flex gap-1 mt-3 items-center">
                <button
                  title="Remove"
                  className=" bg-gray-400  animate-pulse  gap-1 w-10 p-5 rounded-md"
                ></button>

                <button className=" bg-gray-400  animate-pulse text-base gap-1 flex-1 flex justify-center p-5 rounded-md items-center text-white transition-all"></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  const handleClicked = (product: ICollectionTesting) => {
    naviagte(
      `/products/${product.products[0].title}/${product.products[0].id}`
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleted = async (product: ICollectionTesting) => {
    try {
      const { status } = await AxiosInstance.delete(
        `/favourites/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${Data_Parsing?.jwt}`,
          },
        }
      );
      if (status && status === 200) {
        toast.success("Success To Delete Product From Favourite", {
          duration: 1500,
          position: "top-right",
        });
        dispatch(COUNTERINCREASEDATA());
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  };

  const PRODUCT = dataFavourite.favourites.map((item: ICollectionTesting) => (
    <div className="bg-white shadow-sm rounded-md p-3 border" key={item.id}>
      <div className=" flex justify-center h-[200px] relative w-full image">
        <img
          src={`${item.products[0].image_product[0].url}`}
          className="w-[195px] absolute top-0 h-[100%] object-contain bg-white z-10"
          alt=""
          draggable={false}
        />
        <img
          src={`${item.products[0].image_product[1].url}`}
          className="w-[195px] absolute top-0 h-[100%] object-contain bg-white"
          alt=""
          draggable={false}
        />
      </div>
      <div className="text">
        <h2
          className="text-gray-950 font-bold mt-2 line-clamp-1"
          title={item.products[0].title}
        >
          {item.products[0].title}
        </h2>
        <p className="text-gray-800 font-bold text-[14px] my-2">
          Price : {item.products[0].price} EGP
          <del className="text-red-500">{item.products[0].price + 300} EGP</del>
        </p>
        <div className="flex gap-1 items-center text-yellow-500 justify-center lg:justify-start ">
          <Star size={20} />
          <Star size={20} />
          <Star size={20} />
          <Star size={20} />
          <span className="text-gray-400 font-medium text-[15px]">
            ( {item.products[0].rate} Review )
          </span>
        </div>
      </div>
      <div className="flex gap-1 mt-3 items-center">
        <button
          title="Remove"
          onClick={() => handleDeleted(item)}
          className=" bg-white border  gap-1 w-10 p-2 transition rounded-md active:scale-95 text-gray-800 hover:text-rose-500"
        >
          <Trash2 size={20} />
        </button>

        <Button
          onClick={() => handleClicked(item)}
          className=" bg-indigo-600 hover:bg-indigo-400 text-base gap-1 flex-1 flex justify-center p-2 rounded-md items-center text-white transition-all"
        >
          <Eye size={18} />
          Details
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="container mx-auto my-3">
      <div className="flex gap-2 text-[15px] sm:text-lg font-medium tracking-wide mb-3">
        <Link to={"/"} className="text-indigo-600 flex gap-2 items-center">
          <Home size={20} />
          Home
        </Link>
        <span className="pointer-events-none text-gray-400 hidden md:block">
          /
        </span>
        <span className="gap-2 items-center text-gray-400 hidden md:block">
          WishList
        </span>
      </div>
      {dataFavourite.favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PRODUCT}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center flex-col mb-3">
          <Player
            src={Animated}
            className="md:w-[400px] md:h-[400px] w-[300px] h-[300px]"
            autoplay
            loop
          />
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            You Didn't Have Any Favourite Product`s
          </h2>
        </div>
      )}
    </div>
  );
};

export default WishList;
