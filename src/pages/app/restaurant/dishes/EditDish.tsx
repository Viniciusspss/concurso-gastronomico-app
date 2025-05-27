import { DefaultButton } from "@/components/DefaultButton";
import { DefaultForm } from "@/components/DefaultForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { editDish } from "@/store/slices/dishSlice/dishSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function EditDish() {
  type EditDishFormData = {
    title: string;
    price: number;
    details: string;
  };

  const { user } = useAppSelector(state => state.auth);
  const { restaurantDishes } = useAppSelector(state => state.dishes)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<EditDishFormData>();
  const { dishId } = useParams()

  const dish = restaurantDishes.find(d => d.id === dishId);

  function onSubmit(data: EditDishFormData) {
    if (!dish) {
      return
    }
    dispatch(editDish({ dishId: dish.id, name: data.title, price: data.price, details: data.details }))
    toast.success("Prato Editado com sucesso!");
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
              {...register("title")}
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
