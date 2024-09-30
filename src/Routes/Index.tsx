import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Product from "../Pages/Product";
import { ProductedRoutes } from "../Auth/Index";
import { Data_Parsing } from "../Services/Index";
import Category from "../Pages/Category";
import SinglePageProduct from "../Pages/SinglePageProduct";
import Cart from "../Pages/Cart";
import ErrorPage from "../Pages/ErrorPage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import WishList from "../Pages/WishList";
import CheckOut from "../Pages/CheckOut";
import Orders from "../Pages/Orders";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        index
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <Home />
          </ProductedRoutes>
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="products"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <Product />
          </ProductedRoutes>
        }
      />
      <Route
        path="contact"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <Contact />
          </ProductedRoutes>
        }
      />
      <Route
        path="order"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <Orders />
          </ProductedRoutes>
        }
      />
      <Route
        path="checkout"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <CheckOut />
          </ProductedRoutes>
        }
      />
      <Route
        path="wishlist"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <WishList />
          </ProductedRoutes>
        }
      />
      <Route
        path="about"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <About />
          </ProductedRoutes>
        }
      />
      <Route
        path="cart"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <Cart />
          </ProductedRoutes>
        }
      />
      <Route
        path="products/:NAME/:ID"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <SinglePageProduct />
          </ProductedRoutes>
        }
      />
      <Route
        path="category"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <Category />
          </ProductedRoutes>
        }
      />
      <Route
        path="category/:NAME"
        element={
          <ProductedRoutes isAllow={Data_Parsing?.jwt} where="/login">
            <Category />
          </ProductedRoutes>
        }
      />
      <Route
        path="login"
        element={
          <ProductedRoutes isAllow={!Data_Parsing?.jwt} where="/">
            <Login />
          </ProductedRoutes>
        }
      />
      <Route
        path="register"
        element={
          <ProductedRoutes isAllow={!Data_Parsing?.jwt} where="/">
            <Register />
          </ProductedRoutes>
        }
      />
    </Route>
  )
);
