import { useEffect, useState } from "react";
import Button from "../Button";

const DateWeNeed = new Date("31 DEC, 2024 23:59:59").getTime();

const theTimer = () => {
  const DateDifference = DateWeNeed - new Date().getTime();

  let day: string | number = Math.floor(DateDifference / (1000 * 60 * 60 * 24));

  day = day < 10 ? `0${day}` : day;

  let hours: string | number = Math.floor(
    (DateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  hours = hours < 10 ? `0${hours}` : hours;

  let minutes: string | number = Math.floor(
    (DateDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds: string | number = Math.floor(
    (DateDifference % (1000 * 60)) / 1000
  );
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return { day, hours, minutes, seconds };
};

const Timer = () => {
  const [timerOut, setTime] = useState(() => theTimer());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(theTimer());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="mt-5">
      <div className="container mx-auto">
        <div className="flex items-center flex-col lg:flex-row justify-between bg-black p-4 rounded-md">
          <div className="text w-[100%] lg:w-[50%] space-y-5 text-center md:text-start">
            <span className="text-indigo-600 font-medium text-lg">
              Event`s <span className="text-white">Comming</span>
            </span>
            <h2 className="text-lg md:text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white my-4 leading-[1.2] to-black font-bold">
              Enhance Your Music Experience
            </h2>
            <div className="text-white mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <span className="day flex flex-col justify-center text-center font-medium text-lg border-b pb-3 md:pb-0 md:border-r md:border-b-0 border-white/20 pr-3 text-transparent bg-clip-text bg-gradient-to-r from-black to-white">
                {timerOut.day} <span>Day`s</span>
              </span>
              <span className="day flex flex-col justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-black font-medium text-lg border-b pb-3 md:pb-0 lg:border-r md:border-b-0 border-white/20 pr-3">
                {timerOut.hours} <span>Hour`s</span>
              </span>
              <span className="day flex flex-col justify-center text-center font-medium text-lg border-b pb-3 md:pb-0 md:border-r md:border-b-0 border-white/20 pr-3 text-transparent bg-clip-text bg-gradient-to-r from-black to-white">
                {timerOut.minutes} <span>Minute`s</span>
              </span>
              <span className="day flex flex-col justify-center text-center font-medium text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-black">
                {timerOut.seconds} <span>Second`s</span>
              </span>
            </div>
            <Button className="bg-indigo-600 px-8 hover:bg-indigo-400 hover:cursor-not-allowed w-full lg:w-fit">
              Comming Soon
            </Button>
          </div>
          <div className="image w-[100%] lg:w-[50%] relative before:absolute z-10 before:w-80 before:rounded-full before:-z-10 before:h-80 before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] before:bg-white before:filter before:blur-[150px]">
            <img
              src="/timer/SubBigger.png"
              className="w-[300px] md:w-[350px] lg:w-[100%] h-[200px] md:h-[250px] lg:h-[300px] m-auto xl:h-[350px] object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
