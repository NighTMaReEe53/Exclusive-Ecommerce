import { memo, MouseEvent, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryGetData } from "../Hooks/useQueryGetItems";
import { Data_Parsing, GET_FAVOURITE } from "../Services/Index";
import { ICollectionTesting, IProduct } from "../interfaces/Index";
import { Heart, Home, Star } from "lucide-react";
import Button from "../Components/UI/Button";
import { motion } from "framer-motion";
import SimilarProduct from "../Components/UI/Product/SimilarProduct";
import SkeletonSingleProduct from "../Components/UI/Product/SkeletonSingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/Store";
import { DECREMENT, INCREMENT } from "../Store/Cart/ACT/Index";
import AddToCart from "../Components/UI/AddToCart";
import toast from "react-hot-toast";
import { AxiosInstance } from "../config/Index";
import { COUNTERINCREASEDATA } from "../Store/CounterData/CounterSlice";

const SinglePageProduct = () => {
  const { count } = useSelector((state: RootState) => state.cart);
  const { counter } = useSelector((state: RootState) => state.counter);
  const [isLoadingProduct, dataFavourite] = GET_FAVOURITE();
  const dispatch = useDispatch<AppDispatch>();

  // Params
  const param = useParams();

  // ! State
  const [isActive, setIsActive] = useState("");

  // Effect
  useEffect(() => {
    document.title = param.NAME!;
    setIsActive("")
  }, [param]);

  const handleChange = useCallback((e: MouseEvent<HTMLImageElement>) => {
    setIsActive(e.currentTarget.src);
  }, []);

  // React Query
  const { isLoading, data } = useQueryGetData({
    queryKey: [
      `single-Product-filter-${param.NAME}`,
      `${counter}`,
      `product-${param.ID}`,
    ],
    url: `/products/${param.ID}?populate=*`,
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  const handleIncrement = useCallback(() => dispatch(INCREMENT()), [dispatch]);
  const handleDecerement = useCallback(() => dispatch(DECREMENT()), [dispatch]);

  // ! Loading React Query
  if (isLoading) return <SkeletonSingleProduct />;
  if (isLoadingProduct) return <SkeletonSingleProduct />;

  const handleClickedFavourite = async (product: IProduct) => {
    const Finded = dataFavourite?.favourites?.find(
      (item: ICollectionTesting) => item.products[0].id === product.id
    );

    if (Finded) {
      toast.error("This Product Already In Your Wishlist", {
        duration: 1500,
        position: "top-right",
      });
    } else {
      try {
        const { status } = await AxiosInstance.post(
          "/favourites",
          {
            data: {
              users: [Data_Parsing?.user.id],
              products: product,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${Data_Parsing?.jwt}`,
            },
          }
        );
        if (status && status === 200) {
          toast.success("Success Add Product To Favourite", {
            duration: 1500,
            position: "top-right",
          });
          dispatch(COUNTERINCREASEDATA());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto my-4">
      <div className="flex gap-2 text-[15px] sm:text-lg font-medium tracking-wide mb-3">
        <Link to={"/"} className="text-indigo-600 flex gap-2 items-center">
          <Home size={20} />
          Home
        </Link>
        <span className="pointer-events-none text-gray-400 hidden md:block">
          /
        </span>
        <span className="gap-2 items-center text-gray-400 hidden md:block">
          Product`s
        </span>
        <span className="pointer-events-none text-gray-400 hidden md:block">/</span>
        <span className="gap-2 items-center text-gray-400 line-clamp-1 hidden md:flex text-[13px] sm:text-base">
          {param.NAME}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row items-start mb-4 gap-4">
        <div className="flex flex-row justify-center w-full lg:w-auto lg:flex-col gap-2 image-container ">
          <motion.img
            src={`${data?.data?.attributes?.image_product.data[0]?.attributes?.url}`}
            className={`w-24 h-24 object-contain cursor-pointer  opacity-50 
              ${isActive === "" && "active"} ${
              isActive ===
                `${data?.data?.attributes?.image_product.data[0]?.attributes?.url}` &&
              "active"
            }`}
            alt=""
            onClick={(e) => {
              handleChange(e);
            }}
          />
          <img
            src={`${data?.data?.attributes?.image_product?.data[1]?.attributes?.url}`}
            className={`w-24 h-24 object-contain cursor-pointer opacity-50 ${
              isActive ===
                `${data?.data?.attributes?.image_product?.data[1]?.attributes?.url}` &&
              "active"
            }`}
            alt=""
            onClick={(e) => {
              handleChange(e);
            }}
          />
          <img
            src={`${data?.data?.attributes?.image_product?.data[2]?.attributes?.url}`}
            className={`w-24 h-24 object-contain cursor-pointer opacity-50 ${
              isActive ===
                `${data?.data?.attributes?.image_product?.data[2]?.attributes?.url}` &&
              "active"
            }`}
            alt=""
            onClick={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="right flex-1 flex items-center flex-col justify-center w-full sm:gap-8 text-center sm:text-start sm:w-auto sm:flex-row">
          <div className="image w-[100%] lg:w-[50%] overflow-hidden">
            <motion.img
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={
                isActive
                  ? isActive
                  : `${data?.data?.attributes?.image_product.data[0]?.attributes?.url}`
              }
              className="w-full h-[350px] object-contain"
              alt=""
            />
          </div>
          <div className="text space-y-3">
            <h2 className="font-bold text-gray-800 text-2xl sm:text-3xl">
              {data?.data?.attributes?.title}
            </h2>
            <p className="text-gray-400 text-[15px]">
              {data?.data?.attributes?.description}
            </p>
            <div className="flex gap-2 items-center justify-center sm:justify-start">
              <span className="border-r border-black/20 pr-2 text-indigo-600 font-bold text-lg">
                {data?.data?.attributes?.price} EGP
              </span>
              <h2 className="text-gray-400 text-[15px]">
                {data?.data?.attributes?.stock ? (
                  <span>
                    We Have ( {data?.data?.attributes?.stock} ) In Stock
                  </span>
                ) : (
                  <span>We Don't Have For This Time</span>
                )}
              </h2>
            </div>

            <div className="flex gap-2 items-center text-yellow-500 justify-center sm:justify-start ">
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
              <span className="text-gray-400 font-medium">
                ( {data?.data.attributes?.rate} Review )
              </span>
            </div>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <Button
                onClick={handleIncrement}
                color="text-black"
                className="bg-[#f1f5f9]  px-5 font-bold text-xl outline-none transition-all active:scale-95 text-gray-800"
              >
                +
              </Button>
              <span className="text-indigo-600 font-bold text-lg">{count}</span>
              <Button
                onClick={handleDecerement}
                color="text-black"
                className="bg-[#f1f5f9] select-none px-5 font-bold text-xl outline-none transition-all active:scale-95"
              >
                -
              </Button>
            </div>
            <div className="flex gap-3">
              <AddToCart product={data?.data} />
              <button
                onClick={() => handleClickedFavourite(data?.data)}
                className="border text-gray-800 hover:bg-rose-500 hover:text-white p-2 rounded-md transition active:scale-95"
              >
                <Heart />
              </button>
            </div>
          </div>
        </div>
      </div>
      <SimilarProduct
        name={data?.data?.attributes?.categories?.data[0]?.attributes?.category}
      />
    </div>
  );
};

export default memo(SinglePageProduct);
