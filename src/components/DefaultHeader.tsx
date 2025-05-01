import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import userImage from "@/assets/userImage.png"


export function DefaultHeader() {
    return (
        <div className="flex justify-between">
            <div></div>
            <div className="flex gap-4">
                <DefaultButton className="rounded-2xl text-xs">PRATOS</DefaultButton>
                <DefaultButton className="rounded-2xl text-xs">RESTAURANTES</DefaultButton>
                <DefaultButton className="rounded-2xl text-xs">SOBRE</DefaultButton>
            </div>
            <Link to=""><img className="w-6 h-6" src={userImage} alt="Perfil do usuário" /></Link>
        </div>
    )
}