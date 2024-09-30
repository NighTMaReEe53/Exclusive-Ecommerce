import { Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../Components/UI/Button";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../../public/animation/animated.json";
import Animation2 from "../../public/animation/animated2.json";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Message_schema } from "../Validation/Index";
import ErrorComponent from "../Components/UI/Error/Index";
import { AxiosInstance } from "../config/Index";
import { Data_Parsing } from "../Services/Index";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(Message_schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, message, phone } = data;

    setIsLoading(true);

    try {
      const { status } = await AxiosInstance.post(
        "/contacts",
        {
          data: {
            name,
            email,
            phone,
            message,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${Data_Parsing?.jwt}`,
          },
        }
      );

      if (status && status === 200) {
        toast.success("Thanks, Your Message Is Send", {
          duration: 500,
          position: "top-right",
        });
        setTimeout(() => {
          setIsShow(true);
        }, 300);
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  };

  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  return (
    <div className="py-4">
      <div className="container mx-auto">
        <div className="flex gap-2 text-[15px] sm:text-lg font-medium tracking-wide mb-3">
          <Link to={"/"} className="text-indigo-600 flex gap-2 items-center">
            <Home size={20} />
            Home
          </Link>
          <span className="pointer-events-none text-gray-400">/</span>
          <span className="text-gray-950">Contact</span>
        </div>
        <div className="flex items-center justify-between flex-col lg:flex-row gap-4">
          <div className="left w-[70%]">
            <Player
              src={Animation2}
              autoplay
              loop
            />
          </div>
          <div className="right bg-white shadow-sm p-4 rounded-md w-full">
            {isShow ? (
              <div className="flex flex-col items-center">
                <Player
                  src={Animation}
                  style={{ width: "300px", height: "300px" }}
                  autoplay
                  loop
                />
                <span className="text-gray-400 text-lg">Thank You...</span>
                <h2 className="text-gray-800 font-bold text-2xl flex gap-1">
                  Your Message Is Send{" "}
                  <span className="text-teal-500 items-center flex gap-1">
                    Successful <Heart />
                  </span>
                </h2>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3 mb-3">
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                    className="p-3 w-[100%] bg-white outline-none text-gray-800 font-medium border focus:ring-2 rounded-md"
                  />
                  {errors?.name?.message && (
                    <ErrorComponent
                      msg={`${errors?.name?.message}`}
                      className="mt-1"
                    />
                  )}
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Your Email"
                    {...register("email")}
                    className="p-3 w-[100%] bg-white outline-none text-gray-800 font-medium border focus:ring-2 rounded-md"
                  />
                  {errors?.email?.message && (
                    <ErrorComponent
                      msg={`${errors?.email?.message}`}
                      className="mt-1"
                    />
                  )}

                  <input
                    autoComplete="off"
                    type="number"
                    placeholder="Your Phone"
                    {...register("phone")}
                    className="p-3 w-[100%] bg-white outline-none text-gray-800 font-medium border focus:ring-2 rounded-md"
                  />
                  {errors?.phone?.message && (
                    <ErrorComponent
                      msg={`${errors?.phone?.message}`}
                      className="mt-1"
                    />
                  )}
                </div>
                <textarea
                  placeholder="Your Message"
                  {...register("message")}
                  className="bg-white p-3 font-medium resize-none outline-none focus:ring-2 rounded-md w-full h-[150px] border shadow-sm"
                ></textarea>
                {errors?.message?.message && (
                  <ErrorComponent
                    msg={`${errors?.message?.message}`}
                    className="mt-1"
                  />
                )}

                <Button
                  isLoading={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-400 flex ml-auto w-[100%] lg:w-fit font-medium"
                >
                  Send Message
                </Button>
                {/* Back To It */}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
