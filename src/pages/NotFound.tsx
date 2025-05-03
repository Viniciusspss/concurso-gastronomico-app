import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#1E1E1E] text-amber-50">
      <h1 className="mb-4 text-4xl font-bold">Página não encontrada!</h1>
      <Link to="/" className="hover:text-zinc-400">
        Voltar para o início
      </Link>
    </div>
  );
}
