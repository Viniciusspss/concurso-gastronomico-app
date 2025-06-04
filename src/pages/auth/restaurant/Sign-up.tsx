import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { clearError } from "@/store/slices/authSlice/authSlice";
import { RegisterRestaurant } from "@/store/slices/authSlice/restaurantThunks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpFormDataSchema } from "@/types/user/restaurant";

export type SignUpFormData = z.infer<typeof signUpFormDataSchema>;

export function SignUp() {
  const { user, errorRegister } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormDataSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.dismiss();
      toast.success("Usuário registrado com sucesso!");
      setTimeout(() => navigate(`/restaurant-dishes/${user.id}`), 3000);
    }
    if (errorRegister) {
      toast.error(errorRegister);
    }
  }, [user, errorRegister, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  function onSubmit({
    cnpj,
    name,
    password,
    repeatPassword,
    image_url,
  }: SignUpFormData) {
    if (password !== repeatPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    const formData = new FormData();
    formData.append("cnpj", cnpj);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("image", image_url);

    dispatch(RegisterRestaurant(formData));
  }

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-[var(--color-background)]">
      <div className="flex flex-col">
        <h1 className="flex w-full justify-center text-xl font-bold text-[var(--text-primary)]">
          CRIAR CONTA
        </h1>
        <h2 className="flex w-full justify-center text-sm text-[var(--color-primary)]">
          Sou restaurante
        </h2>
      </div>
      <DefaultForm
        className="items-center justify-center rounded-2xl p-15"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              {...register("cnpj", { required: "cnpj é obrigatório" })}
            />
            {errors.cnpj && <span>{errors.cnpj?.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              {...register("name", { required: "nome é obrigatório" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              {...register("password", { required: "senha é obrigatório" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="repeatPassword">Repetir senha</Label>
            <Input
              id="repeatPassword"
              type="password"
              {...register("repeatPassword", {
                required: "repetir senha é obrigatório",
                validate: (value) =>
                  value === watch("password") || "As senhas não coincidem",
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="image_url">Imagem do restaurante</Label>
            <Input
              id="image_url"
              type="file"
              name="image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("image_url", file, { shouldValidate: true });
                }
              }}
            />
          </div>
        </div>
        <Button className="w-80 rounded-xl" variant="default">
          Cadastre-se
        </Button>
        <p className="text-xs">
          Já tenho uma conta.{" "}
          <Link to="/sign-in/restaurant" className="font-bold text-red-500">
            Fazer Login
          </Link>
        </p>
      </DefaultForm>
    </div>
  );
}
