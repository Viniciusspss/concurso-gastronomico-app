import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { registerClient } from "@/store/slices/authThunks";
import { ClientType } from "@/types/user/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type SignUpFormData = ClientType & {
  repeatPassword: string;
};

export function SignUp() {
  const { register, handleSubmit, watch } = useForm<SignUpFormData>();
  // const { registerClient } = useAuthContext();
  const { user, error } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.dismiss();
      toast.success("Usuário registrado com sucesso!");
      setTimeout(() => navigate("/Dishes"), 3000);
    }
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [user, error, navigate])

  function onSubmit(data: SignUpFormData) {
    if (data.password === data.repeatPassword) {
      dispatch(registerClient(
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      ));

    }
  }

  return (
    <DefaultForm onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">Primeiro Nome:</Label>
          <Input
            id="firstName"
            placeholder="Digite seu primeiro nome"
            {...register("firstName", {
              required: "Primeiro nome é obrigatório",
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Último Nome:</Label>
          <Input
            id="lastName"
            placeholder="Digite seu último nome"
            {...register("lastName", { required: "Ultimo nome é obrigatório" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            placeholder="Digite seu email"
            type="email"
            {...register("email", { required: "Email é obrigatório" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            {...register("password", { required: "Senha é obrigatório" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="repeatPassword">Repetir senha:</Label>
          <Input
            type="password"
            id="repeatPassword"
            placeholder="Digite sua senha novamente"
            {...register("repeatPassword", {
              required: "Repetir a senha é obrigatório",
              validate: (value) =>
                value === watch("password") || "As senhas não coincidem",
            })}
          />
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
