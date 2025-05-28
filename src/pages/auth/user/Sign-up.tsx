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
  const { register, handleSubmit, watch } = useForm<SignUpFormData>();
  const { user, errorRegister } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
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
  }, [user, errorRegister, navigate])


  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  function onSubmit({ email, password, first_name, last_name, repeatPassword }: SignUpFormData) {
    if (password === repeatPassword) {
      dispatch(registerClient(
        {
          email,
          password,
          first_name,
          last_name,
        }
      ));

    }
  }

  return (
    <div className="rounded-2xl bg-[var(--color-background)] w-full justify-center items-center flex flex-col">
      <div className="flex flex-col">
        <h1 className="flex w-full justify-center font-bold text-xl text-[var(--text-primary)]">CRIAR CONTA</h1>
        <h2 className="flex w-full justify-center text-sm text-[var(--color-primary)]">Sou cliente</h2>
      </div>
      <DefaultForm className=" p-15 rounded-2xl justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label className="flex flex-col items-start w-80  text-[var(--text-muted)]" htmlFor="firstName">Nome
              <Input
                className="bg-[var(--color-background)] border-[var(--text-muted)]"
                id="firstName"
                {...register("first_name", {
                  required: "Primeiro nome é obrigatório",
                })}
              />
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="flex flex-col items-start w-80 text-[var(--text-muted)]" htmlFor="lastName">Sobrenome
              <Input
                id="lastName"
                className="bg-[var(--color-background)] border-[var(--text-muted)]"
                {...register("last_name", { required: "Ultimo nome é obrigatório" })}
              />
            </Label>

          </div>
          <div className="flex flex-col gap-2">
            <Label className="flex flex-col items-start w-80 text-[var(--text-muted)]" htmlFor="email">Email
              <Input
                id="email"
                className="bg-[var(--color-background)] border-[var(--text-muted)]"
                type="email"
                {...register("email", { required: "Email é obrigatório" })}
              />
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="flex flex-col items-start w-80 text-[var(--text-muted)]" htmlFor="password">Senha
              <Input
                type="password"
                id="password"
                className="bg-[var(--color-background)] border-[var(--text-muted)]"
                {...register("password", { required: "Senha é obrigatório" })}
              />
            </Label>

          </div>
          <div className="flex flex-col gap-2">
            <Label className="flex flex-col items-start w-80 text-[var(--text-muted)]" htmlFor="repeatPassword">Repetir senha
              <Input
                type="password"
                className="bg-[var(--color-background)] border-[var(--text-muted)]"
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
        <Button className="rounded-xl w-80" variant="default" >
          Cadastre-se
        </Button>
        <p className="text-xs">
          Já tenho uma conta.{" "}
          <Link to="/SignIn/User" className="font-bold text-red-500">
            Fazer Login
          </Link>
        </p>
      </DefaultForm>
    </div>

  );
}
