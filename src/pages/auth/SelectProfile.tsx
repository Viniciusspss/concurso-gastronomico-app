import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bgImage from "@/assets/backgroundImage.png";
import logoImage from "@/assets/logoYellow.png";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/slices/authSlice/authSlice";

export function SelectProfile() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[var(--color-background)]">
      <div className="flex h-25 w-full items-center bg-[var(--color-background)] sm:gap-4">
        <img src={logo} alt="Logo" className="sm:ml-8" />
        <h1 className="text-sm sm:text-2xl font-bold text-[#A38C6D]">
          <span className="text-[var(--text-primary)]">CONCURSO</span>{" "}
          <span className="text-[var(--color-primary)]">GASTRONÔMICO</span>
        </h1>
      </div>
      <div className="relative z-1 flex h-full w-full flex-col items-center justify-center gap-4">
        <img
          src={bgImage}
          alt="Imagem de fundo da tela inicial"
          className="absolute z-[-1] h-full w-full object-cover"
        />
        <img src={logoImage} alt="Logo central" />
        <h1 className="mb-4 text-2xl font-medium">
          <span className="text-2xl font-bold text-[var(--color-background)] sm:text-4xl">
            CONCURSO
          </span>
          <span className="text-2xl font-bold text-[var(--color-primary)] sm:text-4xl">
            {" "}
            GASTRONÔMICO
          </span>
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="default" asChild>
            <Link to="/sign-in/User">Entrar como cliente</Link>
          </Button>
          <Button size="lg" variant="muted" asChild>
            <Link to="/sign-in/Restaurant">Entrar como restaurante</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
