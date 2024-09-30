import { Trash2 } from "lucide-react";
import Button from "../Button";
import { ICollectionTesting } from "../../../interfaces/Index";
import { handleDeleted, useFetch } from "../../../Services/Index";
import CartSkeleton from "./CartSkeleton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store/Store";
import { COUNTERINCREASEDATA } from "../../../Store/CounterData/CounterSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CartComponent = () => {
  const [data, isLoading] = useFetch();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (window.location.href.includes("cart")) {
      document.title = "Your Cart";
    }
  }, []);

  if (isLoading) return <CartSkeleton />;

  const TOTAL = data.carts.reduce(
    (acc: number, current: ICollectionTesting) => {
      acc += current.products[0].price * current.new_qty;
      return acc;
    },
    0
  );

  const PRODUCT = data.carts.map((item: ICollectionTesting) => (
    // Testing
    <tr className="bg-white border-b" key={item.id}>
      <th
        scope="row"
        className="px-4 lg:px-6 py-2 font-medium text-gray-800 whitespace-nowrap"
      >
        <div className="flex items-center justify-center gap-2 p-2">
          <img
            src={`${item.products[0].image_product[0].url}`}
            alt=""
            className="w-[50px] h-[50px] object-contain"
          />
          <p className="basis-96 text-gray-950 line-clamp-1">
            {item.products[0].title}
          </p>
        </div>
      </th>
      <td className="px-0  lg:px-6 py-4">{item.products[0].price} EGP</td>
      <td className="px-0  lg:px-6 py-4">{item.new_qty}</td>
      <td className="px-0  lg:px-6 py-4">
        {item.new_qty * item.products[0].price} EGP
      </td>
      <td>
        <Button
          className="bg-red-500 hover:bg-rose-400 rounded-full mx-auto"
          onClick={() => {
            handleDeleted(item);
            dispatch(COUNTERINCREASEDATA());
          }}
        >
          <Trash2 size={20} />
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <div>
        {data.carts.length > 0 ? (
          <>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm rtl:text-right text-gray-800 text-center">
                <thead className="text-xs text-gray-700 uppercase bg-white border-t border-b">
                  <tr>
                    <th scope="col" className="px-4 lg:px-6 py-2">
                      Product
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-2">
                      Price
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-2">
                      Qty
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-2">
                      Subtotal
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-2">
                      Operation
                    </th>
                  </tr>
                </thead>
                <tbody>{PRODUCT}</tbody>
              </table>
            </div>
            <div className="card w-[100%] lg:w-[30%] border mt-3 p-2 rounded-md ml-auto bg-white">
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
              <Link
                to={"/checkout"}
                className="bg-red-500 mt-2 w-full hover:bg-red-400 p-2 my-2 block  text-center lg:w-fit text-white rounded-md transition"
              >
                Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center mb-3">
            <img
              src="/scary-2.png"
              className="w-[400px] h-[400px] opacity-15"
              alt=""
            />
            <h2 className="text-gray-800 font-bold text-[17px] md:text-2xl">
              Sorry ! There Is No Product In Your Cart
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default CartComponent;
