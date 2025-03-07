import { redirect } from "next/navigation";

export default function NotFoundRedirect() {
  // Redirige vers la page d'accueil
  redirect("/en");
  return null;
}
