import { DishsType } from "@/types/dishs";
import pratoImage from "@/assets/pratoImage.jpg"
import { StarIcon } from "lucide-react"

type DishCardProps = {
    dish: DishsType
}

export function DishCard({ dish }: DishCardProps) {
    return (
        <div className="w-auto bg-[#2C2C2C]">
            <div className="w-full h-30 overflow-hidden">
                <img src={pratoImage} alt="Foto do prato" />
            </div>
            <div className="flex flex-col mx-3 my-2 gap-2">
                <h1 className="text-amber-500 font-bold">{dish.title}</h1>
                <p className="text-sm text-amber-100">{dish.description}</p>
                <div className="flex gap-2">
                    <StarIcon className="text-amber-400" />
                    <StarIcon className="text-amber-400" />
                    <StarIcon className="text-amber-400" />
                </div>
            </div>
        </div>
    )
}