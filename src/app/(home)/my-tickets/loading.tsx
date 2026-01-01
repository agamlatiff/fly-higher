import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingTicketCard from "./_components/LoadingTicketCard";

const Loading = () => {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <NavbarAuth user={null} isLoading={true} />
      </header>

      {/* Header Skeleton */}
      <div className="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-8 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-accent">confirmation_number</span>
            </div>
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-6 w-32 mt-2" />
        </div>
      </div>

      {/* Content Skeleton */}
      <main className="flex-1 max-w-[1200px] mx-auto px-4 md:px-10 py-8 w-full">
        <div className="flex flex-col gap-4">
          <LoadingTicketCard />
          <LoadingTicketCard />
          <LoadingTicketCard />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Loading;
