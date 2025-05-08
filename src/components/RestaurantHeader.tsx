import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import userImage from "@/assets/userImage.png";
import { useAuthContext } from "@/context/authContext/useAuthContext";

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
      <Link to="/Profile">
        <img className="h-6 w-6" src={userImage} alt="Perfil do usuário" />
      </Link>
    </div>
  );
}
