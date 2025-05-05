import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function EvaluateDishForm() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-amber-50">
      <h1 className="mb-10 text-2xl">AVALIAR PRATO</h1>
      <div className="flex w-full flex-col gap-4">
        <Label htmlFor="dish">Prato:</Label>
        <select
          id="dish"
          className="flex min-h-10 min-w-60 bg-amber-50 text-black"
          defaultValue=""
        >
          <option value="" disabled>
            Selecione
          </option>
        </select>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Label htmlFor="dishNumber">Nº do pedido:</Label>
        <Input
          id="dishNumber"
          placeholder="Digite o número do pedido"
          className="bg-amber-50"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="evaluate">Avaliação:</Label>
        <textarea
          id="evaluate"
          rows={4}
          cols={50}
          placeholder="Digite sua avaliação aqui..."
          className="rounded-2xl bg-amber-50 px-4 py-4 text-black"
        ></textarea>
      </div>

      <div className="flex gap-4">
        <DefaultButton className="px-17 text-xs">AVALIAR</DefaultButton>
        <Link to="/Dishes">
          <DefaultButton className="px-17 text-xs">FECHAR</DefaultButton>
        </Link>
      </div>
    </div>
  );
}
