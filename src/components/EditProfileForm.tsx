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

export function EditProfileForm() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  function handleOpenDialog() {
    setIsDeleteOpen(true);
  }
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <DefaultHeader />
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col rounded-2xl border-1 p-6">
          <h1 className="mb-4 text-2xl tracking-tight text-[var(--text-primary)]">
            Editar Perfil
          </h1>
          <div className="flex justify-between">
            <div>
              <div className="text-[var(--text-foreground)]">
                {user && "email" in user && <h1>{user.first_name}</h1>}
              </div>
              <div className="text-sm text-[var(--text-foreground)]">
                {user && "email" in user && <h1>{user.email}</h1>}
              </div>
            </div>
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

          <DefaultForm>
            <div className="mt-4 flex gap-6">
              <Label
                className="gap-1 text-[var(--text-muted)]"
                htmlFor="firstName"
              >
                Nome
                <Input
                  className="bg-[var(--color-background)]"
                  id="firstName"
                  placeholder="Nome do usuário"
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
                  placeholder="Sobrenome do usuário"
                ></Input>
              </Label>
            </div>
            <div className="flex gap-4">
              <Label className="gap-1 text-[var(--text-muted)]" htmlFor="email">
                Email
                <Input
                  className=""
                  id="email"
                  placeholder="Email do usuário"
                ></Input>
              </Label>

              <Label
                className="gap-1 text-[var(--text-muted)]"
                htmlFor="password"
              >
                Senha
                <Input
                  className="bg-[var(--color-background)]"
                  id="password"
                  placeholder="Nova senha do usuário"
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
