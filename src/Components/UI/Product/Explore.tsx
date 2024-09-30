import { useQueryGetData } from "../../../Hooks/useQueryGetItems";
import { Data_Parsing } from "../../../Services/Index";

// import Swiper core and required modules
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IProduct } from "../../../interfaces/Index";
import ProductCard from "./ProductCard";
import MainTitle from "../MainTitle";
import Skeleton_Product from "./Skeleton";

interface IExplore {
  url: string;
  showmainTitle: boolean;
}

const Explore = ({ url, showmainTitle }: IExplore) => {
  const { isLoading, data } = useQueryGetData({
    queryKey: [`product-${url}`],
    url,
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

  const PRODUCT = data.data.map((item: IProduct) => (
    <SwiperSlide key={item.id}>
      <ProductCard product={item} />
    </SwiperSlide>
  ));

  return (
    <div className="container mx-auto product">
      {showmainTitle && (
        <MainTitle text={"Explore Our Product`s"} className="mt-0" />
      )}
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="mt-5"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {PRODUCT}
      </Swiper>
    </div>
  );
};

export default Explore;
