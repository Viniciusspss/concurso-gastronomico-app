import { Outlet } from "react-router-dom";
import logo from "../../assets/logoWhite.png";
import bgImage from "@/assets/backgroundImage.png"

export function AuthLayout() {
  return (
    <div className="flex relative h-screen w-full items-center  ">
      <img src={bgImage} alt="Imagem de fundo" className="absolute w-full h-full z-[-1]" />
      <div className="z-10 w-3/5 gap-10 ml-20">
        <img src={logo} alt="Logo" />
        <div className="flex flex-col">
          <span className="text-4xl text-[var(--color-background)] font-bold">CONCURSO</span>
          <span className="text-4xl text-[var(--color-primary)] font-bold">GASTRONÔMICO</span>
        </div>
      </div>
      <div className="flex h-full w-2/5 ">
        <Outlet />
      </div>
    </div>
  );
}
