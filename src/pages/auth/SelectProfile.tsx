import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SelectProfile() {

    return (
        <div>
            <h1 className="mb-4 text-2xl font-medium">Escolha como deseja realizar login</h1>
            <div className="flex flex-col gap-4 justify-center items-center">
                <Button className="bg-amber-50 w-60 shadow-lg" asChild>
                    <Link to="/">Restaurante</Link>
                </Button>
                <Button className="bg-amber-50 w-60 shadow-lg" asChild>
                    <Link to="/SignIn">Cliente</Link>
                </Button>
            </div>
        </div>
    )
}