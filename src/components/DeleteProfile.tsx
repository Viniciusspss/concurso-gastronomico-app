import { DefaultButton } from "./DefaultButton";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useDeleteUser } from "@/hooks/useDeleteUser";

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
    <DialogContent className="flex border-0 bg-[#272727] px-10 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <DialogTitle className="text-amber-400">
          Deseja mesmo excluir seu perfil?
        </DialogTitle>
        <div className="flex gap-4">
          <DefaultButton className="text-xs" onClick={() => handleDeleteUser()}>
            EXCLUIR
          </DefaultButton>
          <DefaultButton className="text-xs" onClick={() => onClose()}>
            FECHAR
          </DefaultButton>
        </div>
        {isLoad && <Loader2Icon className="animate-spin text-amber-400" />}
      </div>
    </DialogContent>
  );
}
