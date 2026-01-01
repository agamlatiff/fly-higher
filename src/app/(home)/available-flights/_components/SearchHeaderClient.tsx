"use client";

import { useState } from "react";
import EditSearchBar from "./EditSearchBar";
import SearchSummary from "./SearchSummary";

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
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      {/* Search Summary with Filter Pills */}
      <SearchSummary />

      {/* Edit Modal */}
      {showEditModal && (
        <EditSearchBar
          departure={departure}
          arrival={arrival}
          date={date}
          isModalOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default SearchHeaderClient;
