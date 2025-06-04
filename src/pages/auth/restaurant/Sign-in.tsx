import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { clearError } from "@/store/slices/authSlice/authSlice";
import { LoginRestaurant } from "@/store/slices/authSlice/restaurantThunks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginRestaurantFormData = {
  cnpj: string;
  password: string;
};

export function SignIn() {
  const { register, handleSubmit } = useForm<LoginRestaurantFormData>();
  const dispatch = useAppDispatch();
  const { user, errorLogin } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/restaurant-dishes/${user.id}`);
    }

    if (errorLogin) {
      toast.error(errorLogin);
    }
  }, [user, errorLogin, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  function onSubmit(data: LoginRestaurantFormData) {
    dispatch(LoginRestaurant({ cnpj: data.cnpj, password: data.password }));
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
          <div className="flex gap-2">
            <Label htmlFor="cnpj">
              CNPJ
              <Input
                id="cnpj"
                {...register("cnpj", { required: "cnpj é obrigatório" })}
              />
            </Label>
          </div>
          <div className="flex gap-1">
            <Label htmlFor="password">
              Senha
              <Input
                id="password"
                type="password"
                {...register("password", { required: "senha é obrigatório" })}
              />
            </Label>
          </div>
        </div>
        <Button type="submit" className="w-80 rounded-xl" variant="default">
          Conecte-se
        </Button>
        <p className="text-xs">
          Ainda não tenho uma conta.{" "}
          <Link to="/sign-up/Restaurant" className="font-bold text-red-500">
            Criar conta
          </Link>
        </p>
      </DefaultForm>
    </div>
  );
}
