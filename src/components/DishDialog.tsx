import { DialogContent, DialogHeader } from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import StarRating from "./StarRating";
import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { createReview } from "@/store/slices/reviewSlice/reviewThunk";

type DishDialogProps = {
  onClose: () => void;
};

export function DishDialog({ onClose }: DishDialogProps) {
  const [rating, setRating] = useState<number>();
  const [comment, setComment] = useState<string | null>(null);
  const { selectedDish } = useAppSelector((state) => state.dishes);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  function handleCreateReview() {
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    if (!rating) {
      toast.error("Por favor, avalie o prato com estrelas");
      return;
    }
    if (!comment) {
      toast.error("Por favor, escreva um comentário para o prato");
      return;
    }

    dispatch(createReview({ comment, rating }));
    onClose();
  }

  return (
    <DialogContent className="h-110 w-225 p-0">
      <div className="flex">
        <div className="flex h-110 w-2/5">
          <img
            src={`http://localhost:8080/api/uploads/${selectedDish?.image_url}`}
            alt="Imagem ilustrativa do prato"
            className="h-full w-full rounded-l-md object-cover"
          />
        </div>
        <div className="flex w-3/5 flex-col p-8">
          <DialogHeader>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
              AVALIAR PRATO
            </h1>
            <div>
              <h2 className="text-xl tracking-tight text-[var(--text-primary)]">
                {selectedDish?.name}
              </h2>
              <p className="text-[var(--color-primary)]">
                {selectedDish?.restaurant.name}
              </p>
            </div>
          </DialogHeader>
          <Label
            htmlFor="comments"
            className="mt-5 w-full gap-1 text-[var(--text-muted)]"
          >
            Comentários
            <textarea
              name="comments"
              id="comments"
              cols={10}
              rows={10}
              className="mb-2 w-full rounded-xl border-1 border-[var(--text-primary)] p-2"
              onChange={(e) => setComment(e.target.value)}
            />
          </Label>
          <div className="flex flex-col items-end justify-end">
            <p className="text-sm text-[var(--text-muted)]">Avaliação</p>
            <div className="mb-3 flex gap-2">
              <StarRating onChange={(rating) => setRating(rating)} />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <Button
              className="w-[90%]"
              variant="default"
              onClick={() => handleCreateReview()}
            >
              Enviar avaliação
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
