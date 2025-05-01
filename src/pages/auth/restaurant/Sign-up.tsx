import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignUp() {
    return (
        <DefaultForm >
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">CNPJ:</Label>
                    <Input id="firstName" placeholder="Digite seu CNPJ" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Nome:</Label>
                    <Input id="lastName" placeholder="Digite seu nome" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Senha:</Label>
                    <Input id="password" placeholder="Digite sua senha" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="repeatPassword">Repetir senha:</Label>
                    <Input id="repeatPassword" placeholder="Digite sua senha novamente" />
                </div>
                <p className="text-xs">Já tenho uma conta. <Link to="/SignIn/restaurant" className="font-bold text-red-500">Fazer Login</Link></p>
            </div>
            <Button className="rounded-xl" variant="dark">Cadastre-se</Button>
        </DefaultForm>
    )
}