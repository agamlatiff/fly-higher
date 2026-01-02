"use client";
import FlightItem from "./FlightItem";
import { useContext } from "react";
import { flightContext, type FContext } from "../providers/FlightProvider";
import LoadingListFlights from "./LoadingListFlights";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ListFlights = () => {
  // Cast types correctly
  const { flights, isLoading, state, totalPages, setPage } = useContext(flightContext) as FContext;

  if (isLoading) {
    return <LoadingListFlights />;
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
        <EmptyState
          icon="plane"
          title="No flights found"
          description="We couldn't find any flights matching your search criteria. Try adjusting your dates or destination."
          action={
            <Link href="/available-flights">
              <Button variant="default" size="lg">
                Reset Search
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const handlePrevious = () => {
    if (state.page > 1) {
      setPage(state.page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (state.page < totalPages) {
      setPage(state.page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {flights.map((val, index) => (
        <FlightItem key={val.id} data={val} isBestValue={index === 0 && state.page === 1} />
      ))}

      {flights.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Showing page <span className="text-gray-900 dark:text-white font-bold">{state.page}</span> of{" "}
            <span className="text-gray-900 dark:text-white font-bold">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={state.page <= 1}
              className="rounded-lg font-medium"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={state.page >= totalPages}
              className="rounded-lg font-medium"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFlights;

