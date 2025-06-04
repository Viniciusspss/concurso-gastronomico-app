import { Link, useLocation } from "react-router-dom";
import { DropDownMenu } from "./DropDownMenu";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { logout } from "@/store/slices/authSlice/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { LogOutIcon, UserRound } from "lucide-react";

export function DefaultHeader() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  return (
    <div className="flex w-full items-center justify-between bg-[var(--color-background)]">
      <div className="flex h-25 w-full items-center gap-4 bg-[var(--color-background)]">
        <img src={logo} alt="Logo" className="ml-8" />
        <h1 className="text-xl font-bold text-[#A38C6D] hover:cursor-default">
          <span className="text-[var(--text-primary)]">CONCURSO</span>{" "}
          <span className="text-[var(--color-primary)]">GASTRONÔMICO</span>
        </h1>
      </div>
      <div className="mr-8 flex items-center gap-7">
        <Link
          to="/dishes"
          className={`transition hover:cursor-pointer hover:text-[var(--color-primary)] ${location.pathname === "/dishes" ? "border-b-4 border-[var(--color-primary)] text-[var(--color-primary)]" : ""}`}
        >
          PRATOS
        </Link>
        <Link
          className={`transition hover:cursor-pointer hover:text-[var(--color-primary)] ${location.pathname === "/restaurants" ? "border-b-4 border-[var(--color-primary)] text-[var(--color-primary)]" : ""}`}
          to="/restaurants"
        >
          RESTAURANTES
        </Link>
        <Link
          className={`transition hover:cursor-pointer hover:text-[var(--color-primary)] ${location.pathname === "/about" ? "border-b-4 border-[var(--color-primary)] text-[var(--color-primary)]" : ""}`}
          to="/about"
        >
          SOBRE
        </Link>
        <DropDownMenu />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link to="/edit-profile">
          <UserRound className="h-8 w-8 rounded-full bg-[var(--color-primary)] p-1 text-[var(--text-primary)] transition hover:cursor-pointer hover:text-[var(--color-background)]" />
        </Link>
        <Button
          className="mr-8 hover:cursor-pointer"
          size="sm"
          variant="warn"
          onClick={() => dispatch(logout())}
        >
          <LogOutIcon />
          Sair
        </Button>
      </div>
    </div>
  );
}
