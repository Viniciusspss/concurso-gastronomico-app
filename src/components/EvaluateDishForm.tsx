import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { Label } from "./ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import StarRating from "./StarRating";

export function EvaluateDishForm() {
  const { selectedDish } = useAppSelector(state => state.dishes)


  return (
    <div className="flex flex-col items-center justify-center gap-6 text-amber-50">
      <h1 className="mb-10 text-2xl">AVALIAR PRATO</h1>
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-3">
          <h2>Prato:</h2>
          <p>{selectedDish?.title}</p>
        </div>

      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="evaluate">Comentário:</Label>
        <textarea
          id="evaluate"
          rows={4}
          cols={50}
          placeholder="Digite sua avaliação aqui..."
          className="rounded-2xl bg-amber-50 px-4 py-4 text-black"
        ></textarea>
      </div>

      <div className="flex w-full flex-col gap-4">
        <h2>Avaliação:</h2>
        <div>
          <StarRating onChange={(rating) => console.log("Nota:", rating)} />
        </div>
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
