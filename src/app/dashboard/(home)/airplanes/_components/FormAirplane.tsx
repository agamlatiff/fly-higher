"use client";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState } from "react-dom";
import { saveAirplane, updateAirplane } from "../lib/actions";
import type { ActionResult } from "@/app/(auth)/sign-in/lib/actions";
import type { Airplane } from "@prisma/client";
import type { FC } from "react";
import SubmitButtonForm from "../../_components/SubmitFormButton";

interface FormAirplaneProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Airplane | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormAirplane: FC<FormAirplaneProps> = ({ type, defaultValues }) => {
  const updateAirplaneWithId = (_: unknown, formData: FormData) =>
    updateAirplane(null, formData, defaultValues?.id ?? "");

  const [state, formState] = useFormState(
    type === "ADD" ? saveAirplane : updateAirplaneWithId,
    initialFormState
  );

  return (
    <form className="w-[40%] space-y-4" action={formState}>
      {state.errorTitle !== null && (
        <div className="my-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="text-lg  mb-1 font-medium">{state.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state.errorDesc?.map((e, index) => (
              <li key={index + e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="code">Airplane Code</Label>
        <Input
          placeholder="AAA-123"
          name="code"
          id="code"
          required
          defaultValue={defaultValues?.code}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Airplane Name</Label>
        <Input
          placeholder="Airplanes Name..."
          name="name"
          id="name"
          required
          defaultValue={defaultValues?.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Photo</Label>
        <Input
          placeholder="Upload Photo..."
          name="image"
          id="image"
          required
          type="file"
        />
      </div>
      <SubmitButtonForm />
    </form>
  );
};

export default FormAirplane;
