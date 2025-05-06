import { useAuthContext } from "@/context/authContext/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

export function RestaurantDishes() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (user?.id != id) {
    navigate("/");
    return null;
  }

  if (user && "email" in user) {
    navigate("/");
    return null;
  }
  return (
    <div>
      <h1>DISHES</h1>
    </div>
  );
}
