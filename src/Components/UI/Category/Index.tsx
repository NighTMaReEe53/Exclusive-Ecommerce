import { Link } from "react-router-dom";
import { useQueryGetData } from "../../../Hooks/useQueryGetItems";
import { ICategory } from "../../../interfaces/Index";
import { Data_Parsing } from "../../../Services/Index";
import MainTitle from "../MainTitle";
import Skeleton from "./Skeleton";

const CategoryComponent = () => {
  const { isLoading, data } = useQueryGetData({
    queryKey: ["Category"],
    url: "/categories?populate=*",
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  const ITEM_OF_CATEGORY = data?.data?.map((item: ICategory) => (
    <Link
      to={`/category/${item.attributes.category}`}
      key={item.id}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="bg-[#f1f5f9] shadow-sm text-center space-y-3 w-full flex flex-col items-center p-3 rounded-md cursor-pointer"
    >
      <div className="image-category p-2 rounded-full border-2 w-[90px] h-[90px] flex items-center border-indigo-600 bg-white">
        <img
          src={`${item?.attributes?.image_category?.data?.attributes?.url}`}
          alt={item.attributes.category}
          className="w-14 h-14  object-contain mx-auto"
        />
      </div>
      <h2 className="font-bold text-gray-900 capitalize">
        {item.attributes.category}
      </h2>
    </Link>
  ));

  if (isLoading) return <Skeleton />;

  return (
    <div className="container mx-auto mb-4">
      <MainTitle text="Our Categories :" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 place-items-center gap-3">
        {ITEM_OF_CATEGORY}
      </div>
    </div>
  );
};

export default CategoryComponent;
