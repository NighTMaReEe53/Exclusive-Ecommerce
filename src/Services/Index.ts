import { useSelector } from "react-redux";
import { useQueryGetData } from "../Hooks/useQueryGetItems";
import { RootState } from "../Store/Store";
import { AxiosInstance } from "../config/Index";
import { ICollectionTesting } from "../interfaces/Index";
import toast from "react-hot-toast";

const dataFromStorage = window.localStorage.getItem("userInfo");

export const PublishKey =
  "pk_test_51Q2KbDDIvk3Km2zXEcLlAxwzmIME0ip6cdQn0zCG87VuLXLqTkBpg4PMCxXitXf5KKjhvOxuUAFXi3oRw23ciQ8S00uJMzAE5s";

export const SecretKey =
  "sk_test_51Q2KbDDIvk3Km2zXrbNOJqiFKMfMJd2i2b6PuwzPfYhMe07CFUyiVKzJpuZdR0iZ2RZP8ntfdDhxnBrkDQ80fXnA000gv1zNIC";

export const Data_Parsing = dataFromStorage
  ? JSON.parse(dataFromStorage)
  : null;

export const useFetch = () => {
  const { counter } = useSelector((state: RootState) => state.counter);
  const { data, isLoading } = useQueryGetData({
    queryKey: [`GET_DATA-${counter}`],
    url: `/users/me?[populate][carts][populate][products][populate]=image_product`,
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  return [data, isLoading];
};

export const handleDeleted = async (product: ICollectionTesting) => {
  try {
    const { status } = await AxiosInstance.delete(`/carts/${product.id}`, {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    });
    if (status === 200) {
      toast.success("Success Remove Product", {
        duration: 500,
        position: "top-right",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const GET_FAVOURITE = () => {
  const { counter } = useSelector((state: RootState) => state.counter);

  const { isLoading: isLoadingProduct, data: dataFavourite } = useQueryGetData({
    queryKey: [`GET_DATA+${counter}`],
    url: "/users/me?populate[favourites][populate][products][populate]=image_product",
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });
  return [isLoadingProduct, dataFavourite];
};

export const useGetOrders = () => {
  const { counter } = useSelector((state: RootState) => state.counter);

  const { isLoading: isLoadingOrders, data: dataOrders } = useQueryGetData({
    queryKey: [`Order's-${counter}`],
    url: "/users/me?populate=*",
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });
  return {isLoadingOrders, dataOrders};
};
