import { Link, useLocation } from "react-router-dom";
import { DropDownMenu } from "./DropDownMenu";
import logo from "@/assets/logo.png"
import { Button } from "./ui/button";
import { logout } from "@/store/slices/authSlice/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { LogOutIcon, UserRound } from "lucide-react";

export function DefaultHeader() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  return (
    <div className="flex w-full justify-between items-center  bg-[var(--color-background)]">
      <div className="w-full h-25  flex items-center gap-4 bg-[var(--color-background)]" >
        <img src={logo} alt="Logo" className="ml-8" />
        <h1 className="font-bold text-[#A38C6D] text-xl hover:cursor-default"><span className="text-[var(--text-primary)]">CONCURSO</span> <span className="text-[var(--color-primary)]">GASTRONÔMICO</span></h1>
      </div>
      <div className="flex gap-7 items-center mr-8">
        <Link to="/dishes" className={`hover:text-[var(--color-primary)] hover:cursor-pointer transition ${location.pathname === "/dishes" ? "text-[var(--color-primary)] border-b-4 border-[var(--color-primary)]" : ""}`}>
          PRATOS
        </Link>
        <Link className={`hover:text-[var(--color-primary)] hover:cursor-pointer transition ${location.pathname === "/restaurants" ? "text-[var(--color-primary)] border border-b-4 border-[var(--color-primary)]" : ""}`} to="">
          RESTAURANTES
        </Link>
        <Link className={`hover:text-[var(--color-primary)] hover:cursor-pointer transition ${location.pathname === "/about" ? "text-[var(--color-primary)] border-b-4 border-[var(--color-primary)]" : ""}`} to="/about">
          SOBRE
        </Link>
        <DropDownMenu />
      </div>
      <div className="flex gap-2 justify-center items-center">
        <UserRound className="bg-[var(--color-primary)] rounded-full text-[var(--text-primary)] w-8 h-8 p-1 hover:cursor-pointer hover:text-[var(--color-background)] transition" />
        <Button className="mr-8 hover:cursor-pointer" size="sm" variant="warn" onClick={() => dispatch(logout())}><LogOutIcon />Sair</Button>
      </div>
    </div>
  );
}
