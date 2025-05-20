import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { DropDownMenu } from "./DropDownMenu";
import { useAppSelector } from "@/hooks/useAppSelector";

export function RestaurantHeader() {
  const { user } = useAppSelector(state => state.auth);
  return (
    <div className="flex w-full justify-between">
      <div></div>
      <div className="flex gap-4">
        <Link to={`/restaurant-dishes/${user?.id}`}>
          <DefaultButton className="rounded-2xl text-xs">PRATOS</DefaultButton>
        </Link>
        <Link to="/about">
          <DefaultButton className="rounded-2xl text-xs">SOBRE</DefaultButton>
        </Link>
      </div>
      <DropDownMenu />
    </div>
  );
}
