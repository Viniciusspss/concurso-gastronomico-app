import { DefaultButton } from "@/components/DefaultButton";
import { DefaultForm } from "@/components/DefaultForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function EditProfile() {
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
          <DefaultButton className="min-w-[100px] px-4 text-xs">
            EXCLUIR
          </DefaultButton>
          <Link to="/Dishs">
            <DefaultButton className="min-w-[100px] px-4 text-xs">
              FECHAR
            </DefaultButton>
          </Link>
        </div>
      </DefaultForm>
    </div>
  );
}
