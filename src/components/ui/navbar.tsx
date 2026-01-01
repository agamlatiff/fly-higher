import { getUser } from "@/lib/auth";
import { NavbarAuth } from "./navbar-auth";

interface NavbarProps {
  showAuth?: boolean;
}

export async function Navbar({ showAuth = true }: NavbarProps) {
  const { user } = await getUser();

  return <NavbarAuth user={user} showAuth={showAuth} />;
}
