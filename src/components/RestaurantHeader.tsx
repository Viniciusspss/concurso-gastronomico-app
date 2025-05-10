import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { useAuthContext } from "@/context/authContext/useAuthContext";
import { DropDownMenu } from "./DropDownMenu";

export function RestaurantHeader() {
  const { user } = useAuthContext();
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
