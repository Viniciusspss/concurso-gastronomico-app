import { Link, useNavigate } from "react-router-dom";
import { DefaultForm } from "./DefaultForm";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DefaultButton } from "./DefaultButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { createDish } from "@/store/slices/dishSlice/dishThunks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { clearError } from "@/store/slices/dishSlice/dishSlice";

type createDishFormData = {
    imageURL: string,
    price: number,
    description: string,
    title: string
}

export function CreateDishForm() {
    const { user } = useAppSelector(state => state.auth)
    const { errorCreateDish } = useAppSelector(state => state.dishes)
    const dispatch = useAppDispatch()
    const [price, setPrice] = useState("")
    const { register, handleSubmit } = useForm<createDishFormData>()
    const navigate = useNavigate()

    useEffect(() => {
        if (errorCreateDish) {
            toast.dismiss()
            toast.error(errorCreateDish)
            dispatch(clearError())
        }
    }, [errorCreateDish, navigate, user?.id, dispatch])


    const handleCreateDish = ({ description, imageURL, title, price }: createDishFormData) => {
        if (!user?.id) return;
        dispatch(
            createDish({
                title,
                price,
                description,
                imageURL,
                restaurantId: user.id,
            }),
        ).then((action) => {
            if (createDish.fulfilled.match(action)) {
                toast.success("Prato cadastrado com sucesso!")
                navigate(`/restaurant-dishes/${user?.id}`);
            }
        })
    }

    return (
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-10 px-4">
            <h1 className="text-2xl text-amber-50">PERFIL</h1>
            <DefaultForm onSubmit={handleSubmit(handleCreateDish)}>
                <div className="flex flex-col gap-2">
                    <Label className="text-amber-50" htmlFor="firstName">
                        Título do prato:
                    </Label>
                    <Input
                        className="bg-amber-50"
                        id="title"
                        placeholder="Insira o título do prato"
                        {...register("title")}
                    ></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-amber-50" htmlFor="price">
                        Preço:
                    </Label>
                    <Input
                        className="bg-amber-50"
                        id="price"
                        type="number"
                        value={price}
                        min={0}
                        step={0.01}
                        {...register("price")}
                        onChange={e => setPrice(e.target.value)}
                    ></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-amber-50" htmlFor="description">
                        Descrição:
                    </Label>
                    <textarea className="bg-amber-50 text-black" id="description"  {...register("description")} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-amber-50" htmlFor="imageURL">
                        Imagem do prato:
                    </Label>
                    <Input
                        className="bg-amber-50"
                        id="imageURL"
                        placeholder="Insira o link da imagem do prato"
                        {...register("imageURL")}
                    ></Input>
                </div>

                <DefaultButton type="submit" className="min-w-[100px] px-4 text-xs">
                    CRIAR
                </DefaultButton>

                <Link to={`/restaurant-dishes/${user?.id}`}>
                    <DefaultButton className="min-w-[100px] px-4 text-xs">
                        FECHAR
                    </DefaultButton>
                </Link>

            </DefaultForm >
        </div>
    )
}