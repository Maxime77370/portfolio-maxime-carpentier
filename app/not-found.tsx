import { redirect } from 'next/navigation';

export default function NotFoundRedirect() {
  // Redirect to the home page
  redirect('/en');
}
