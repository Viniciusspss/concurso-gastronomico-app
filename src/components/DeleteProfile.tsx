import { DefaultButton } from "./DefaultButton";
import { DialogContent, DialogHeader } from "./ui/dialog";

type DeleteProfileProps = {
  onClose: () => void;
};

export function DeleteProfile({ onClose }: DeleteProfileProps) {
  return (
    <DialogContent className="flex border-0 bg-[#272727] px-10 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <DialogHeader>
          <h2 className="text-amber-400">Deseja mesmo excluir seu perfil?</h2>
        </DialogHeader>
        <div className="flex gap-4">
          <DefaultButton className="text-xs">EXCLUIR</DefaultButton>
          <DefaultButton className="text-xs" onClick={() => onClose()}>
            FECHAR
          </DefaultButton>
        </div>
      </div>
    </DialogContent>
  );
}
