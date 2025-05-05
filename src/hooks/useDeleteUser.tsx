import { useAuthContext } from "@/context/authContext/useAuthContext";
import { UserType } from "@/types/user/user";
import { useNavigate } from "react-router-dom";

export function useDeleteUser() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  function deleteUser(cb?: () => void) {
    const dataUsers = localStorage.getItem("clients");
    const dataRestaurants = localStorage.getItem("restaurants");

    const storageClients: UserType[] = dataUsers ? JSON.parse(dataUsers) : [];
    const storageRestaurants: UserType[] = dataRestaurants
      ? JSON.parse(dataRestaurants)
      : [];

    if (user && "email" in user) {
      const clients = storageClients.filter((c) => c.id !== user.id);
      localStorage.setItem("clients", JSON.stringify(clients));
    }

    const restaurants =
      user && storageRestaurants.filter((r) => r.id !== user.id);
    localStorage.setItem("restaurants", JSON.stringify(restaurants));

    localStorage.removeItem("authUser");
    if (cb) cb();
    navigate("/");
  }

  return { deleteUser };
}
