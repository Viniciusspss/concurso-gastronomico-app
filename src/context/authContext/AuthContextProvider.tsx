import { mockClients, mockRestaurants } from "@/data/users";
import { UserType } from "@/types/user/user";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export type LoginResponse = {
  success: boolean;
  message: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType | null>(() => {
    const storageUser = localStorage.getItem("authUser");
    if (!storageUser) return null;

    const parsedStorageUser = JSON.parse(storageUser) as UserType;
    return parsedStorageUser;
  });

  useEffect(() => {
    if (!localStorage.getItem("clients")) {
      localStorage.setItem("clients", JSON.stringify(mockClients));
    }
    if (!localStorage.getItem("restaurants")) {
      localStorage.setItem("restaurants", JSON.stringify(mockRestaurants));
    }
  }, []);

  function loginClient(email: string, password: string): LoginResponse {
    const client = mockClients.find(
      (c) => c.email === email && c.password === password,
    );
    if (client) {
      setUser(client);
      localStorage.setItem("authUser", JSON.stringify(client));
      return { success: true, message: "Usuário logado com sucesso" };
    }
    return { success: false, message: "Email ou senha inválido" };
  }

  function loginRestaurant(cnpj: string, password: string): LoginResponse {
    const restaurant = mockRestaurants.find(
      (c) => c.cnpj === cnpj && c.password === password,
    );
    if (restaurant) {
      setUser(restaurant);
      localStorage.setItem("authUser", JSON.stringify(restaurant));
      return { success: true, message: "Restaurante logado com sucesso" };
    }
    return { success: false, message: "Cnpj ou senha inválido" };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("authUser");
  }

  return (
    <AuthContext.Provider
      value={{ user, loginClient, loginRestaurant, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
