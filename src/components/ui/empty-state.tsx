import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, Inbox, FileX, Plane } from "lucide-react"

type IconType = "search" | "inbox" | "file" | "plane"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconType | React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const iconMap: Record<IconType, React.ElementType> = {
  search: Search,
  inbox: Inbox,
  file: FileX,
  plane: Plane,
}

function EmptyState({
  className,
  icon = "inbox",
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  const isIconString = typeof icon === "string" && icon in iconMap
  const IconComponent = isIconString ? iconMap[icon as IconType] : null

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
        {IconComponent ? (
          <IconComponent className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-lg font-semibold text-text-dark dark:text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export { EmptyState }
