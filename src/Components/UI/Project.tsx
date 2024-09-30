import { BadgeDollarSign, Gem, PanelsTopLeft, Store } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import MainTitle from "./MainTitle";

const Project = () => {
  const [enterSection, setEnterSection] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      if (window.scrollY >= ref.current?.offsetTop! - 300) {
        setEnterSection(true);
      }
    });
  });

  return (
    <div ref={ref}>
      <MainTitle text="Our Info" />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-white span select-none span h-[150px] flex items-center flex-col justify-center rounded-md hover:text-white hover:bg-rose-500 transition-all border">
          <span className="span-increased">
            <Store size={35} />
          </span>
          <h2 className="font-bold text-3xl">
            {enterSection ? (
              <CountUp start={0} end={10.5} duration={2} delay={0} />
            ) : (
              0
            )}
            K
          </h2>
          <p className="text-gray-400 capitalize text-[15px]">
            Sallers active our site
          </p>
        </div>
        <div className="bg-white span h-[150px] select-none flex items-center flex-col justify-center rounded-md hover:text-white hover:bg-rose-500 transition-all border">
          <span className="span-increased">
            <BadgeDollarSign size={35} />
          </span>
          <h2 className="font-bold text-3xl">
            {enterSection ? (
              <CountUp start={0} end={33} duration={2} delay={0} />
            ) : (
              0
            )}
            K
          </h2>
          <p className="text-gray-400 capitalize text-[15px]">
            Mopnthly Produduct Sale
          </p>
        </div>
        <div className="bg-white span h-[150px] flex items-center select-none flex-col justify-center rounded-md hover:text-white hover:bg-rose-500 transition-all border">
          <span className="span-increased">
            <PanelsTopLeft size={35} />
          </span>
          <h2 className="font-bold text-3xl">
            {enterSection ? (
              <CountUp start={0} end={45.5} duration={2} delay={0} />
            ) : (
              0
            )}
            K
          </h2>
          <p className="text-gray-400 capitalize text-[15px]">Customer active in our site</p>
        </div>
        <div className="bg-white span h-[150px] flex items-center flex-col select-none justify-center rounded-md hover:text-white hover:bg-rose-500 transition-all border">
          <span className="span-increased">
            <Gem size={35} />
          </span>
          <h2 className="font-bold text-3xl">
            {enterSection ? (
              <CountUp start={0} end={25} duration={2} delay={0} />
            ) : (
              0
            )}
            K
          </h2>
          <p className="text-gray-400 capitalize text-[15px]">Anual gross sale in our site</p>
        </div>
      </div>
    </div>
  );
};

export default Project;
