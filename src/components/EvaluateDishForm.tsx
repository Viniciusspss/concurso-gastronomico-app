import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { Label } from "./ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import StarRating from "./StarRating";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { createReview } from "@/store/slices/reviewSlice/reviewThunk";
import { useState } from "react";
import { toast } from "react-toastify";
import { DefaultForm } from "./DefaultForm";
import { useForm } from "react-hook-form";

type EvaluateDishFormData = {
  comment: string
}

export function EvaluateDishForm() {
  const { selectedDish } = useAppSelector(state => state.dishes)

  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm<EvaluateDishFormData>()
  const [rating, setRating] = useState<number>()
  const navigate = useNavigate()


  function handleCreateReview({ comment }: EvaluateDishFormData) {
    if (!selectedDish) {
      toast.error("Prato não selecionado");
      return;
    }

    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    if (!rating) {
      toast.error("Por favor, avalie o prato com estrelas");
      return;
    }

    dispatch(createReview({ dish_id: selectedDish.id, user_id: user.id, comment, rating })).then(action => {
      if (createReview.fulfilled.match(action)) {
        toast.success("Prato avaliado com sucesso!");
        reset();
        setRating(undefined);
        navigate("/dishes")

      } else if (createReview.rejected.match(action)) {
        const errorMessage = typeof action.payload === 'string' ? action.payload : 'Erro ao criar avaliação';
        toast.error(errorMessage);
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-amber-50">
      <h1 className="mb-10 text-2xl">AVALIAR PRATO</h1>
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-3">
          <h2>Prato:</h2>
          <p>{selectedDish?.title}</p>
        </div>

      </div>
      <DefaultForm onSubmit={handleSubmit(handleCreateReview)}>
        <div className="flex flex-col gap-4">
          <Label htmlFor="evaluate">Comentário:</Label>
          <textarea
            id="evaluate"
            rows={4}
            cols={50}
            placeholder="Digite sua avaliação aqui..."
            className="rounded-2xl bg-amber-50 px-4 py-4 text-black"
            {...register("comment")}
          ></textarea>
        </div>

        <div className="flex w-full flex-col gap-4">
          <h2>Avaliação:</h2>
          <div>
            <StarRating onChange={(rating) => setRating(rating)} />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <DefaultButton className="px-17 text-xs" type="submit">AVALIAR</DefaultButton>
          <Link to="/Dishes">
            <DefaultButton className="px-17 text-xs">FECHAR</DefaultButton>
          </Link>
        </div>
      </DefaultForm>
    </div>
  );
}
