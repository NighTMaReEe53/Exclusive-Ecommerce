import { Outlet } from "react-router-dom";
import Header from "../Components/UI/HEADER/Index";
import Footer from "../Components/UI/Footer/Index";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
