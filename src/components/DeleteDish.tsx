import { DialogContent, DialogTitle } from "./ui/dialog";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteDish } from "@/store/slices/dishSlice/dishThunks";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { toast } from "react-toastify";

type DeleteDishProps = {
  onClose: () => void;
};

export function DeleteDish({ onClose }: DeleteDishProps) {
  const [isLoad, setIsLoad] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { isDeletedDish, deletedError } = useAppSelector(
    (state) => state.dishes,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleDeleteDish() {
    setIsLoad(true);
    setTimeout(() => {
      dispatch(deleteDish());
    }, 1000);
  }
  useEffect(() => {
    if (isLoad) {
      if (isDeletedDish) {
        toast.dismiss();
        toast.success("Prato excluído com sucesso!");
        navigate(`/restaurant-dishes/${user?.id}`);
        onClose();
      } else if (deletedError) {
        toast.dismiss();
        toast.error(deletedError);
        setIsLoad(false);
      }
    }
  }, [isDeletedDish, deletedError, isLoad, navigate, onClose, user?.id]);
  return (
    <DialogContent className="flex w-100 border-0 bg-[var(--color-foreground)] px-10 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <DialogTitle className="text-[var(--text-primary)]">
          Deseja mesmo excluir esse prato?
        </DialogTitle>
        <div className="flex gap-4">
          <Button
            variant="warnSecondary"
            className="text-xs"
            onClick={() => handleDeleteDish()}
          >
            EXCLUIR
          </Button>
          <Button variant="muted" className="text-xs" onClick={() => onClose()}>
            CANCELAR
          </Button>
        </div>
        {isLoad && (
          <Loader2Icon className="animate-spin text-[var(--color-primary)]" />
        )}
      </div>
    </DialogContent>
  );
}
