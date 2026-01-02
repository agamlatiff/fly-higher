import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "title" | "card" | "avatar" | "button"
}

function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-800",
        variant === "default" && "rounded-md",
        variant === "text" && "h-4 rounded",
        variant === "title" && "h-8 rounded-lg",
        variant === "card" && "h-48 rounded-2xl",
        variant === "avatar" && "h-12 w-12 rounded-full",
        variant === "button" && "h-10 w-24 rounded-full",
        className
      )}
      {...props}
    />
  )
}

// Pre-composed skeleton patterns for common use cases
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800", className)}>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="avatar" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-1/3" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
      <Skeleton variant="text" className="w-full mb-2" />
      <Skeleton variant="text" className="w-4/5 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton variant="title" className="w-24" />
        <Skeleton variant="button" />
      </div>
    </div>
  )
}

function SkeletonFlightCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" className="h-10 w-10" />
          <Skeleton variant="text" className="w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <Skeleton variant="title" className="w-16 mx-auto mb-1" />
          <Skeleton variant="text" className="w-12 mx-auto" />
        </div>
        <div className="flex-1 mx-4">
          <Skeleton variant="text" className="w-full" />
        </div>
        <div className="text-center">
          <Skeleton variant="title" className="w-16 mx-auto mb-1" />
          <Skeleton variant="text" className="w-12 mx-auto" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="title" className="w-28" />
      </div>
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonFlightCard }

