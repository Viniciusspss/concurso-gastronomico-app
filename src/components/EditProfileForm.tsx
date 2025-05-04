import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { DefaultForm } from "./DefaultForm";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import { DeleteProfile } from "./DeleteProfile";

export function EditProfileForm() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function handleOpenDialog() {
    setIsDeleteOpen(true);
  }
  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-10 px-4">
      <h1 className="text-2xl text-amber-50">EDITAR PERFIL</h1>
      <DefaultForm>
        <div className="flex flex-col gap-2">
          <Label className="text-amber-50" htmlFor="firstName">
            Primeiro Nome:
          </Label>
          <Input
            className="bg-amber-50"
            id="firstName"
            placeholder="Primeiro nome do usuário"
          ></Input>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-amber-50" htmlFor="lastName">
            Último Nome:
          </Label>
          <Input
            className="bg-amber-50"
            id="lastName"
            placeholder="Último nome do usuário"
          ></Input>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-amber-50" htmlFor="email">
            Email:
          </Label>
          <Input
            className="bg-amber-50"
            id="email"
            placeholder="Email do usuário"
          ></Input>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-amber-50" htmlFor="password">
            Senha:
          </Label>
          <Input
            className="bg-amber-50"
            id="password"
            placeholder="Nova senha do usuário"
          ></Input>
        </div>
        <div className="flex justify-between">
          <DefaultButton className="min-w-[100px] px-4 text-xs">
            EDITAR
          </DefaultButton>
          <DefaultButton
            onClick={() => handleOpenDialog()}
            className="min-w-[100px] px-4 text-xs"
            type="button"
          >
            EXCLUIR
          </DefaultButton>
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DeleteProfile onClose={() => setIsDeleteOpen(false)} />
          </Dialog>
          <Link to="/Dishes">
            <DefaultButton className="min-w-[100px] px-4 text-xs">
              FECHAR
            </DefaultButton>
          </Link>
        </div>
      </DefaultForm>
    </div>
  );
}
