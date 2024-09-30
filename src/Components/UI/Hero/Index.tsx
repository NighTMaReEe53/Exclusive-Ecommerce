// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { memo } from "react";

const HeroSection = () => {
  return (
    <div className="mt-4 container mx-auto">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="h-[450px] lg:h-[316px] bg-black rounded-md"
      >
        <SwiperSlide>
          <div className="box flex flex-col lg:flex-row items-center justify-evenly w-[100%] h-[100%] relative">
            <div className="overlay"></div>
            <div className="text p-3 text-center overflow-hidden">
              <p className="font-medium text-base md:text-2xl capitalize text-white tracking-wider">
                Best Deal Online on smart watches
              </p>
              <motion.h2
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="my-3 relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-black text-2xl lg:text-5xl uppercase tracking-wider"
              >
                SMART WEARABLE.
              </motion.h2>
              <p className="font-medium text-base relative md:text-2xl capitalize text-transparent bg-clip-text bg-gradient-to-l from-white to-black tracking-wider">
                UP to 80% OFF
              </p>
            </div>
            <div className="image">
              <motion.img
                initial={{ right: -100, opacity: 0 }}
                whileInView={{ right: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                src="/hero/watch.png"
                className="w-[200px] lg:w-[250px] object-cover"
                alt="watch"
              />
            </div>
            <motion.img
              initial={{ right: -100, opacity: 0 }}
              whileInView={{ right: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              src="/hero/mask.png"
              className="absolute w-[100%] lg:w-[500px] h-[100%] top-0 right-0 object-cover"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box flex flex-col lg:flex-row items-center justify-evenly w-[100%] h-[100%] relative">
            <div className="overlay"></div>
            <div className="text p-3 text-center overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-medium relative text-base md:text-2xl capitalize text-white tracking-wider"
              >
                Best Deal Online on Mobile Phone`s
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="my-3 relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-white text-2xl lg:text-5xl uppercase tracking-wider"
              >
                Iphone 16 Pro Max
              </motion.h2>
              <motion.p
                className="font-medium text-base relative md:text-2xl capitalize text-transparent bg-clip-text bg-gradient-to-l from-black to-white tracking-wider"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Up to 10% off Voucher
              </motion.p>
            </div>
            <div className="image">
              <motion.img
                initial={{ right: -100, opacity: 0 }}
                whileInView={{ right: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.4 }}
                src="/hero/phone.jfif"
                className="w-[300px] lg:w-[300px] object-cover"
                alt="watch"
              />
            </div>
            <motion.img
              initial={{ right: -100, opacity: 0 }}
              whileInView={{ right: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              src="/hero/mask.png"
              className="absolute w-[100%] lg:w-[500px] h-[100%] top-0 right-0 object-cover"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default memo(HeroSection);
