import { ToastContentProps } from "react-toastify";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { Button } from "./ui/button";

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className="z-10">
        <p>{data}</p>

        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => closeToast(true)}
            aria-label="Confirmar ação e fechar"
            title="Confirmar ação e fechar"
            className="bg-emerald-500 hover:bg-emerald-700"
          >
            <ThumbsUpIcon />
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={() => closeToast(false)}
            color="red"
            aria-label="Cancelar ação e fechar"
            title="Cancelar ação e fechar"
          >
            <ThumbsDownIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
