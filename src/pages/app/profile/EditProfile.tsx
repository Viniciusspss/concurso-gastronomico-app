import { EditProfileForm } from "@/components/EditClientForm";
import { Helmet } from "react-helmet-async";

export function EditProfile() {
  return (
    <>
      <Helmet title="Editar perfil | Concurso gastronômico" />
      <EditProfileForm />
    </>
  )
}
