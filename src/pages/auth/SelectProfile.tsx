import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SelectProfile() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-medium">
        Escolha como deseja realizar login
      </h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <Button className="w-60 shadow-lg" variant="beige" asChild>
          <Link to="/SignIn/Restaurant">Restaurante</Link>
        </Button>
        <Button className="w-60 shadow-lg" variant="beige" asChild>
          <Link to="/SignIn/User">Cliente</Link>
        </Button>
      </div>
    </div>
  );
}
