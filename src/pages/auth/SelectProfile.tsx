import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SelectProfile() {

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="mb-4 text-2xl font-medium">Escolha como deseja realizar login</h1>
            <div className="flex flex-col gap-4 justify-center items-center">
                <Button className=" w-60 shadow-lg" asChild>
                    <Link to="/SignIn/Restaurant">Restaurante</Link>
                </Button>
                <Button className=" w-60 shadow-lg" asChild>
                    <Link to="/SignIn/User">Cliente</Link>
                </Button>
            </div>
        </div>
    )
}