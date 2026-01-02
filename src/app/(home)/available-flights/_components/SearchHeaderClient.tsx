"use client";

import InlineSearchForm from "./InlineSearchForm";

interface SearchHeaderClientProps {
  departure: string;
  arrival: string;
  date: string;
}

const SearchHeaderClient = ({
  departure,
  arrival,
  date,
}: SearchHeaderClientProps) => {
  return (
    <InlineSearchForm
      departure={departure}
      arrival={arrival}
      date={date}
    />
  );
};

export default SearchHeaderClient;
