import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/authContext/useAuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type LoginRestaurantFormData = {
  cnpj: string;
  password: string;
};

export function SignIn() {
  const { loginRestaurant } = useAuthContext();
  const { register, handleSubmit } = useForm<LoginRestaurantFormData>();
  const navigate = useNavigate();

  function onSubmit(data: LoginRestaurantFormData) {
    const success = loginRestaurant(data.cnpj, data.password);
    if (success.success === true) {
      navigate("/restaurant-dishes");
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
            <Label htmlFor="cnpj">CNPJ:</Label>
            <Input
              id="cnpj"
              placeholder="Digite seu CNPJ"
              {...register("cnpj", { required: "cnpj é obrigatório" })}
            />
          </div>
          <div className="flex gap-1">
            <Label htmlFor="password">Senha:</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register("password", { required: "senha é obrigatório" })}
            />
          </div>
          <p className="text-xs">
            Ainda não tenho uma conta.{" "}
            <Link to="/SignUp/Restaurant" className="font-bold text-red-500">
              Criar conta
            </Link>
          </p>
        </div>
        <Button className="rounded-xl" variant="dark">
          Conecte-se
        </Button>
      </DefaultForm>
    </div>
  );
}
