import { ToastContentProps } from "react-toastify";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { DefaultButton } from "./DefaultButton";

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div>
        <p>{data}</p>

        <div>
          <DefaultButton
            onClick={() => closeToast(true)}
            aria-label="Confirmar ação e fechar"
            title="Confirmar ação e fechar"
          >
            <ThumbsUpIcon />
          </DefaultButton>
          <DefaultButton
            onClick={() => closeToast(false)}
            color="red"
            aria-label="Cancelar ação e fechar"
            title="Cancelar ação e fechar"
          >
            <ThumbsDownIcon />
          </DefaultButton>
        </div>
      </div>
    </>
  );
}
