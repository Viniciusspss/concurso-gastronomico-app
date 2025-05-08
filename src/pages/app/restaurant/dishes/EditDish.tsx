import { DefaultButton } from "@/components/DefaultButton";
import { DefaultForm } from "@/components/DefaultForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditDish() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-12 px-4 py-4 text-amber-50">
      <h1 className="text-2xl">EDITAR PRATO</h1>
      <DefaultForm>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishName">
            Novo nome:
            <Input
              className="bg-amber-50"
              id="dishName"
              placeholder="Digite o novo nome do prato"
            />
          </Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishPrice">
            Novo Preço:
            <Input
              className="bg-amber-50"
              id="dishPrice"
              placeholder="Digite o novo preço do prato"
            />
          </Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="dishDescription">
            Nova Descrição:
            <textarea
              className="w-full rounded-2xl bg-amber-50 px-3 py-3 text-black"
              id="dishDescription"
              cols={30}
              rows={5}
              placeholder="Digite a nova descrição do prato"
            />
          </Label>
        </div>
        <div className="flex items-center justify-center gap-4">
          <DefaultButton className="px-17 text-xs">EDITAR</DefaultButton>
          <DefaultButton className="px-17 text-xs">FECHAR</DefaultButton>
        </div>
      </DefaultForm>
    </div>
  );
}
