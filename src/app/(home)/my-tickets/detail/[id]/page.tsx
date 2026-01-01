import { getDetailTicket } from "../../lib/data";
import Link from "next/link";
import TicketDetailClient from "./_components/TicketDetailClient";

export const dynamic = "force-dynamic";

type Params = {
  id: string;
};

interface DetailTicketProps {
  params: Params;
}

const DetailTicketPage = async ({ params }: DetailTicketProps) => {
  const data = await getDetailTicket(params.id);

  if (!data) {
    return (
      <div className="bg-background dark:bg-background-dark min-h-screen font-display flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-dark dark:text-white">Ticket not found</h1>
          <Link
            href="/my-tickets"
            className="text-sky-primary hover:underline mt-4 inline-block"
          >
            Back to My Tickets
          </Link>
        </div>
      </div>
    );
  }

  return <TicketDetailClient data={data} />;
};

export default DetailTicketPage;
