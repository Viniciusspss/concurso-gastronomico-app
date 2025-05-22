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
  const { user, errorLogin } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      navigate("/Dishes")
    }

    if (errorLogin) {
      toast.dismiss()
      toast.error(errorLogin)
    }
  }, [user, errorLogin, navigate])

  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  function onSubmit(data: LoginClientFormData) {
    dispatch(loginClient({ email: data.email, password: data.password }))
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
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              className="bg-[#ddd] "
              {...register("email", { required: "Email é obrigatório" })}
            />
          </div>
          <div className="flex gap-1">
            <Label htmlFor="password">Senha:</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="bg-[#ddd] "
              {...register("password", { required: "Senha é obrigatório" })}
            />
          </div>
          <p className="text-xs">
            Ainda não tenho uma conta.{" "}
            <Link to="/SignUp/User" className="font-bold text-red-500">
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
