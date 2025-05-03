import { useAuthContext } from "@/context/authContext/useAuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
  type: "client" | "restaurant";
};

export function PrivateRoute({ children, type }: PrivateRouteProps) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (type === "client" && !("email" in user)) {
    return <Navigate to="/" />;
  }

  if (type === "restaurant" && !("cnpj" in user)) {
    return <Navigate to="/" />;
  }

  return { children };
}
