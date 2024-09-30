import { useEffect } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "Oh! Sorry";
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <img src="/Error.svg" className="w-[350px] h-[350px] opacity-50" alt="" />
      <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
      <span className="text-gray-400 mt-3">Back To <Link to={"/"} className="text-indigo-600 hover:text-indigo-400 text-lg font-bold transition">Home</Link> </span>
    </div>
  );
};

export default ErrorPage;
