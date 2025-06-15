import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { logout } from "@/store/slices/authSlice/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { LogOutIcon, MenuIcon, UserRound, XIcon } from "lucide-react";
import { useState } from "react";

export function DefaultHeader() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="flex w-full items-center justify-between bg-[var(--color-background)] fixed z-50 sm:relative">
        <div className="flex h-20 sm:h-25 w-full items-center gap-2 sm:gap-4 bg-[var(--color-background)]">
          <img src={logo} alt="Logo" className="ml-4 sm:ml-8 h-10 sm:h-15" />
          <h1 className="text-sm sm:text-xl font-bold text-[#A38C6D] hover:cursor-default">
            <span className="text-[var(--text-primary)]">CONCURSO</span>{" "}
            <span className="text-[var(--color-primary)]">GASTRONÔMICO</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 px-4 sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[var(--color-primary)]"
          >
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        <nav className="hidden sm:flex mr-8 items-center gap-7">
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
        </nav>

      </header>

      {isOpen && (
        <div className="fixed top-20 right-0 min-h-screen bg-[var(--color-background)] z-40 shadow-2xl sm:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link
              to="/dishes"
              className="text-sm py-2 border-b border-gray-200"
              onClick={() => setIsOpen(false)}
            >
              PRATOS
            </Link>
            <Link
              to="/restaurants"
              className="text-sm py-2 border-b border-gray-200"
              onClick={() => setIsOpen(false)}
            >
              RESTAURANTES
            </Link>
            <Link
              to="/about"
              className="text-sm py-2 border-b border-gray-200"
              onClick={() => setIsOpen(false)}
            >
              SOBRE
            </Link>
            <div className="flex items-center justify-between pt-2">
              <Link to="/edit-profile" onClick={() => setIsOpen(false)}>
                <UserRound className="h-7 w-7 rounded-full bg-[var(--color-primary)] p-1 text-[var(--text-primary)]" />
              </Link>
              <Button
                size="sm"
                variant="warn"
                onClick={() => {
                  setIsOpen(false);
                  dispatch(logout());
                }}
              >
                <LogOutIcon className="mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
