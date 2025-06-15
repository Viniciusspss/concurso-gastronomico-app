import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { clearError } from "@/store/slices/authSlice/authSlice";
import { registerClient } from "@/store/slices/authSlice/clientThunks";
import { ClientType } from "@/types/user/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type SignUpFormData = ClientType & {
  repeatPassword: string;
};

export function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>();
  const { user, errorRegister } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.dismiss();
      toast.success("Usuário registrado com sucesso!");
      setTimeout(() => navigate("/Dishes"), 3000);
    }
    if (errorRegister) {
      toast.dismiss();
      toast.error(errorRegister);
    }
  }, [user, errorRegister, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  function onSubmit({
    email,
    password,
    first_name,
    last_name,
    repeatPassword,
  }: SignUpFormData) {
    if (password === repeatPassword) {
      dispatch(
        registerClient({
          email,
          password,
          first_name,
          last_name,
        }),
      );
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-[var(--color-background)]">
      <div className="flex flex-col mt-6">
        <h1 className="flex w-full justify-center text-xl font-bold text-[var(--text-primary)]">
          CRIAR CONTA
        </h1>
        <h2 className="flex w-full justify-center text-sm text-[var(--color-primary)]">
          Sou cliente
        </h2>
      </div>
      <DefaultForm
        className="items-center justify-center rounded-2xl p-15"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">
              Nome
              <Input
                id="firstName"
                className={`${errors.first_name} ? "border-red-500 focus:border-red-500 " : ""`}
                {...register("first_name", {
                  required: "Primeiro nome é obrigatório",
                })}
              />
              {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name?.message}</span>}
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">
              Sobrenome
              <Input
                id="lastName"
                className={`${errors.last_name} ? "border-red-500 focus:border-red-500 " : ""`}
                {...register("last_name", {
                  required: "Ultimo nome é obrigatório",
                })}
              />
              {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name?.message}</span>}
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">
              Email
              <Input
                id="email"
                type="email"
                className={`${errors.email} ? "border-red-500 focus:border-red-500 " : ""`}
                {...register("email", { required: "Email é obrigatório" })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email?.message}</span>}
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">
              Senha
              <Input
                type="password"
                id="password"
                className={`${errors.password} ? "border-red-500 focus:border-red-500 " : ""`}
                {...register("password", { required: "Senha é obrigatório" })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password?.message}</span>}
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="repeatPassword">
              Repetir senha
              <Input
                type="password"
                id="repeatPassword"
                {...register("repeatPassword", {
                  required: "Repetir a senha é obrigatório",
                  validate: (value) =>
                    value === watch("password") || "As senhas não coincidem",
                })}
              />
            </Label>
          </div>
        </div>
        <Button className="w-80 rounded-xl" variant="default">
          Cadastre-se
        </Button>
        <p className="text-xs">
          Já tenho uma conta.{" "}
          <Link to="/sign-in/User" className="font-bold text-red-500">
            Fazer Login
          </Link>
        </p>
      </DefaultForm>
    </div>
  );
}
