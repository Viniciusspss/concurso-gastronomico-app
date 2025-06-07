import { EvaluateDishForm } from "@/components/EvaluateDishForm";
import { Helmet } from "react-helmet-async";

export function EvaluateDish() {
  return (
    <>
      <Helmet title="Avaliar prato | Concurso Gastronômico" />
      <EvaluateDishForm />;
    </>
  )
}
