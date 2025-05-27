import { DefaultButton } from "@/components/DefaultButton";
import { DefaultForm } from "@/components/DefaultForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { editDish, loadRestaurantDishes } from "@/store/slices/dishSlice/dishThunks";
import { editDishFormData } from "@/types/dishes";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function EditDish() {

  const { user } = useAppSelector(state => state.auth);
  const { restaurantDishes, editedError } = useAppSelector(state => state.dishes)
  const dispatch = useAppDispatch()
  const { register, handleSubmit, setValue } = useForm<editDishFormData>();
  const { dishId } = useParams()
  const navigate = useNavigate();
  const dish = restaurantDishes.find(d => d.id === dishId);

  const data = new FormData();
  function onSubmit({ details, image_url, name, price }: editDishFormData) {
    if (!dish) {
      return
    }

    const toStringPrice = parseFloat(price).toFixed(2);
    data.append("name", name);
    data.append("price", toStringPrice);
    data.append("image", image_url);
    data.append("details", details);

    dispatch(editDish(data)).then((action) => {
      if (editDish.fulfilled.match(action)) {
        toast.success("Prato editado com sucesso!");
        navigate(`/restaurant-dishes/${user?.id}`);
        dispatch(loadRestaurantDishes())
      } else {
        toast.error(editedError)
      }
    });
  }

  if (!dish) {
    return <Navigate to={`/restaurant-dishes/${user?.id}`} />;
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-12 px-4 py-4 text-amber-50">
      <h1 className="text-2xl">EDITAR PRATO</h1>
      <DefaultForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishName">
            Novo nome:
            <Input
              defaultValue={dish.name}
              className="bg-amber-50 text-black"
              id="dishName"
              placeholder="Digite o novo nome do prato"
              {...register("name")}
            />
          </Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishPrice">
            Novo Preço:
            <Input
              defaultValue={dish.price}
              className="bg-amber-50 text-black"
              id="dishPrice"
              placeholder="Digite o novo preço do prato"
              {...register("price")}
            />
          </Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishDetails">
            Nova Descrição:
            <textarea
              defaultValue={dish.details}
              className="w-full rounded-2xl bg-amber-50 px-3 py-3 text-black"
              id="dishDetails"
              cols={30}
              rows={5}
              placeholder="Digite a nova descrição do prato"
              {...register("details")}
            />
          </Label>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-amber-50" htmlFor="image_url">
            Imagem do prato:
          </Label>
          <Input
            className="bg-amber-50"
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
        <div className="flex items-center justify-center gap-4">
          <DefaultButton className="px-17 text-xs">EDITAR</DefaultButton>
          <Link to={`/restaurant-dishes/${user?.id}`}>
            <DefaultButton type="button" className="px-17 text-xs">
              FECHAR
            </DefaultButton>
          </Link>
        </div>
      </DefaultForm>
    </div>
  );
}
