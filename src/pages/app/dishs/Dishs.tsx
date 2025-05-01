import { DefaultHeader } from "@/components/DefaultHeader";
import { dishs } from './../../../data/dishs';
import { DishCard } from "./Dish-Card";


export function Dishs() {

    return (
        <div className="flex flex-col gap-15">
            <DefaultHeader />
            <div className="grid grid-cols-4 gap-6">
                {dishs && dishs.map((dish, index) => {
                    return <DishCard dish={dish} key={index} />
                })}
            </div>
        </div>
    )
}