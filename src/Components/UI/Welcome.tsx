import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../../../public/animation/loading.json";

const Welcome = ({open}: {open: boolean}) => {

  console.log(open)


  return (
    <div className={`fixed top-0 ${open ? "left-0" : "left-[100%]"} transition-all duration-300 z-50 bg-[#f1f5f9] left-0 w-full h-screen flex items-center justify-center flex-col gap-2`}>
      <Player src={Animation} autoplay loop style={{width: "300px"}} />
      <h2 className="text-gray-800 font-bold text-2xl">Welcome, At Exclusive E-commerce</h2>
    </div>
  );
};

export default Welcome;
