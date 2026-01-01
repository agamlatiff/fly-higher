"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { User } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Ticket, User as UserIcon } from "lucide-react";
import { logout } from "@/app/(home)/lib/actions";

import { Skeleton } from "@/components/ui/skeleton";

interface NavbarAuthProps {
  user: User | null;
  showAuth?: boolean;
  isLoading?: boolean;
}

export function NavbarAuth({
  user,
  showAuth = true,
  isLoading = false,
}: NavbarAuthProps) {
  return (
    <nav className="w-full py-6 px-6 max-w-7xl mx-auto flex items-center justify-between z-50 relative">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-primary dark:bg-accent text-white dark:text-primary p-1.5 rounded-lg">
          <span className="material-symbols-outlined text-xl">flight_takeoff</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-primary dark:text-white">
          FlyHigher
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        <Link href="/available-flights" className="hover:text-primary dark:hover:text-accent transition">
          Flights
        </Link>
        <Link href="/destinations" className="hover:text-primary dark:hover:text-accent transition">
          Destinations
        </Link>
        <Link href="/partners" className="hover:text-primary dark:hover:text-accent transition">
          Partners
        </Link>
        <Link href="/support" className="hover:text-primary dark:hover:text-accent transition">
          Support
        </Link>
      </div>

      {/* Auth Buttons & Theme Toggle */}
      <div className="flex items-center gap-3">
        {showAuth && (
          <>
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Skeleton className="w-24 h-5 hidden sm:block bg-white/20" />
                <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/my-tickets"
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition"
                >
                  <Ticket className="w-4 h-4" />
                  My Tickets
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold cursor-pointer hover:bg-primary/20 transition-colors">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile & Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-tickets" className="cursor-pointer">
                        <Ticket className="mr-2 h-4 w-4" />
                        <span>My Tickets</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-500 cursor-pointer"
                      onClick={async () => await logout()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition hidden sm:block"
                >
                  Log In
                </Link>
                <Button asChild size="sm">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </>
        )}
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">menu</span>
        </button>
      </div>
    </nav>
  );
}
