import { mockClients, mockRestaurants } from "@/data/users";
import { UserType } from "@/types/user/user";
import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

export type LoginResponse = {
  sucess: boolean;
  message: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);

  function loginClient(email: string, password: string): LoginResponse {
    const client = mockClients.find(
      (c) => c.email === email && c.password === password,
    );
    if (client) {
      setUser(client);
      return { sucess: true, message: "Usuário logado com sucesso" };
    }
    return { sucess: false, message: "Email ou senha inválido" };
  }

  function loginRestaurant(cnpj: string, password: string): LoginResponse {
    const restaurant = mockRestaurants.find(
      (c) => c.cnpj === cnpj && c.password === password,
    );
    if (restaurant) {
      setUser(restaurant);
      return { sucess: true, message: "Restaurante logado com sucesso" };
    }
    return { sucess: false, message: "Cnpj ou senha inválido" };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loginClient, loginRestaurant, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
