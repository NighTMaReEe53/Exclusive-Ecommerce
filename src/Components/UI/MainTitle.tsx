import { memo } from "react";

interface ICategory {
  text: string;
  className?: string;
}

const MainTitle = ({ text, className }: ICategory) => {
  return (
    <div className={`main-title my-3 flex gap-3 items-center ${className}`}>
      <span className="block w-3 h-10 bg-indigo-600 rounded-sm"></span>
      <h2 className="text-indigo-600 font-bold relative text-lg ">{text} </h2>
    </div>
  );
};

export default memo(MainTitle);
