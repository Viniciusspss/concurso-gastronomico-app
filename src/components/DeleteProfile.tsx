import { DialogContent, DialogTitle } from "./ui/dialog";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Button } from "./ui/button";

type DeleteProfileProps = {
  onClose: () => void;
};

export function DeleteProfile({ onClose }: DeleteProfileProps) {
  const [isLoad, setIsLoad] = useState(false);
  const { deleteUser } = useDeleteUser();
  function handleDeleteUser() {
    setIsLoad(true);
    setTimeout(() => {
      deleteUser();
    }, 1000);
  }

  return (
    <DialogContent className="flex w-100 border-0 bg-[var(--color-foreground)] px-10 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <DialogTitle className="text-[var(--text-primary)]">
          Deseja mesmo excluir seu perfil?
        </DialogTitle>
        <div className="flex gap-4">
          <Button
            variant="warnSecondary"
            className="text-xs"
            onClick={() => handleDeleteUser()}
          >
            EXCLUIR
          </Button>
          <Button variant="muted" className="text-xs" onClick={() => onClose()}>
            CANCELAR
          </Button>
        </div>
        {isLoad && <Loader2Icon className="animate-spin text-amber-400" />}
      </div>
    </DialogContent>
  );
}
