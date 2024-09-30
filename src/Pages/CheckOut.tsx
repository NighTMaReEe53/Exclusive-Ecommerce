import { ICollection, ICollectionTesting } from "../interfaces/Index";
import { Data_Parsing, useFetch } from "../Services/Index";
import Button from "../Components/UI/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckOut_schema } from "../Validation/Index";
import { useState } from "react";
import { AxiosInstance } from "../config/Index";
import toast from "react-hot-toast";
import { COUNTERINCREASEDATA } from "../Store/CounterData/CounterSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/Store";
import { useQueryGetData } from "../Hooks/useQueryGetItems";
import { Player } from "@lottiefiles/react-lottie-player";
import Animated from "../../public/animation/animated4.json";
import Animated2 from "../../public/animation/animated5.json";

type Inputs = {
  city: string;
  street: string;
  phone: string;
};

const CheckOut = () => {
  const [data, isLoading] = useFetch();
  const [loading, setIsLoading] = useState(false);
  const [confrimed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { data: dataCarts } = useQueryGetData({
    queryKey: ["CartsData"],
    url: "/carts",
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(CheckOut_schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (dataInputs) => {
    setIsLoading(true);

    try {
      const { status } = await AxiosInstance.post(
        "/orders?populate[products][populate]=data",
        {
          data: {
            products: data.carts,
            user: [Data_Parsing?.user.id],
            city: dataInputs.city,
            street: dataInputs.street,
            phone: dataInputs.phone,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${Data_Parsing?.jwt}`,
          },
        }
      );
      if (status && status === 200) {
        toast.success("Success For Paying Order Will Receive For You", {
          duration: 1000,
          position: "top-right",
        });
        dataCarts?.data?.map(
          async (el: ICollection) =>
            await AxiosInstance.delete(`/carts/${el.id}`, {
              headers: {
                Authorization: `Bearer ${Data_Parsing?.jwt}`,
              },
            })
        );
        setTimeout(() => {
          setIsConfirmed(true);
          dispatch(COUNTERINCREASEDATA());
        }, 300);
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto my-3 h-[600px] lg:h-[500px] flex flex-col md:flex-row items-start lg:items-center justify-center overflow-hidden">
        <div className="w-[50%]">
          <h2 className="w-60 h-3 bg-gray-400 rounded-md animate-pulse"></h2>
          <div className="flex flex-col gap-3 mt-3">
            <div className="w-80 h-3 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-80 h-3 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-80 h-3 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-80 h-3 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-80 h-3 bg-gray-400 animate-pulse rounded-md"></div>
          </div>
        </div>
        <div className="w-[50%]">
          <h2 className="w-48 rounded-md bg-gray-400 h-3 animate-pulse"></h2>
          <div className="bg-gray-400 w-56 h-3 rounded-md mt-3 animate-pulse"></div>
          <div className="bg-gray-400 w-56 h-3 rounded-md mt-3 animate-pulse"></div>
          <div className="bg-gray-400 w-56 h-3 rounded-md mt-3 animate-pulse"></div>
          <div className="bg-gray-400 w-52 h-10 rounded-md mt-3 animate-pulse"></div>
          <div className="flex gap-2 mt-3 justify-between items-center">
            <h2 className="w-32 h-3 bg-gray-400 animate-pulse rounded-md"></h2>
            <div className="flex items-center gap-1 flex-col md:flex-row">
              <div className="bg-gray-400 w-28 h-9 rounded-md animate-pulse"></div>
              <div className="bg-gray-400 w-28 h-9 rounded-md animate-pulse"></div>
              <div className="bg-gray-400 w-28 h-9 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );

  const TOTAL = data.carts.reduce(
    (acc: number, current: ICollectionTesting) => {
      acc += current?.products[0]?.price * current.new_qty;
      return acc;
    },
    0
  );

  return (
    <div className="container mx-auto lg:h-[500px] flex items-center">
      <div
        className={`flex ${
          confrimed ? "justify-center" : "justify-between"
        } flex-col md:flex-row gap-4 w-full items-center`}
      >
        {confrimed ? (
          <>
            <Player src={Animated} autoplay loop />
          </>
        ) : data.carts.length ? (
          <>
            <div className="w-full">
              <h2 className="font-bold text-2xl capitalize mb-3">
                Delivery Information
              </h2>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="w-full p-2 border shadow-sm rounded-md cursor-not-allowed text-gray-400"
                  disabled
                  defaultValue={`Your Username : ${Data_Parsing?.user.username}`}
                />
                <input
                  type="email"
                  className="w-full p-2 border shadow-sm rounded-md cursor-not-allowed text-gray-400"
                  disabled
                  defaultValue={`Your Email : ${Data_Parsing?.user.email}`}
                />
                <input
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true, min: 4 })}
                  className="w-full p-2 border shadow-sm rounded-md text-gray-800 outline-none focus:ring-2 transition-all"
                />
                {errors.city?.message && (
                  <p className="text-red-500 text-[15px] font-medium">
                    {errors.city.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Street"
                  {...register("street", { required: true, min: 5 })}
                  className="w-full p-2 border shadow-sm rounded-md text-gray-800 outline-none focus:ring-2 transition-all"
                />
                {errors.street?.message && (
                  <p className="text-red-500 text-[15px] font-medium">
                    {errors.street?.message}
                  </p>
                )}

                <input
                  type="number"
                  {...register("phone", { required: true, max: 11 })}
                  placeholder="Your Phone"
                  className="w-full p-2 border shadow-sm rounded-md text-gray-800 outline-none focus:ring-2 transition-all"
                />

                {errors.phone?.message && (
                  <p className="text-red-500 text-[15px] font-medium">
                    {errors.phone?.message}
                  </p>
                )}

                <Button
                  isLoading={loading}
                  disabled={loading}
                  className="bg-red-500 mt-2 w-full hover:bg-red-400 p-2 my-2 block  text-center lg:w-fit text-white rounded-md transition"
                >
                  Pay By Delivery (Only For This Time)
                </Button>
              </form>
            </div>
            <div className="w-full">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-1 uppercase">
                  Cart Total
                </h2>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Subtotal:</span>

                  <span>{TOTAL} EGP</span>
                </div>
                <div className="flex justify-between items-center border-b py-2">
                  <span>Shipping: </span>

                  <span>Free</span>
                </div>
                <div className="flex justify-between items-center border-b py-2">
                  <span>Total :</span>
                  <span>{TOTAL} EGP</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-gray-400 text-base font-medium">
                  Add Soon
                </h2>
                <img src="/Payment.png" alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full mb-3">
            <Player
              src={Animated2}
              autoplay
              loop
              className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
            />
            <h2 className="text-gray-950 font-bold text-lg md:text-2xl capitalize tracking-wide">
              You Didn't Have Product In Your Cart
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
