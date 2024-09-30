import { CircleOff } from "lucide-react";
import { IOrder } from "../interfaces/Index";
import { Data_Parsing, useGetOrders } from "../Services/Index";
import { Fragment, useEffect, useState } from "react";
import { AxiosInstance } from "../config/Index";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/Store";
import { COUNTERINCREASEDATA } from "../Store/CounterData/CounterSlice";
import Button from "../Components/UI/Button";

// ! Months
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ! Day's

const day = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const Orders = () => {
  const {isLoadingOrders, dataOrders} = useGetOrders();
  const [loading, setIsLoading] = useState(false);
  const [deletedId, setDeletedId] = useState<number | undefined>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Your Own Order`s";
    if (isOpen === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const dispatch = useDispatch<AppDispatch>();

  // ! Handler`s
  const handleDeleted = async () => {
    setIsLoading(true);
    try {
      const { status } = await AxiosInstance.delete(`/orders/${deletedId}`, {
        headers: {
          Authorization: `Bearer ${Data_Parsing?.jwt}`,
        },
      });
      if (status && status === 200) {
        toast.success("Done Cancel This Product From Order", {
          position: "top-right",
          duration: 700,
        });
        dispatch(COUNTERINCREASEDATA());
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  if (isLoadingOrders)
    return (
      <div className="container mx-auto">
        <h2 className="w-28 h-3 bg-gray-400 animate-pulse my-4 rounded-md border-b"></h2>
        {Array.from({ length: 4 }, (_, indx) => (
          <div
            key={indx}
            className="border-b last:border-b-0 flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between p-4 mb-4"
          >
            <div className="flex gap-1 items-center">
              <div className="w-20 h-20 bg-gray-400 rounded-md animate-pulse"></div>
              <div className="flex flex-col gap-1">
                <div className="bg-gray-400 w-24 h-3 animate-pulse rounded-md"></div>
                <div className="bg-gray-400 w-28 h-3 animate-pulse rounded-md"></div>
                <div className="bg-gray-400 w-40 h-3 animate-pulse rounded-md"></div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-32 h-3 bg-gray-400 rounded-md animate-pulse"></div>
            </div>
            <div className="w-36 h-9 rounded-md animate-pulse bg-gray-400"></div>
          </div>
        ))}
      </div>
    );

  const CREATED_AT = dataOrders?.orders[0]?.createdAt;

  const DATE = new Date(CREATED_AT);

  const THE_MONTH = month[DATE.getMonth()];
  const THE_DAY = day[DATE.getDay()];

  const PRODUCT = dataOrders.orders.map((data: IOrder) => {
    return (
      <Fragment key={data?.id}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-800 font-medium">
            Order Number : {data?.id}
          </h2>
          <button
            onClick={() => {
              setDeletedId(data?.id);
              setIsOpen((prev) => !prev);
            }}
            className="p-2 flex items-center justify-center gap-1 outline-none bg-red-500 rounded-md w-fit text-white hover:bg-rose-400 text-base transition-all active:scale-95"
          >
            <CircleOff size={20} />
            Cancel Order
          </button>
        </div>
        {data.products.map((item) => (
          <div
            key={item?.id}
            className="border-b last:border-b-0 flex flex-col lg:flex-row gap-4 lg:gap-0 items-start lg:items-center justify-between p-4 mb-4"
          >
            <div className="flex gap-4 flex-col lg:flex-row items-start lg:items-center">
              <div className="image">
                <img
                  src={item?.products[0]?.image_product[0].url}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="text">
                <h2 className="text-lg font-medium mb-1 line-clamp-1">
                  {item.products[0].title.slice(0, 35)}...
                </h2>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-gray-500 text-[15px] border-r pr-2">
                    {item.products[0].price} EGP
                  </span>
                  <span className="text-gray-500 text-[15px] ps-2">
                    Quantity : {item.new_qty}
                  </span>
                </div>
                <p className="text-[15px] text-gray-600">
                  Date: {DATE.getDate()} - {THE_DAY} - {THE_MONTH} -{" "}
                  {DATE.getFullYear()}
                </p>
              </div>
            </div>
            <div className="operation flex items-center gap-2 text-gray-500 justify-center">
              <span className="w-5 h-5 bg-green-400 border-2 border-white rounded-full block"></span>
              In Progress
            </div>
            <div className="info flex flex-col gap-1 text-gray-400 text-[15px]">
              <span>City : {data.city}</span>
              <span>Street : {data.street}</span>
              <span>Phone : 0{data.phone}</span>
            </div>
          </div>
        ))}
      </Fragment>
    );
  });

  return (
    <div className="container mx-auto min-h-[400px]">
      <h2 className="text-2xl font-bold text-gray-800 my-4">
        Your Order`s InFormation
      </h2>
      {PRODUCT}
      {!dataOrders.orders.length && (
        <div className="h-600 w-full flex flex-col items-center mb-3">
          <img
            src="/scary-2.png"
            className="w-[400px] h-[400px] object-contain opacity-15"
            alt=""
          />
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Sorry You Didn't Have Order`s
          </h2>
        </div>
      )}
      <div
        onClick={() => setIsOpen(false)}
        className={`model ${
          isOpen
            ? "scale-100 pointer-events-auto"
            : "scale-0 pointer-events-none"
        } fixed top-0 left-0 w-full cursor-pointer h-screen grid place-items-center transition z-50 duration-300 bg-black/20 backdrop-blur-sm`}
      >
        <div
          className="box bg-white w-[350px] md:w-[400px] p-3 rounded-md cursor-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-gray-800 font-bold text-2xl my-3">
            Are You Sure To Cancel Order !?
          </h2>
          <p className="mb-3 text-gray-400">
            Maybe... You Aren`t Sure For This
          </p>
          <div className="flex items-center gap-1">
            <Button
              className="bg-red-500 hover:bg-rose-400 w-[150px] transition-all active:scale-95"
              onClick={handleDeleted}
              isLoading={loading}
            >
              Yes, Remove
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-300 w-[150px] active:scale-95"
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
