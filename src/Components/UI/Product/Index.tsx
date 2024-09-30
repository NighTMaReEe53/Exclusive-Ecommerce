import { useQueryGetData } from "../../../Hooks/useQueryGetItems";
import { IProduct } from "../../../interfaces/Index";
import { Data_Parsing } from "../../../Services/Index";
import MainTitle from "../MainTitle";
import ProductCard from "./ProductCard";
import Skeleton_Product from "./Skeleton";

const ProductComponent = () => {
  const type = "sale";

  const { isLoading, data } = useQueryGetData({
    queryKey: ["Product"],
    url: `/products?filters[type]=${type}&populate=*`,
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  if (isLoading) return <Skeleton_Product />;

  const PRODUCT = data.data.map((item: IProduct) => (
    <ProductCard key={item.id} product={item} />
  ));

  return (
    <div className="bg-[#f1f5f9] py-2 overflow-hidden relative z-10">
      <div className="tringle-right"></div>
      <div className="container mx-auto">
        <MainTitle text="Flash Sales" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
          {PRODUCT}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
