import { DefaultForm } from "@/components/DefaultForm";
import { DeleteDish } from "@/components/DeleteDish";
import { RestaurantHeader } from "@/components/RestaurantHeader";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  editDish,
  loadRestaurantDishes,
} from "@/store/slices/dishSlice/dishThunks";
import { editDishFormData } from "@/types/dishes";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function EditDish() {
  const { user } = useAppSelector((state) => state.auth);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { editedError, selectedDish } = useAppSelector((state) => state.dishes);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm<editDishFormData>();
  const navigate = useNavigate();
  const data = new FormData();

  useEffect(() => {
    if (user && "cnpj" in user) {
      dispatch(loadRestaurantDishes());
    }
  }, [dispatch, user]);

  function onSubmit({ details, image_url, name, price }: editDishFormData) {
    if (!selectedDish) {
      return;
    }
    if (name) {
      data.append("name", name);
    }

    if (price) {
      const toStringPrice = parseFloat(price).toFixed(2);
      data.append("price", toStringPrice);
    }

    if (image_url) {
      data.append("image", image_url);
    }

    if (details) {
      data.append("details", details);
    }

    dispatch(editDish(data)).then((action) => {
      if (editDish.fulfilled.match(action)) {
        toast.dismiss();
        toast.success("Prato editado com sucesso!");
        navigate(`/restaurant-dishes/${user?.id}`);
        dispatch(loadRestaurantDishes());
      } else {
        toast.dismiss();

        toast.error(editedError);
      }
    });
  }

  if (!selectedDish) {
    return <Navigate to={`/restaurant-dishes/${user?.id}`} />;
  }

  return (
    <div className="flex w-full min-h-screen flex-col bg-[var(--color-background)]">
      <Helmet title="Editar Prato | Concurso gastronômico" />
      <RestaurantHeader />
      <main className="flex items-center justify-center flex-col h-full mt-25 ">

        <div className="sm:rounded-4xl sm:border-1 sm:border-[var(--text-muted)] bg-[var(--color-background)] sm:p-10 sm:shadow-2xl">
          <h1 className="mb-10 mx-5 text-2xl sm:text-2xl text-[var(--text-primary)]">
            EDITAR PRATO
          </h1>
          <div className="mb-7 flex gap-4 px-10">
            <img
              src={`http://localhost:8080/api/uploads/${selectedDish.image_url}`}
              alt="Imagem do prato"
              className="h-18 w-18 sm:h-25 sm:w-25 rounded-full object-cover"
            />
            <div className="flex w-full justify-between">
              <div>
                <h2 className="text-sm sm:text-2xl text-[var(--text-primary)]">
                  {selectedDish.name}
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  R${selectedDish.price}
                </p>
              </div>
              <Button
                variant="warn"
                onClick={() => setIsDeleteOpen(true)}
              >
                Excluir prato
              </Button>
              <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DeleteDish onClose={() => setIsDeleteOpen(false)} />
              </Dialog>
            </div>
          </div>
          <DefaultForm onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 px-10">

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="dishName">
                    Novo nome
                    <Input
                      defaultValue={selectedDish.name}
                      id="dishName"
                      {...register("name")}
                    />
                  </Label>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="dishPrice">
                    Novo preço
                    <Input
                      defaultValue={selectedDish.price}
                      id="dishPrice"
                      {...register("price")}
                    />
                  </Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="dishDetails">
                    Nova descrição
                    <textarea
                      defaultValue={selectedDish.details}
                      className="w-full rounded-2xl border-1 border-[var(--text-muted)] p-4"
                      id="dishDetails"
                      cols={30}
                      rows={5}
                      {...register("details")}
                    />
                  </Label>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="image_url">Imagem do prato</Label>
                  <Input
                    id="image_url"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("image_url", file, { shouldValidate: true });
                      }
                    }}
                  ></Input>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-4">
                <Button >EDITAR</Button>
                <Link to={`/restaurant-dishes/${user?.id}`}>
                  <Button variant="muted">FECHAR</Button>
                </Link>
              </div>
            </div>

          </DefaultForm>
        </div>
      </main>

    </div>
  );
}
