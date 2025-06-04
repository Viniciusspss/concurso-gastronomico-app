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

type LoginClientFormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { register, handleSubmit } = useForm<LoginClientFormData>();
  const navigate = useNavigate();
  const { user, errorLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigate("/Dishes");
    }

    if (errorLogin) {
      toast.dismiss();
      toast.error(errorLogin);
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
      <Link to="/">
        <Button
          variant="secondary"
          size="lg"
          className="absolute top-10 right-10 w-60"
        >
          Escolher outra forma de login
        </Button>
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
                {...register("email", { required: "Email é obrigatório" })}
              />
            </Label>
          </div>
          <div className="flex">
            <Label htmlFor="password">
              Senha
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Senha é obrigatório" })}
              />
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
