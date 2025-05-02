import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <DefaultForm>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">Primeiro Nome:</Label>
          <Input id="firstName" placeholder="Digite seu primeiro nome" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Último Nome:</Label>
          <Input id="lastName" placeholder="Digite seu último nome" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" placeholder="Digite seu email" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha:</Label>
          <Input id="password" placeholder="Digite sua senha" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="repeatPassword">Repetir senha:</Label>
          <Input id="repeatPassword" placeholder="Digite sua senha novamente" />
        </div>
        <p className="text-xs">
          Já tenho uma conta.{" "}
          <Link to="/SignIn/User" className="font-bold text-red-500">
            Fazer Login
          </Link>
        </p>
      </div>
      <Button className="rounded-xl" variant="dark">
        Cadastre-se
      </Button>
    </DefaultForm>
  );
}
