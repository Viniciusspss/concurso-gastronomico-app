import { DefaultButton } from "@/components/DefaultButton";
import { DefaultForm } from "@/components/DefaultForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/authContext/useAuthContext";
import { useDishContext } from "@/context/dishContext/useDishContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function EditDish() {
  type EditDishFormData = {
    dishId: string;
    title: string;
    price: number;
    description: string;
  };

  const { user } = useAuthContext();
  const { editDish, selectedDish } = useDishContext();
  const { register, handleSubmit } = useForm<EditDishFormData>();

  function onSubmit(data: EditDishFormData) {
    if (selectedDish) {
      editDish(selectedDish?.id, data.title, data.price, data.description);
      alert("Prato Editado com sucesso!");
    }
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-12 px-4 py-4 text-amber-50">
      <h1 className="text-2xl">EDITAR PRATO</h1>
      <DefaultForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishName">
            Novo nome:
            <Input
              defaultValue={selectedDish?.title}
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
              defaultValue={selectedDish?.price}
              className="bg-amber-50 text-black"
              id="dishPrice"
              placeholder="Digite o novo preço do prato"
              {...register("price")}
            />
          </Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishDescription">
            Nova Descrição:
            <textarea
              defaultValue={selectedDish?.description}
              className="w-full rounded-2xl bg-amber-50 px-3 py-3 text-black"
              id="dishDescription"
              cols={30}
              rows={5}
              placeholder="Digite a nova descrição do prato"
              {...register("description")}
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
