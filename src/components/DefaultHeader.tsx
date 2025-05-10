import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import userImage from "@/assets/userImage.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useAuthContext } from "@/context/authContext/useAuthContext";

export function DefaultHeader() {
  const { logout } = useAuthContext();
  return (
    <div className="flex w-full justify-between">
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

      <DropdownMenu>
        <DropdownMenuTrigger>
          <img className="h-6 w-6" src={userImage} alt="Perfil do usuário" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#353535] text-amber-50">
          <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/Profile">
            <DropdownMenuItem>Editar perfil</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <button
              className="flex items-center gap-2"
              onClick={() => logout()}
            >
              Sair <LogOutIcon className="text-red-500" />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
