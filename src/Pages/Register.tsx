import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Components/UI/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Registerschema } from "../Validation/Index";
import { INPUT_REGISTER } from "../data/Index";
import ErrorComponent from "../Components/UI/Error/Index";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../config/Index";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IError } from "../interfaces/Index";
import { motion } from "framer-motion";

interface Inputs {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  // ! State
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const naviagte = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  // React Hook From

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(Registerschema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (userRegister) => {
    setIsLoading(true);

    try {
      const { status } = await AxiosInstance.post(
        "/auth/local/register",
        userRegister
      );

      if (status === 200) {
        toast.success("Success You Have Created An Account", {
          duration: 1500,
          position: "top-right",
        });
        setTimeout(() => {
          naviagte("/login");
        }, 1500);
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

  const INPUT = INPUT_REGISTER.map((item, indx) => (
    <div
      className="mb-3 w-[90%] lg:w-[80%] mx-auto overflow-hidden"
      key={item.name}
    >
      <motion.label
        htmlFor={item.label}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.5 * indx }}
        className="font-medium text-gray-400 block mb-2 capitalize cursor-pointer"
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
    <div className="flex h-screen flex-col lg:flex-row justify-between ">
      <div className="w-[100%] lg:w-[50%] relative h-[800px] lg:h-[100%] overflow-hidden">
        <div className="flex items-center justify-center w-full h-full z-20 bg-[#f1f5f9]">
          <motion.img
            initial={{ scale: 0, opacity: 0, translateY: "-50%" }}
            animate={{ scale: 1, opacity: 1, translateY: "-50%" }}
            transition={{ duration: 0.5 }}
            src="/sign/cart.png"
            className="absolute top-[50%]"
            alt=""
          />
          <motion.img
            initial={{ rotate: -180, opacity: 0, x: -50, translateY: "-50%" }}
            animate={{ rotate: 360, opacity: 1, x: 0, translateY: "-50%" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            src="/sign/phone.png"
            className="absolute top-[50%] w-[250px] right-0  h-[250px] sm:w-[300px] sm:h-[300px] sm:right-[22%]  xl:right-0 lg:right-0 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]"
            alt=""
          />
          <motion.img
            initial={{ bottom: "-100%", opacity: 0 }}
            animate={{ bottom: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            src="/sign/bag.png"
            className="absolute bottom-0 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] object-contain left-0 lg:left-16"
          />
        </div>
      </div>
      <div className="flex  flex-col flex-1 items-center justify-center relative">
        <form
          className=" w-[100%] lg:w-[90%]  relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          {INPUT}
          <Button
            isLoading={isLoading}
            type="submit"
            className="bg-indigo-600 w-[90%] lg:w-[80%] mx-auto hover:bg-indigo-400 active:scale-95 text-lg tracking-wider"
          >
            Create Account
          </Button>
          <motion.h3
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="my-3 font-medium text-gray-400 text-center"
          >
            Already have account? ?{" "}
            <Link
              to={"/login"}
              className="text-indigo-600 hover:text-indigo-400 transition"
            >
              Sign In
            </Link>
          </motion.h3>
        </form>
      </div>
    </div>
  );
};

export default Register;
