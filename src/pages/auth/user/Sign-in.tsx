import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/authContext/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginClientFormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { loginClient } = useAuthContext();
  const { register, handleSubmit } = useForm<LoginClientFormData>();
  const navigate = useNavigate();

  function onSubmit(data: LoginClientFormData) {
    const sucess = loginClient(data.email, data.password);
    if (sucess) {
      navigate("/Dishes");
    } else {
      alert("Email ou senha inválidos");
    }
  }

  return (
    <div>
      <Button variant="dark" className="absolute top-8 left-8" asChild>
        <Link to="/">Escolher outro tipo de login</Link>
      </Button>
      <DefaultForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
          </div>
          <div className="flex gap-1">
            <Label htmlFor="password" {...register("password")}>
              Senha:
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>
          <p className="text-xs">
            Ainda não tenho uma conta.{" "}
            <Link to="/SignUp/User" className="font-bold text-red-500">
              Criar conta
            </Link>
          </p>
        </div>
        <Button type="submit" className="rounded-xl" variant="dark">
          Conecte-se
        </Button>
      </DefaultForm>
    </div>
  );
}
