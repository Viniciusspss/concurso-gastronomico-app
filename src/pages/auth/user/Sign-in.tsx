import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { loginClient } from "@/store/slices/authSlice/clientThunks";
import { clearError } from "@/store/slices/authSlice/authSlice";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "lucide-react";

type LoginClientFormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginClientFormData>();
  const navigate = useNavigate();
  const { user, errorLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      toast.dismiss()
      navigate("/Dishes");
      toast.success("Usuário autenticado com sucesso!")
      setTimeout(() => {
        toast.dismiss()
      }, 3000)
    }

    if (errorLogin) {
      toast.dismiss();
      toast.error("Email ou senha inválidos!");
    }
  }, [user, errorLogin, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  function onSubmit(data: LoginClientFormData) {
    dispatch(loginClient({ email: data.email, password: data.password }));
  }

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-[var(--color-background)]">
      <Link to="/" className="hidden sm:flex">
        <Button
          variant="secondary"
          size="lg"
          className=" absolute top-10  right-10 w-60"
        >
          Escolher outra forma de login
        </Button>
      </Link>
      <Link to="/" className="sm:hidden flex absolute left-4 top-10" >
        <ChevronLeftIcon />
        Voltar
      </Link>
      <div className="flex flex-col">
        <h1 className="flex w-full justify-center text-xl font-bold text-[var(--text-primary)]">
          ENTRAR
        </h1>
        <h2 className="flex w-full justify-center text-sm text-[var(--color-primary)]">
          Preencha as informações para prosseguir
        </h2>
      </div>
      <DefaultForm
        className="items-center justify-center rounded-2xl p-15"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex">
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
          <div className="flex">
            <Label htmlFor="password">
              Senha
              <Input
                id="password"
                type="password"
                className={`${errors.password} ? "border-red-500 focus:border-red-500 " : ""`}
                {...register("password", { required: "Senha é obrigatório" })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password?.message}</span>}
            </Label>
          </div>
        </div>
        <Button type="submit" variant="default" className="w-80">
          Conecte-se
        </Button>
        <p className="text-xs">
          Ainda não tenho uma conta.{" "}
          <Link to="/sign-up/User" className="font-bold text-red-500">
            Criar conta
          </Link>
        </p>

      </DefaultForm>
    </div>
  );
}
