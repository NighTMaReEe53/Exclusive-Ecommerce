import { ShoppingCart } from "lucide-react";
import { ICollection, IProduct } from "../../interfaces/Index";
import Button from "./Button";

import { AxiosInstance } from "../../config/Index";
import { Data_Parsing } from "../../Services/Index";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/Store";
import { useState } from "react";
import { useQueryGetData } from "../../Hooks/useQueryGetItems";
import Loading from "../SVG/Loading";
import { COUNTERINCREASEDATA } from "../../Store/CounterData/CounterSlice";

interface ICart {
  product: IProduct;
}

const AddToCart = ({ product }: ICart) => {
  const { count } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();

  const [counter, setCounter] = useState(0);
  const { data, isLoading } = useQueryGetData({
    queryKey: [`data-${counter}`],
    url: "/carts?[populate][products][populate]=image_product",
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  if (isLoading)
    return (
      <Button className="bg-indigo-400 hover:cursor-not-allowed flex items-center w-[250px] md:w-[150px] mx-auto sm:m-0">
        <Loading color="text-white" width="w-5" height="h-5" />
        Loading...
      </Button>
    );

  const Finded = data?.data?.find(
    (item: ICollection) => item.attributes.id_product_custom === product.id
  );

  const handleClicked = async (product: IProduct) => {
    if (Finded) {
      try {
        const { status } = await AxiosInstance.put(
          `/carts/${Finded.id}`,
          {
            data: {
              new_qty: count,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${Data_Parsing?.jwt}`,
            },
          }
        );
        if (status === 200) {
          toast.success("Is Already In Your Cart Add Qty Last Vr", {
            duration: 800,
            position: "top-right",
          });
          dispatch(COUNTERINCREASEDATA())
          setCounter((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }

      return;
    } else {
      try {
        const { status } = await AxiosInstance.post(
          "/carts?[populate][products][populate]=image_product",
          {
            data: {
              username: Data_Parsing?.user.username,
              email: Data_Parsing?.user.email,
              new_qty: count,
              id_product_custom: product.id,
              products: product.id,
              user: [Data_Parsing?.user.id],
            },
          },
          {
            headers: {
              Authorization: `Bearer ${Data_Parsing?.jwt}`,
            },
          }
        );
        if (status === 200) {
          toast.success("Success Add Product To Cart", {
            duration: 800,
            position: "top-right",
          });
          setCounter((prev) => prev + 1);
          dispatch(COUNTERINCREASEDATA());
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
  };

  return (
    <Button
      onClick={() => handleClicked(product)}
      className="bg-indigo-600 gap-2 hover:bg-indigo-400 w-[250px] md:w-[150px] mx-auto sm:m-0"
    >
      <ShoppingCart size={20} />
      Add To Cart
    </Button>
  );
};

export default AddToCart;
