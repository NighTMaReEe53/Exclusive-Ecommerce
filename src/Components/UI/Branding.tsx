import MainTitle from "./MainTitle";

const Branding = () => {
  return (
    <div className="container mx-auto">
      <MainTitle text="Our Client`s" />

      <div className="wrapper">
        <div className="item item1 border rounded-md">
          <img src="/branding/brand-1.png" alt="" />
        </div>
        <div className="item item2 border rounded-md">
          <img src="/branding/brand-2.png" alt="" />
        </div>
        <div className="item item3 border rounded-md">
          <img src="/branding/brand-3.png" alt="" />
        </div>
        <div className="item item4 border rounded-md">
          <img src="/branding/brand-4.png" alt="" />
        </div>
        <div className="item item5 border rounded-md">
          <img src="/branding/brand-5.png" alt="" />
        </div>
        <div className="item item6 border rounded-md">
          <img src="/branding/brand-6.png" alt="" />
        </div>
        <div className="item item7 border rounded-md">
          <img src="/branding/brand-4.png" alt="" />
        </div>
        <div className="item item8 border rounded-md">
          <img src="/branding/brand-5.png" alt="" />
        </div>
        <div className="item item9 border rounded-md">
          <img src="/branding/brand-6.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Branding;
