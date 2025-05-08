import { useContext } from "react";
import { DishContext } from "./DishContext";

export function useAuthContext() {
  return useContext(DishContext);
}
