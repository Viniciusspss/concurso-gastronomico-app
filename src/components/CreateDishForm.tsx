import { Link, useNavigate } from "react-router-dom";
import { DefaultForm } from "./DefaultForm";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  createDish,
  loadRestaurantDishes,
} from "@/store/slices/dishSlice/dishThunks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createDishFormData } from "@/types/dishes";
import { RestaurantHeader } from "./RestaurantHeader";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { clearError } from "@/store/slices/dishSlice/dishSlice";

export function CreateDishForm() {
  const { user } = useAppSelector((state) => state.auth);
  const { errorCreateDish } = useAppSelector((state) => state.dishes);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm<createDishFormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorCreateDish) {
      toast.dismiss();
      toast.error(errorCreateDish);
      dispatch(clearError());
    }
  }, [errorCreateDish, user?.id, dispatch]);

  const handleCreateDish = ({
    details,
    image_url,
    name,
    price,
  }: createDishFormData) => {
    if (!user?.id) return;
    const toStringPrice = parseFloat(price).toFixed(2);
    const data = new FormData();
    data.append("name", name);
    data.append("price", toStringPrice);
    data.append("image", image_url);
    data.append("details", details);
    dispatch(createDish(data)).then((action) => {
      if (createDish.fulfilled.match(action)) {
        toast.success("Prato cadastrado com sucesso!");
        navigate(`/restaurant-dishes/${user?.id}`);
      }
    });
    dispatch(loadRestaurantDishes());
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[var(--color-background)]">
      <RestaurantHeader />
      <div className="flex h-full flex-col justify-center">
        <div className="rounded-4xl border-1 bg-[var(--color-background)] p-10 shadow-2xl">
          <h1 className="mb-4 text-2xl text-[var(--text-primary)]">
            Cadastrar prato
          </h1>
          <div>
            <DefaultForm onSubmit={handleSubmit(handleCreateDish)}>
              <div className="flex gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="dishName">
                    Nome
                    <Input id="dishName" {...register("name")} />
                  </Label>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="dishPrice">
                    Preço
                    <Input id="dishPrice" {...register("price")} />
                  </Label>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="dishDetails">
                    Descrição
                    <textarea
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
              <div className="flex items-center justify-end gap-4">
                <Button>CRIAR PRATO</Button>
                <Link to={`/restaurant-dishes/${user?.id}`}>
                  <Button variant="muted">FECHAR</Button>
                </Link>
              </div>
            </DefaultForm>
          </div>
        </div>
      </div>
    </div>
  );
}
