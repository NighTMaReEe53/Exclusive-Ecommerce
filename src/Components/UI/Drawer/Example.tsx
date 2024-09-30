import { Trash2 } from "lucide-react";
import { ICollectionTesting } from "../../../interfaces/Index";
import { useEffect, useRef } from "react";
import { handleDeleted, useFetch } from "../../../Services/Index";
import { COUNTERINCREASEDATA } from "../../../Store/CounterData/CounterSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store/Store";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

interface IDrawer {
  isOpenDrawer: boolean;
  setIsOpenDrawer: (val: boolean) => void;
}

const Example = ({ isOpenDrawer, setIsOpenDrawer }: IDrawer) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [data, isLoading] = useFetch();

  const naviagte = useNavigate();

  useEffect(() => {
    if (isOpenDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenDrawer]);

  if (isLoading) return <h3>Loading...</h3>;

  const TOTAL = data.carts.reduce(
    (acc: number, current: ICollectionTesting) => {
      acc += current.products[0].price * current.new_qty;
      return acc;
    },
    0
  );

  const DATA = data.carts.map((item: ICollectionTesting) => (
    <div
      className="box flex gap-2 py-4 border-b border-b-[#fff1] last:border-0 items-center"
      key={item.id_product_custom}
    >
      <div className="image w-[100px] border flex items-center justify-center rounded-full h-[100px] p-4 bg-white">
        <img
          src={`${item.products[0].image_product[0].url}`}
          className="w-[80px] h-[80px] object-contain"
          draggable={false}
          alt=""
        />
      </div>
      <div className="text flex-1">
        <h2
          title={item.products[0].title}
          className="text-lg line-clamp-1 text-gray-800"
        >
          {item.products[0].title}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400">
              Price : {item.products[0].price} EGP
            </span>
            <span className="text-gray-400 text-base tracking-wider">
              Qty : {item.new_qty}
            </span>
          </div>
          <span
            className="bg-red-500 p-2 rounded-full text-white hover:bg-rose-400 transition cursor-pointer"
            onClick={() => {
              handleDeleted(item);
              dispatch(COUNTERINCREASEDATA());
              setIsOpenDrawer(false);
            }}
          >
            <Trash2 size={20} />
          </span>
        </div>
      </div>
    </div>
  ));

  const handleClicked = () => {
    naviagte("/cart");
    setIsOpenDrawer(false);
  };

  return (
    <div
      ref={ref}
      className={`fixed top-0 cursor-pointer w-[100%] h-screen backdrop-blur-sm bg-black/30 drawer-indx flex justify-end z-50 ${
        isOpenDrawer ? "right-0 open" : "-right-[100%] close"
      } transition-all`}
      onClick={() => setIsOpenDrawer(false)}
    >
      <div
        className="bg-white w-[90%] sm:w-[50%]  lg:w-[30%] h-screen p-4 cursor-auto overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-gray-950 text-3xl text-center mb-4">
          Drawer Cart
        </h2>
        {data.carts.length > 0 ? (
          <>
            {DATA}
            <div className="flex justify-between items-center mt-4">
              <h2 className="font-medium text-base text-gray-800">
                Total Price : <span className="text-gray-950">{TOTAL} EGP</span>
              </h2>
              <Button
                className="bg-rose-600 hover:bg-rose-400 w-[120px]"
                onClick={handleClicked}
              >
                View Cart
              </Button>
            </div>
          </>
        ) : (
          <div>
            <img
              src="/scary.png"
              className="opacity-15 w-[500px] h-[500px] object-contain"
              alt=""
            />
            <h2 className="text-center  text-2xl text-gray-400 font-bold tracking-wider">
              There Is No Product
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Example;
