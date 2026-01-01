import type { Metadata } from "next";
import FormFlight from "../../components/FormFlight";
import { getAirplanes } from "../../../airplanes/lib/data";
import type { FC } from "react";
import { getFlightById } from "../../lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Edit data flights",
};

type Params = {
  id: string;
};

interface EditFlightPageProps {
  params: Params;
}

const EditFlightPage: FC<EditFlightPageProps> = async ({ params }) => {
  const airplane = await getAirplanes();
  const flight = await getFlightById(params.id);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold"> Edit Data Flight</div>
      </div>
      <FormFlight type="EDIT" airplane={airplane.data} defaultValues={flight} />
    </div>
  );
};

export default EditFlightPage;
