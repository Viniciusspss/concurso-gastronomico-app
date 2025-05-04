import { EditProfileForm } from "@/components/EditProfileForm";
import { useAuthContext } from "@/context/authContext/useAuthContext";
import { Navigate } from "react-router-dom";

export function EditProfile() {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <EditProfileForm />;
}
