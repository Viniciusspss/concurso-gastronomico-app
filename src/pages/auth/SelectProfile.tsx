import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearError } from "@/store/slices/authSlice";
import { Link } from "react-router-dom";

export function SelectProfile() {
  const dispatch = useAppDispatch()
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-medium">
        Escolha como deseja realizar login
      </h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <Button className="w-60 shadow-lg" asChild>
          <Link to="/SignIn/Restaurant">Restaurante</Link>
        </Button>
        <Button className="w-60 shadow-lg" onClick={() => dispatch(clearError())} asChild>
          <Link to="/SignIn/User">Cliente</Link>
        </Button>
      </div>
    </div>
  );
}
