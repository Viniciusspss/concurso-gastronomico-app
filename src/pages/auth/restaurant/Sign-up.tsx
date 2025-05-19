import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { clearError } from "@/store/slices/authSlice/authSlice";
import { RegisterRestaurant } from "@/store/slices/authSlice/restaurantThunks";
import { restaurantSchema } from "@/types/user/restaurant";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export const signUpFormDataSchema = restaurantSchema.omit({ id: true, dishes: true }).extend(
  {
    repeatPassword: z.string()
  }
)

export type SignUpFormData = z.infer<typeof signUpFormDataSchema>

export function SignUp() {
  const { user, errorRegister } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormDataSchema)
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.dismiss();
      toast.success("Usuário registrado com sucesso!");
      setTimeout(() => navigate(`/restaurant-dishes/${user.id}`), 3000);

    }
    ;
    if (errorRegister) {
      toast.error(errorRegister);
    }
  }, [user, errorRegister, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  function onSubmit({ cnpj, name, password, repeatPassword }: SignUpFormData) {
    if (password === repeatPassword) {
      dispatch(RegisterRestaurant({ cnpj, name, password }));
    } else {
      toast.error("As senhas não coincidem!")
    }
  }

  return (
    <DefaultForm onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cnpj">CNPJ:</Label>
          <Input
            id="cnpj"
            placeholder="Digite seu CNPJ"
            {...register("cnpj", { required: "cnpj é obrigatório" })}
          />
          {errors.cnpj && <span>{errors.cnpj?.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome:</Label>
          <Input
            id="name"
            placeholder="Digite seu nome"
            {...register("name", { required: "nome é obrigatório" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            {...register("password", { required: "senha é obrigatório" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="repeatPassword">Repetir senha:</Label>
          <Input
            id="repeatPassword"
            type="password"

            placeholder="Digite sua senha novamente"
            {...register("repeatPassword", {
              required: "cnpj é obrigatório",
              validate: (value) =>
                value === watch("password") || "As senhas não coincidem",
            })}
          />
        </div>
        <p className="text-xs">
          Já tenho uma conta.{" "}
          <Link to="/SignIn/restaurant" className="font-bold text-red-500">
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
