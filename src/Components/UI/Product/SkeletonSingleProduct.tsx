
const SkeletonSingleProduct = () => {
  return (
    <div className="container mx-auto my-4">
      <div className="flex flex-col lg:flex-row items-start mb-4">
        <div className="flex flex-row justify-center w-full lg:w-auto lg:flex-col gap-2 ">
          <div className="w-24 h-24 bg-gray-400 animate-pulse rounded-md"></div>
          <div className="w-24 h-24 bg-gray-400 animate-pulse rounded-md"></div>
        </div>
        <div className="right flex-1 flex my-3 lg:my-0 items-center flex-col mx-auto justify-center sm:gap-8 text-center sm:text-start sm:w-auto sm:flex-row">
          <div className="image w-[350px] bg-gray-400 h-[350px] rounded-md mb-3"></div>
          <div className="text space-y-3">
            <h2 className="w-36 animate-pulse h-3 rounded-md bg-gray-400"></h2>
            <h2 className="w-28 animate-pulse h-2 rounded-md bg-gray-400"></h2>
            <div className="flex gap-2 items-center justify-start sm:justify-start">
              <span className="bg-gray-400 animate-pulse w-12 rounded-md h-2"></span>
              <span className="bg-gray-400 animate-pulse w-12 rounded-md h-2"></span>
            </div>
            <div className="flex gap-2 items-center text-yellow-500 justify-center sm:justify-start ">
              <div className="bg-gray-400 w-8 h-8 rounded-full animate-pulse"></div>
              <div className="bg-gray-400 w-8 h-8 rounded-full animate-pulse"></div>
              <div className="bg-gray-400 w-8 h-8 rounded-full animate-pulse"></div>
              <div className="bg-gray-400 w-8 h-8 rounded-full animate-pulse"></div>
              <div className="bg-gray-400 w-8 h-8 rounded-md animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 rounded-md h-12 bg-gray-400 animate-pulse"></div>
              <div className="w-12 rounded-md h-12 bg-gray-400 animate-pulse"></div>
            </div>
            <div className="my-3 bg-gray-400 animate-pulse w-32 h-9 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSingleProduct;
