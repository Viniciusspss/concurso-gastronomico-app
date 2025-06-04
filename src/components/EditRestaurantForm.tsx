import { Link } from "react-router-dom";
import { DefaultForm } from "./DefaultForm";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import { DeleteProfile } from "./DeleteProfile";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toast } from "react-toastify";
import { EditRestaurantType } from "@/types/user/restaurant";
import { RestaurantHeader } from "./RestaurantHeader";
import { editRestaurant } from "@/store/slices/authSlice/restaurantThunks";

export function EditRestaurantForm() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user, errorEdited } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, setValue } = useForm<EditRestaurantType>();
  const dispatch = useAppDispatch();

  function handleOpenDialog() {
    setIsDeleteOpen(true);
  }

  function handleEdit({ cnpj, name, image_url, password }: EditRestaurantType) {
    const data = new FormData();
    if (cnpj) data.append("cnpj", cnpj);
    if (name) data.append("name", name);
    if (image_url) data.append("image", image_url);
    if (password) data.append("password", password);

    if (Array.from(data.entries()).length > 0) {
      dispatch(editRestaurant(data)).then((action) => {
        if (editRestaurant.fulfilled.match(action)) {
          toast.dismiss();
          toast.success("Restaurante editado com sucesso!");
        } else {
          toast.dismiss();
          toast.error(errorEdited);
        }
      });
    } else {
      toast.info("Insira as informações que deseja alterar!");
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center bg-[var(--color-background)]">
      <RestaurantHeader />
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col rounded-2xl border-1 p-6 shadow-2xl">
          <div className="flex justify-between">
            <h1 className="mb-4 text-2xl tracking-tight text-[var(--text-primary)]">
              Editar perfil do restaurante
            </h1>
            <Button
              onClick={() => handleOpenDialog()}
              type="button"
              variant="warn"
              className="w-40"
            >
              Excluir restaurante
            </Button>
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DeleteProfile onClose={() => setIsDeleteOpen(false)} />
            </Dialog>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[var(--text-foreground)]">
              {user && "cnpj" in user && (
                <img
                  className="h-25 w-25 rounded-full"
                  src={`http://localhost:8080/api${user?.image_url}`}
                />
              )}
            </div>
            <div className="text-sm text-[var(--text-foreground)]">
              {user && "cnpj" in user && (
                <div>
                  <h1 className="text-xl text-[var(--text-primary)]">
                    {user.name}
                  </h1>
                  <h1 className="text-[var(--text-muted)]">{user.cnpj}</h1>
                </div>
              )}
            </div>
          </div>

          <DefaultForm onSubmit={handleSubmit(handleEdit)}>
            <div className="mt-4 flex gap-4">
              <Label className="gap-1 text-[var(--text-muted)]">
                Nome
                <Input
                  className="bg-[var(--color-background)]"
                  id="name"
                  {...register("name")}
                ></Input>
              </Label>
              <Label className="gap-1 text-[var(--text-muted)]" htmlFor="cnpj">
                CNPJ
                <Input
                  className="bg-[var(--color-background)]"
                  id="cnpj"
                  {...register("cnpj")}
                ></Input>
              </Label>
            </div>
            <div className="flex gap-4">
              <Label
                className="gap-1 text-[var(--text-muted)]"
                htmlFor="image_url"
              >
                Imagem
                <Input
                  type="file"
                  id="image_url"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("image_url", file, { shouldValidate: true });
                    }
                  }}
                ></Input>
              </Label>

              <Label
                className="gap-1 text-[var(--text-muted)]"
                htmlFor="password"
              >
                Nova Senha
                <Input
                  className="bg-[var(--color-background)]"
                  type="password"
                  id="password"
                  {...register("password")}
                ></Input>
              </Label>
            </div>
            <div className="flex justify-end gap-4">
              <Link to="/Dishes">
                <Button variant="muted">Cancelar</Button>
              </Link>
              <Button>Salvar</Button>
            </div>
          </DefaultForm>
        </div>
      </div>
    </div>
  );
}
