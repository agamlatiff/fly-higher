"use client";

import { useFormStatus } from "react-dom";
import { deleteFlight } from "../lib/actions";
import type { FC } from "react";

interface DeleteFlightProps {
  id: string;
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

const DeleteFlight: FC<DeleteFlightProps> = ({ id }) => {
  const deleteFlightWithId = deleteFlight.bind(null, id);

  return (
    <form action={deleteFlightWithId}>
      <SubmitButton />
    </form>
  );
};

export default DeleteFlight;
