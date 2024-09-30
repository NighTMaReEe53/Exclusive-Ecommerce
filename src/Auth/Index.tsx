import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProducted {
  children: ReactNode;
  isAllow: boolean;
  where: string;
}

export const ProductedRoutes = ({ children, isAllow, where }: IProducted) => {
  if (!isAllow) return <Navigate to={where} replace />;

  return children;
};
