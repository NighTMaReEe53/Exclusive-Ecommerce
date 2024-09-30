import { Eye, Heart, Star } from "lucide-react";
import { ICollectionTesting, IProduct } from "../../../interfaces/Index";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Data_Parsing, GET_FAVOURITE } from "../../../Services/Index";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store/Store";
import { COUNTERINCREASEDATA } from "../../../Store/CounterData/CounterSlice";
import { AxiosInstance } from "../../../config/Index";
import { memo } from "react";
import { RESETCOUNT } from "../../../Store/Cart/ACT/Index";

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
  const naviagte = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [isLoadingProduct, dataFavourite] = GET_FAVOURITE();

  if (isLoadingProduct)
    return (
      <div role="status" className=" p-4 rounded shadow animate-pulse md:p-6 ">
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-400 rounded">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="h-2.5 bg-gray-400 rounded-ful w-48 mb-4"></div>
        <div className="flex gap-2">
          <div className="h-5 w-5 bg-gray-400 rounded-full  mb-2.5"></div>
          <div className="h-5 w-5 bg-gray-400 rounded-full  mb-2.5"></div>
          <div className="h-5 w-5 bg-gray-400 rounded-full  mb-2.5"></div>
          <div className="h-5 w-5 bg-gray-400 rounded-full  mb-2.5"></div>
        </div>
      </div>
    );

  const Finded = dataFavourite?.favourites?.find(
    (item: ICollectionTesting) => item.products[0].id === product.id
  );

  // Handler`s

  const handleClicked = (product: IProduct) => {
    dispatch(RESETCOUNT());
    naviagte(`/products/${product.attributes.title}/${product.id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handeFavourite = async (product: IProduct) => {
    if (Finded) {
      toast.error("This Product Already In Your Wishlist", {
        duration: 800,
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
    <>
      <div className="box box-card relative w-full p-3 text-center lg:text-start bg-white rounded-md shadow-sm">
        {product.attributes.sale && (
          <span className="text-selling bg-indigo-600 px-0.5 h-20 text-center text-[14px] text-white py-1 z-20 absolute top-0 right-2 font-medium tracking-wide">
            Selling
          </span>
        )}
        <div className=" flex justify-center h-[200px] relative w-full image">
          <img
            src={`${product.attributes.image_product.data[0].attributes.url}`}
            className="w-[195px] absolute top-0 h-[100%] object-contain bg-white z-10"
            alt=""
            draggable={false}
          />
          <img
            src={`${product.attributes.image_product.data[1].attributes.url}`}
            className="w-[195px] absolute top-0 h-[100%] object-contain bg-white"
            alt=""
            draggable={false}
          />
        </div>
        <div className="text">
          <h2
            className="text-gray-950 font-bold mt-2 line-clamp-1"
            title={product.attributes.title}
          >
            {product.attributes.title}
          </h2>
          <p className="text-gray-800 font-bold text-[14px] my-2">
            Price : {product.attributes.price} EGP{" "}
            <del className="text-red-500">
              {product.attributes.price + 300} EGP
            </del>
          </p>
          <div className="flex gap-1 items-center text-yellow-500 justify-center lg:justify-start ">
            <Star size={20} />
            <Star size={20} />
            <Star size={20} />
            <Star size={20} />
            <span className="text-gray-400 font-medium text-[13px]">
              ( {product.attributes.rate} Review )
            </span>
          </div>
        </div>
        <div className="flex gap-1 mt-3 items-center">
          <Button
            title="Add To Favourite"
            className=" bg-white border  gap-1 w-10 p-2 active:scale-95"
            onClick={() => handeFavourite(product)}
          >
            <Heart size={20} color="black" />
          </Button>

          <Button
            onClick={() => handleClicked(product)}
            className=" bg-indigo-600 hover:bg-indigo-400 text-base gap-1 flex-1 flex justify-center p-2 rounded-md items-center text-white transition-all"
          >
            <Eye size={18} />
            Details
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(ProductCard);
