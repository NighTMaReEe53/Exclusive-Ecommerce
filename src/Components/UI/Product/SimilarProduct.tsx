import Explore from "./Explore";

interface ISimilar {
  name: string;
}

const SimilarProduct = ({ name }: ISimilar) => {
  return (
    <>
      <h2
        className="font-bold sm:text-3xl my-8 text-gray-800  text-center w-fit mx-auto  relative before:absolute before:w-5 before:h-5 before:bg-gray-800 before:top-[50%] before:translate-y-[-50%] before:-left-6 before:rounded-full
      after:absolute after:w-5 after:h-5 before:p-2 before:border-2 before:border-gray-400 after:p-2 after:border-2 after:border-gray-400 after:bg-gray-800 after:top-[50%] after:translate-y-[-50%] after:-right-6 after:rounded-full
      text-lg
      
      "
      >
        Similar Product Maybe Like You
      </h2>
      <Explore
        url={`/products?populate=*&filters[categories][category]=${name}`}
        showmainTitle={false}
      />
    </>
  );
};

export default SimilarProduct;
