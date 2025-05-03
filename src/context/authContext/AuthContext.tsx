import { UserType } from "@/types/user/user";
import { createContext } from "react";
import { LoginResponse } from "./AuthContextProvider";

type AuthContextProps = {
  user: UserType | null;
  loginClient: (email: string, password: string) => LoginResponse;
  loginRestaurant: (cnpj: string, password: string) => LoginResponse;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
