import { Button } from "@/components/ui/button";

export function SelectProfile() {

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center bg-[#F2F2F2]">
            <h1 className="mb-4 text-2xl font-medium">Escolha como deseja realizar login</h1>
            <div className="flex flex-col gap-4">
                <Button className="bg-amber-50 w-60 shadow-lg" asChild>
                    <a href="http://">Restaurante</a>
                </Button>
                <Button className="bg-amber-50 w-60 shadow-lg" asChild>
                    <a href="http://">Cliente</a>
                </Button>
            </div>
        </div>
    )
}