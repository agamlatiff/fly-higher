import type { Metadata } from "next";
import FormAirplane from "../_components/FormAirplane";

export const metadata: Metadata = {
  title: "Dashboard | Create data airplanes",
};


const CreateAirplanePage = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold"> Add Data Airplane</div>
      </div>
      <FormAirplane type="ADD"/>
    </div>
  );
};

export default CreateAirplanePage;
