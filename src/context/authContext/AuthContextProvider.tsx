import { mockClients, mockRestaurants } from "@/data/users";
import { UserType } from "@/types/user/user";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ClientType } from "@/types/user/client";
import { RestaurantType } from "@/types/user/restaurant";

export type LoginResponseClient = {
  success: boolean;
  message: string;
  client?: ClientType;
};
export type LoginResponseRestaurant = {
  success: boolean;
  message: string;
  restaurant?: RestaurantType;
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

  function loginClient(email: string, password: string): LoginResponseClient {
    const clients = localStorage.getItem("clients");
    const clientsParsed: ClientType[] = clients ? JSON.parse(clients) : [];

    const client = clientsParsed.find(
      (c) => c.email === email && c.password === password,
    );

    if (client) {
      setUser(client);
      localStorage.setItem("authUser", JSON.stringify(client));
      return { success: true, message: "Usuário logado com sucesso", client };
    }
    return { success: false, message: "Email ou senha inválido" };
  }

  function registerClient(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): LoginResponseClient {
    const id = "2";
    const client: ClientType = { email, password, firstName, lastName, id };
    const clients = localStorage.getItem("clients");
    const clientsParsed: ClientType[] = clients ? JSON.parse(clients) : [];

    clientsParsed.push(client);
    return { success: true, message: "Usuário registrado com sucesso", client };
  }

  function loginRestaurant(
    cnpj: string,
    password: string,
  ): LoginResponseRestaurant {
    const restaurants = localStorage.getItem("restaurants");
    const restaurantsParsed: RestaurantType[] = restaurants
      ? JSON.parse(restaurants)
      : [];

    const restaurant = restaurantsParsed.find(
      (c) => c.cnpj === cnpj && c.password === password,
    );
    if (restaurant) {
      setUser(restaurant);
      localStorage.setItem("authUser", JSON.stringify(restaurant));
      return {
        success: true,
        message: "Restaurante logado com sucesso",
        restaurant,
      };
    }
    return { success: false, message: "Cnpj ou senha inválido" };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("authUser");
  }

  return (
    <AuthContext.Provider
      value={{ user, loginClient, loginRestaurant, logout, registerClient }}
    >
      {children}
    </AuthContext.Provider>
  );
}
