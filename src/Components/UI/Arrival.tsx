import MainTitle from "./MainTitle";

const Arrival = () => {
  return (
    <div className="relative overflow-hidden pb-4">
      <div className="tringle-left"></div>
      <div className="container mx-auto">
        <MainTitle text="New Arrival" />

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full overflow-hidden gap-2">
          <div className="w-full relative bg-black flex justify-center rounded-md">
            <img src="/feature/play.png" className="w-[450px] h-full" alt="" />
            <div className="text  absolute bottom-5 left-5 ">
              <h2 className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-black">
                PlayStation 5
              </h2>
              <p className="text-[17px] text-gray-300 my-2 max-w-[350px] capitalize">
                Black and White version of the PS5 coming out on sale.
              </p>
              <span className=" text-white ">Shop Now</span>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full relative">
              <img
                src="/feature/women.png"
                className="w-full h-[250px] object-cover rounded-md"
                alt=""
              />
              <div className="text  absolute bottom-5 left-5 ">
                <h2 className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-black">
                  Women’s Collections{" "}
                </h2>
                <p className="text-[17px] text-gray-300 my-2 max-w-[250px] capitalize">
                  Featured woman collections that give you another vibe.{" "}
                </p>
                <span className=" text-white ">Shop Now</span>
              </div>
            </div>
            <div className="flex justify-between gap-2 flex-col lg:flex-row mt-2">
              <div className="bg-black w-full p-2 rounded-md relative">
                <img
                  src="feature/sub.png"
                  className="w-full h-[200px] object-contain"
                  alt=""
                />
                <div className="text  absolute bottom-5 left-5 ">
                  <h2 className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-black">
                    Speakers
                  </h2>
                  <p className="text-[17px] text-gray-300 my-2 capitalize">
                    Amazon wireless speakers{" "}
                  </p>
                  <span className=" text-white ">Shop Now</span>
                </div>
              </div>
              <div className="bg-black w-full rounded-md relative flex items-center justify-center">
                <img
                  src="feature/perfum.png"
                  className="w-full h-[200px] object-contain"
                  alt=""
                />
                <div className="text  absolute bottom-5 left-5 ">
                  <h2 className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-black">
                    Perfume{" "}
                  </h2>
                  <p className="text-[17px] text-gray-300 my-2 capitalize">
                    
                    Gucci Intense Oud Edp
                  </p>
                  <span className=" text-white ">Shop Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arrival;
