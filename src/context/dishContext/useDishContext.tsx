import { useContext } from "react";
import { DishContext } from "./DishContext";

export function useDishContext() {
  return useContext(DishContext);
}
