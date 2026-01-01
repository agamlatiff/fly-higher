import { getAirplanes } from "../../lib/data";
import CheckboxAirline from "./CheckboxAirline";

const FilterAirline = async () => {
  const airplanes = await getAirplanes();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-900 dark:text-white text-sm font-bold mb-1">Airlines</p>
      {airplanes.map((item, index) => (
        <CheckboxAirline key={index + item.id} item={item} />
      ))}
    </div>
  );
};

export default FilterAirline;
