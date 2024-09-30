import { Star } from "lucide-react";
import { motion } from "framer-motion";
import MainTitle from "./MainTitle";

const News = () => {
  return (
    <div>
      <div className="container my-4 mx-auto">
        <MainTitle text="Our New`s" />
        <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <motion.div initial={{scale: 0}} transition={{duration: 0.5}} whileInView={{scale: 1}} className="bg-white shadow-sm p-4 rounded-md">
            <img src="/news/news-1.png" className="w-full rounded-md" alt="" />
            <div className="text mt-3">
              <h2 className="font-bold text-gray-800 capitalize text-[15px]">
                The extent of the impact of technology on human life
              </h2>
              <p className="text-gray-400">
                To be successful in e-commerce business, you need to sell
                desired products, if you have no idea, in this article we will
                share the list of product types
              </p>
            </div>
            <div className="review flex items-center pt-2 border-t mt-2 gap-2">
              <img src="/news/man.png" className="w-14 h-14" alt="" />
              <div>
                <h2 className="text-lg text-gray-800 font-medium">
                  YouseF AdeL
                </h2>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{scale: 0}} transition={{duration: 0.5, delay: 0.5}} whileInView={{scale: 1}} className="bg-white shadow-sm p-4 rounded-md">
            <img src="/news/news-2.png" className="w-full rounded-md" alt="" />
            <div className="text mt-3">
              <h2 className="font-bold text-gray-800 capitalize text-[15px]">
                The extent of the impact of technology on human life
              </h2>
              <p className="text-gray-400">
                To be successful in e-commerce business, you need to sell
                desired products, if you have no idea, in this article we will
                share the list of product types
              </p>
            </div>
            <div className="review flex items-center pt-2 border-t mt-2 gap-2">
              <img src="/news/man.png" className="w-14 h-14" alt="" />
              <div>
                <h2 className="text-lg text-gray-800 font-medium">
                  YouseF AdeL
                </h2>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{scale: 0}} transition={{duration: 0.5, delay: 1}} whileInView={{scale: 1}} className="bg-white shadow-sm p-4 rounded-md">
            <img src="/news/news-3.png" className="w-full rounded-md" alt="" />
            <div className="text mt-3">
              <h2 className="font-bold text-gray-800 capitalize text-[15px]">
                The extent of the impact of technology on human life
              </h2>
              <p className="text-gray-400">
                To be successful in e-commerce business, you need to sell
                desired products, if you have no idea, in this article we will
                share the list of product types
              </p>
            </div>
            <div className="review flex items-center pt-2 border-t mt-2 gap-2">
              <img src="/news/man.png" className="w-14 h-14" alt="" />
              <div>
                <h2 className="text-lg text-gray-800 font-medium">
                  YouseF AdeL
                </h2>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default News;
