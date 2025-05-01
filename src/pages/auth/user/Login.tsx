import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
    return (
        <div >
            <form className="flex flex-col gap-6 w-100">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" type="email" placeholder="Digite seu email" />
                    </div>
                    <div className="flex gap-1">
                        <Label htmlFor="password">Senha:</Label>
                        <Input id="password" type="password" placeholder="Digite sua senha" />
                    </div>
                    <p className="text-xs">Ainda não tenho uma conta. <a href="http://" className="font-bold text-red-500">Criar conta</a></p>

                </div>
                <Button variant="dark">Conecte-se</Button>
            </form>
        </div>
    )
}