import { ProfileForm } from "@/components/ProfileForm";
import { useAuthContext } from "@/context/authContext/useAuthContext";
import { Navigate } from "react-router-dom";

export function Profile() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <ProfileForm />;
}
