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
  const dispatch = useAppDispatch()
  const { user, errorLogin } = useAppSelector(state => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // navigate(`/restaurant-dishes/${user.id}`)
    }

    if (errorLogin) {
      toast.error(errorLogin)
    }
  }, [user, errorLogin, navigate])

  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  function onSubmit(data: LoginRestaurantFormData) {
    dispatch(LoginRestaurant({ cnpj: data.cnpj, password: data.password }))
  }

  return (
    <div>
      <Button variant="beige" className="absolute top-8 right-8" asChild>
        <Link to="/">Escolher outro tipo de login</Link>
      </Button>
      <DefaultForm className="bg-white p-15 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="flex w-full justify-center mb-10 font-bold text-xl">LOGIN</h1>
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
        <Button type="submit" className="rounded-xl" variant="beige">
          Conecte-se
        </Button>
      </DefaultForm>
    </div>
  );
}
