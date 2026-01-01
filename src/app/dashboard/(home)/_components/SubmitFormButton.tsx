"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButtonForm = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default SubmitButtonForm;
