import { DefaultButton } from "@/components/DefaultButton";
import { DefaultForm } from "@/components/DefaultForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function Profile() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center w-full max-w-lg px-4">
            <h1 className="text-amber-50 text-2xl">PERFIL</h1>
            <DefaultForm>
                <div className="flex flex-col gap-2 ">
                    <Label className="text-amber-50" htmlFor="firstName">Primeiro Nome:</Label>
                    <Input className="bg-amber-50" id="firstName" placeholder="Primeiro nome do usuário"></Input>
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label className="text-amber-50" htmlFor="lastName">Último Nome:</Label>
                    <Input className="bg-amber-50" id="lastName" placeholder="Último nome do usuário"></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-amber-50" htmlFor="email">Email:</Label>
                    <Input className="bg-amber-50" id="email" placeholder="Email do usuário"></Input>
                </div>
                <div className="flex justify-between">
                    <DefaultButton className="px-4 min-w-[100px] text-xs">EDITAR</DefaultButton>
                    <DefaultButton className="px-4 min-w-[100px] text-xs">EXCLUIR</DefaultButton>
                    <Link to="/Dishs"><DefaultButton className="px-4 min-w-[100px] text-xs">FECHAR</DefaultButton></Link>
                </div>
            </DefaultForm>
        </div>
    )
}