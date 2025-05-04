import { Link } from "react-router-dom";
import { DefaultForm } from "./DefaultForm";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DefaultButton } from "./DefaultButton";

export function ProfileForm() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-10 px-4">
      <h1 className="text-2xl text-amber-50">PERFIL</h1>
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
        <div className="flex justify-between">
          <Link to="/EditProfile">
            <DefaultButton className="min-w-[100px] px-4 text-xs">
              EDITAR
            </DefaultButton>
          </Link>
          <DefaultButton className="min-w-[100px] px-4 text-xs">
            EXCLUIR
          </DefaultButton>
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
