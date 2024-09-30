import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../Components/UI/Product/ProductCard";
import { useQueryGetData } from "../Hooks/useQueryGetItems";
import { IProduct } from "../interfaces/Index";
import { Data_Parsing } from "../Services/Index";
import { Home } from "lucide-react";
import Skeleton_Product from "../Components/UI/Product/Skeleton";
import { ChangeEvent, useEffect, useState } from "react";

const Category = () => {
  const param = useParams();
  const Naviagte = useNavigate();

  const { pathname } = useLocation();

  const LAST_OF_PATH = pathname.split("/").pop();

  const [changeSelected, setChangeSelected] = useState<string>("");

  const handlerSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setChangeSelected(e.target.value);
    Naviagte(`/category/${e.target.value}`);
  };

  useEffect(() => {
    document.title = `Category ${param.NAME}`;
  }, [param.NAME]);

  // React Query
  const { isLoading, data } = useQueryGetData({
    queryKey: [`category-${param.NAME}`, `${changeSelected}`],
    url: `/products?populate=*&filters[categories][category]=${
      changeSelected === "" ? param.NAME : changeSelected
    }`,
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  if (isLoading)
    return (
      <>
        <div className="container mx-auto my-4">
          <Skeleton_Product />
        </div>
      </>
    );

  const ITEM_CATEGORY = data?.data?.map((item: IProduct) => (
    <ProductCard product={item} key={item.id} />
  ));

  return (
    <div className="bg-[#f1f5f9] p-5">
      <div className="container mx-auto">
        <div className="flex justify-between flex-col md:flex-row gap-2 items-center mb-4">
          <div className="flex gap-2 text-[15px] sm:text-lg font-medium tracking-wide">
            <Link to={"/"} className="text-indigo-600 flex gap-2 items-center">
              <Home size={20} />
              Home
            </Link>
            <span className="pointer-events-none text-gray-800">/</span>
            <span className="flex gap-2 items-center text-gray-800">
              Category
            </span>
            <span className="pointer-events-none text-gray-800">/</span>
            <span className="text-gray-800">
              {changeSelected === "" ? param.NAME : changeSelected}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-800 font-medium">
              Choose Category :{" "}
            </span>
            <select
              onChange={handlerSelected}
              className="text-gray-800 border border-gray-400 outline-none px-2 py-1 rounded-md bg-white"
            >
              <option value="Phones" selected={LAST_OF_PATH === "Phones"}>
                Phones
              </option>
              <option value="Furniture" selected={LAST_OF_PATH === "Furniture"}>
                Furniture
              </option>
              <option value="Watches" selected={LAST_OF_PATH === "Watches"}>
                Watches
              </option>
              <option value="Clothes" selected={LAST_OF_PATH === "Clothes"}>
                Clothes
              </option>
              <option value="Games" selected={LAST_OF_PATH === "Games"}>
                Games
              </option>
              <option value="Computers" selected={LAST_OF_PATH === "Computers"}>
                Computers
              </option>
            </select>
          </div>
        </div>
        <div className="grid right-side grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ITEM_CATEGORY}
        </div>
      </div>
    </div>
  );
};

export default Category;
