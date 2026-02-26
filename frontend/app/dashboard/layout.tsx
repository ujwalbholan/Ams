"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { tokenService } from "@/lib/token";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    tokenService.clearToken();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:text-blue-400">
            Dashboard Home
          </Link>
          <Link href="/dashboard/users" className="hover:text-blue-400">
            Users
          </Link>
          <Link href="/dashboard/artists" className="hover:text-blue-400">
            Artists
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 py-2 rounded"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
