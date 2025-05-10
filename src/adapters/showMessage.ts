import { Dialog } from "@/components/Dialog";
import { toast } from "react-toastify";

export const showMessage = {
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data: data,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: (confirmation) => {
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
    }),
};
