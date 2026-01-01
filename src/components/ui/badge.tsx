import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent",
        accent:
          "bg-accent text-primary",
        success:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        warning:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        error:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        outline:
          "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400",
        glass:
          "bg-white/20 backdrop-blur-sm text-white border border-white/20",
        secondary:
          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        destructive:
          "bg-red-500 text-white",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        default: "text-xs px-3 py-1",
        lg: "text-sm px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  icon?: string; // Material Symbols icon name
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && (
        <span className="material-symbols-outlined text-sm">{icon}</span>
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
