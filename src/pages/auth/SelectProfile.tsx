import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bgImage from "@/assets/backgroundImage.png"
import logoImage from "@/assets/logoYellow.png"
import logo from "../../assets/logo.png"

export function SelectProfile() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[var(--color-background)]">
      <div className="w-full h-25  flex items-center gap-4 bg-[var(--color-background)]" >
        <img src={logo} alt="Logo" className="ml-8" />
        <h1 className="font-bold text-[#A38C6D] text-xl"><span className="text-[var(--text-primary)]">CONCURSO</span> <span className="text-[var(--color-primary)]">GASTRONÔMICO</span></h1>
      </div>
      <div className="flex relative z-1 w-full h-full flex-col items-center justify-center gap-4">
        <img src={bgImage} alt="Imagem de fundo da tela inicial" className="absolute w-full h-full z-[-1]" />
        <img src={logoImage} alt="Logo central" className="" />
        <h1 className="mb-4 text-2xl font-medium">
          <span className="font-bold text-[var(--color-background)] text-4xl">CONCURSO</span><span className="font-bold text-[var(--color-primary)] text-4xl"> GASTRONÔMICO</span>
        </h1>
        <div className="flex  items-center justify-center gap-4">
          <Button size="lg" variant="default" asChild>
            <Link to="/SignIn/Restaurant">Entrar como cliente</Link>
          </Button>
          <Button size="lg" variant="muted" asChild>
            <Link to="/SignIn/User">Entrar como restaurante</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
