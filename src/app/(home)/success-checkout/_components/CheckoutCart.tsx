import type { User } from "@/lib/auth";
import type { FC } from "react";
import FlightCard from "../../checkout/_components/FlightCard";

interface CheckoutCardProps {
  user: User | null
}

const CheckoutCart: FC<CheckoutCardProps> = ({ user }) => {
  return <FlightCard user={user} />;
};

export default CheckoutCart;
