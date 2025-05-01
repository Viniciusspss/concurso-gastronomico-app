import { DefaultForm } from "@/components/DefaultForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignIn() {
    return (
        <div >
            <Button variant="dark" className="absolute left-8 top-8" asChild><Link to="/">Escolher outro tipo de login</Link></Button>
            <DefaultForm>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <Label htmlFor="email">CNPJ:</Label>
                        <Input id="email" type="email" placeholder="Digite seu CNPJ" />
                    </div>
                    <div className="flex gap-1">
                        <Label htmlFor="password">Senha:</Label>
                        <Input id="password" type="password" placeholder="Digite sua senha" />
                    </div>
                    <p className="text-xs">Ainda não tenho uma conta. <Link to="/SignUp/Restaurant" className="font-bold text-red-500">Criar conta</Link></p>

                </div>
                <Button className="rounded-xl" variant="dark">Conecte-se</Button>
            </DefaultForm>
        </div>
    )
}