import { UserType } from "@/types/user/user";
import { createContext } from "react";
import {
  LoginResponseClient,
  LoginResponseRestaurant,
} from "./AuthContextProvider";

type AuthContextProps = {
  user: UserType | null;
  loginClient: (email: string, password: string) => LoginResponseClient;
  loginRestaurant: (cnpj: string, password: string) => LoginResponseRestaurant;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
