import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Components/UI/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loginschema } from "../Validation/Index";
import { INPUT_LOGIN } from "../data/Index";
import ErrorComponent from "../Components/UI/Error/Index";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../config/Index";
import toast from "react-hot-toast";
import { IError } from "../interfaces/Index";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { OpenAction } from "../Store/Welcome/WelcomeAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/Store";
import Welcome from "../Components/UI/Welcome";

interface Inputs {
  identifier: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { open } = useSelector((state: RootState) => state.open);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.title = "Login";
  }, []);

  // React Hook From

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(Loginschema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (userLogin) => {
    setIsLoading(true);
    try {
      const { data, status } = await AxiosInstance.post(
        "/auth/local",
        userLogin
      );

      if (status === 200) {
        toast.success("You Have Been Login Success", {
          duration: 1500,
          position: "top-right",
        });
        window.localStorage.setItem("userInfo", JSON.stringify(data));
        setTimeout(() => {
          dispatch(OpenAction());
        }, 1000);
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);
      }
    } catch (error) {
      const TheError = error as AxiosError<IError>;
      toast.error(`${TheError.response?.data.error.message}`, {
        duration: 1500,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // End React Hook Form

  // Looping Data

  const INPUT = INPUT_LOGIN.map((item, indx) => (
    <div
      className="mb-3 w-[90%] lg:w-[80%] mx-auto overflow-hidden"
      key={item.name}
    >
      <motion.label
        htmlFor={item.label}
        className="font-medium text-gray-400 block mb-2 capitalize cursor-pointer"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.5 * indx }}
      >
        {item.label}
      </motion.label>
      <motion.input
        type={item.type}
        id={item.label}
        {...register(item.name)}
        autoComplete="off"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 * indx }}
        className="font-medium w-[100%] p-3 border border-black/20 rounded-md outline-none focus:ring-2 focus:ring-inset transition "
      />
      {errors[item.name]?.message && (
        <ErrorComponent msg={`${errors[item.name]?.message}`} />
      )}
    </div>
  ));

  return (
    <div className="flex h-screen relative flex-col lg:flex-row justify-between gap-3 ">
      <form
        className="flex  flex-col flex-1 w-[100%] lg:w-[50%] items-center relative justify-center order-2 lg:order-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {INPUT}
        <Button
          isLoading={isLoading}
          type="submit"
          className="bg-indigo-600 w-[90%] lg:w-[80%] hover:bg-indigo-400 active:scale-95 text-lg tracking-wider"
        >
          Login
        </Button>
        <motion.h3
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="my-3 font-medium text-gray-400 text-center"
        >
          I Don't Have An Account Yet ?{" "}
          <Link
            to={"/register"}
            className="text-indigo-600 hover:text-indigo-400 transition"
          >
            Sign Up
          </Link>
        </motion.h3>
      </form>
      <div className="w-[100%] lg:w-[50%] order-1 h-[600px] lg:h-full bg-[#f1f5f9] relative lg:order-2 flex justify-center overflow-hidden">
        <motion.img
          initial={{ width: "300px", scale: 0 }}
          animate={{ width: "500px", scale: 1 }}
          transition={{ duration: 0.3 }}
          src="/sign/login-2.png"
          alt=""
          className="w-[500px] pointer-events-none h-[350px] lg:h-[600px] object-contain absolute  right-0"
          draggable={false}
        />
        <motion.img
          initial={{ width: "1000px", scale: 1.8, opacity: 0 }}
          animate={{ width: "500px", scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          src="/sign/login-1.png"
          alt=""
          className="w-[500px] h-[350px] lg:h-[600px] pointer-events-none rotate-item object-contain absolute left-50% translate-x-[-50%] lg:left-0"
          draggable={false}
        />
        <motion.img
          initial={{ width: "0px", bottom: "-400px", opacity: 0 }}
          animate={{ width: "250px", bottom: "-40px", opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          src="/sign/login-3.png"
          alt=""
          className="w-[250px] h-[350px] lg:h-[350px] pointer-events-none rotate-item object-contain absolute bottom-0 right-0"
          draggable={false}
        />
      </div>
      <Welcome open={open} />
    </div>
  );
};

export default Login;
