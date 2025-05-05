import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import userImage from "@/assets/userImage.png";

export function DefaultHeader() {
  return (
    <div className="flex justify-between">
      <div></div>
      <div className="flex gap-4">
        <Link to="/dishes">
          <DefaultButton className="rounded-2xl text-xs">PRATOS</DefaultButton>
        </Link>
        <DefaultButton className="rounded-2xl text-xs">
          RESTAURANTES
        </DefaultButton>
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
