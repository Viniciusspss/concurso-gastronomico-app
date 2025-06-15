import { Outlet } from "react-router-dom";
import logo from "../../assets/logoWhite.png";
import bgImage from "@/assets/backgroundImage.png"

export function AuthLayout() {
  return (
    <div className="flex relative min-h-screen w-full items-center">
      <img src={bgImage} alt="Imagem de fundo" className="hidden absolute sm:block w-full h-full z-[-1] object-cover" />
      <div className="z-10 hidden sm:items-center sm:flex sm:w-3/5 sm:gap-10 sm:ml-20">
        <img src={logo} alt="Logo" />
        <div className="flex flex-col">
          <span className="text-xl sm:text-4xl text-[var(--color-background)] font-bold">CONCURSO</span>
          <span className="text-xl sm:text-4xl text-[var(--color-primary)] font-bold">GASTRONÔMICO</span>
        </div>
      </div>
      <div className="flex min-h-screen w-full sm:w-2/5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
