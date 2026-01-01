"use client";

import type { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteAirplane } from "../lib/actions";
import type { ActionResult } from "@/app/(auth)/sign-in/lib/actions";

interface DeleteAirplaneProps {
  id: string;
}

const initialState: ActionResult = {
  errorTitle: null,
  errorDesc: []
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
      title="Delete"
    >
      <span className="material-symbols-outlined text-lg">
        {pending ? "hourglass_empty" : "delete"}
      </span>
    </button>
  );
};

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  const deleteAirplaneWithId = async () => {
    return await deleteAirplane(id);
  };

  const [, dispatch] = useFormState(deleteAirplaneWithId, initialState);

  return (
    <form action={dispatch}>
      <SubmitButton />
    </form>
  );
};

export default DeleteAirplane;
