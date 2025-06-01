import { Link } from "react-router-dom";
import { DefaultForm } from "./DefaultForm";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import { DeleteProfile } from "./DeleteProfile";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "./ui/button";
import { DefaultHeader } from "./DefaultHeader";
import { useForm } from "react-hook-form";
import { EditClientType } from "@/types/user/client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { editClient } from "@/store/slices/authSlice/clientThunks";
import { toast } from "react-toastify";

export function EditProfileForm() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user, errorEdited } = useAppSelector((state) => state.auth);
  const { register, handleSubmit } = useForm<EditClientType>();
  const dispatch = useAppDispatch();

  function handleOpenDialog() {
    setIsDeleteOpen(true);
  }

  function handleEdit({
    email,
    first_name,
    last_name,
    password,
  }: EditClientType) {
    const payload: EditClientType = {};
    if (email) payload.email = email;
    if (first_name) payload.first_name = first_name;
    if (last_name) payload.last_name = last_name;
    if (password) payload.password = password;

    if (Object.keys(payload).length > 0) {
      dispatch(editClient(payload)).then((action) => {
        if (editClient.fulfilled.match(action)) {
          toast.dismiss();
          toast.success("Usuário editado com sucesso!");
        } else {
          toast.dismiss();
          toast.error(errorEdited);
        }
      });
    } else {
      toast.info("Insira as informações que deseja alterar!");
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <DefaultHeader />
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col rounded-2xl border-1 p-6">
          <div className="flex justify-between">
            <h1 className="mb-4 text-2xl tracking-tight text-[var(--text-primary)]">
              Editar Perfil
            </h1>
            <Button
              onClick={() => handleOpenDialog()}
              type="button"
              variant="warn"
            >
              Excluir conta
            </Button>
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DeleteProfile onClose={() => setIsDeleteOpen(false)} />
            </Dialog>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-[var(--text-foreground)]">
                {user && "email" in user && <h1>{user.first_name}</h1>}
              </div>
              <div className="text-sm text-[var(--text-foreground)]">
                {user && "email" in user && <h1>{user.email}</h1>}
              </div>
            </div>
          </div>

          <DefaultForm onSubmit={handleSubmit(handleEdit)}>
            <div className="mt-4 flex gap-4">
              <Label className="gap-1 text-[var(--text-muted)]">
                Nome
                <Input
                  className="bg-[var(--color-background)]"
                  id="firstName"
                  {...register("first_name")}
                ></Input>
              </Label>
              <Label
                className="gap-1 text-[var(--text-muted)]"
                htmlFor="lastName"
              >
                Sobrenome
                <Input
                  className="bg-[var(--color-background)]"
                  id="lastName"
                  {...register("last_name")}
                ></Input>
              </Label>
            </div>
            <div className="flex gap-4">
              <Label className="gap-1 text-[var(--text-muted)]" htmlFor="email">
                Email
                <Input id="email" {...register("email")}></Input>
              </Label>

              <Label
                className="gap-1 text-[var(--text-muted)]"
                htmlFor="password"
              >
                Nova Senha
                <Input
                  className="bg-[var(--color-background)]"
                  id="password"
                  {...register("password")}
                ></Input>
              </Label>
            </div>
            <div className="flex justify-end gap-4">
              <Link to="/Dishes">
                <Button variant="muted">Cancelar</Button>
              </Link>
              <Button>Salvar</Button>
            </div>
          </DefaultForm>
        </div>
      </div>
    </div>
  );
}
