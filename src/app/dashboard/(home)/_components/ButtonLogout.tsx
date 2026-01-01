"use client";

import { logout } from "../lib/actions";

const ButtonLogout = () => {

  const handleLogout = async () => {
    await logout();
  };

  return (
    <form action={handleLogout}>
      <button
        type="submit"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
      >
        <span className="material-symbols-outlined text-xl">logout</span>
        <span className="font-medium">Logout</span>
      </button>
    </form>
  );
};

export default ButtonLogout;
