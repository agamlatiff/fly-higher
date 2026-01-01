"use client";
import FlightItem from "./FlightItem";
import { useContext } from "react";
import { flightContext, type FContext } from "../providers/FlightProvider";
import LoadingListFlights from "./LoadingListFlights";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ListFlights = () => {
  const { flights, isLoading } = useContext(flightContext) as FContext;

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
            <Link href="/">
              <Button variant="accent" size="lg">
                Modify Search
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {flights.map((val, index) => (
        <FlightItem key={val.id} data={val} isBestValue={index === 0} />
      ))}

      {flights.length > 0 && (
        <div className="flex justify-center pt-8">
          <p className="text-gray-400 font-medium text-sm">
            You&apos;ve reached the end of results.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListFlights;

