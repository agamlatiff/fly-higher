"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButtonForm from "../../_components/SubmitFormButton";
import type { Airplane, Flight } from "@prisma/client";
import { useFormState } from "react-dom";
import { saveFlight, updateFlight } from "../lib/actions";
import type { ActionResult } from "@/app/(auth)/sign-in/lib/actions";
import { dateFormat } from "@/lib/utils";

interface FormFlightProps {
  airplane: Airplane[];
  type?: "ADD" | "EDIT";
  defaultValues?: Flight | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormFlight = ({ airplane, defaultValues = null, type }: FormFlightProps) => {
  const updateFlightWithId = (_: unknown, formData: FormData) =>
    updateFlight(null, formData, defaultValues?.id ?? '');

  const [state, formState] = useFormState(
    type === "ADD" ? saveFlight : updateFlightWithId,
    initialFormState
  );

  return (
    <form className="space-y-6" action={formState}>
      {state?.errorTitle !== null && (
        <div className="my-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="text-lg  mb-1 font-medium">{state.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state.errorDesc?.map((e, index) => (
              <li key={index + e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="planeId">Choose airplane</Label>
          <Select name="planeId" defaultValue={defaultValues?.planeId}>
            <SelectTrigger id="planeId">
              <SelectValue placeholder="Choose airplane" />
            </SelectTrigger>
            <SelectContent>
              {airplane.map((value) => (
                <SelectItem value={value.id} key={value.id}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Ticket Price</Label>
          <Input
            placeholder="Ticket Price..."
            name="price"
            id="price"
            type="number"
            min={0}
            required
            defaultValue={defaultValues?.price}
          />
          <span className="text-xs text-gray-900">
            Price for bussiness class increases Rp 500.000 & First class
            increases Rp 750.000
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Departure City</Label>
          <Input
            defaultValue={defaultValues?.departureCity}
            placeholder="Departure City..."
            name="departureCity"
            id="departureCity"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            defaultValue={defaultValues?.departureDate ? dateFormat(
              defaultValues?.departureDate,
              "YYYY-MM-DDTHH:MM"
            ) : undefined}
            placeholder="Departure Date..."
            name="departureDate"
            id="departureDate"
            required
            type="datetime-local"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Departure City Code</Label>
          <Input
            defaultValue={defaultValues?.departureCityCode}
            placeholder="Departure City Code..."
            name="departureCityCode"
            id="departureCityCode"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Destination City</Label>
          <Input
            defaultValue={defaultValues?.destinationCity}
            placeholder="Destination City..."
            name="destinationCity"
            id="destinationCity"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Arrival Date</Label>
          <Input
            defaultValue={defaultValues?.arrivalDate ? dateFormat(
              defaultValues?.arrivalDate,
              "YYYY-MM-DDTHH:MM"
            ) : undefined}
            placeholder="Arrival Date..."
            name="arrivalDate"
            id="arrivalDate"
            required
            type="datetime-local"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Destination City Code</Label>
          <Input
            defaultValue={defaultValues?.destinationCityCode}
            placeholder="Destination City Code..."
            name="destinationCityCode"
            id="destinationCityCode"
            required
          />
        </div>
      </div>

      <SubmitButtonForm />
    </form>
  );
};

export default FormFlight;
