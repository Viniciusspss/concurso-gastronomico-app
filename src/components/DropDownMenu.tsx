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
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice/authSlice";

export function DropDownMenu() {

  const dispatch = useDispatch()

  return (
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
          <button className="flex items-center gap-2" onClick={() => dispatch(logout())}>
            Sair <LogOutIcon className="text-red-500" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
