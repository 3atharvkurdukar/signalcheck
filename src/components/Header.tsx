"use client";

import { Bell } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">MyApp Status</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Subscribe to updates</span>
          </button>
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.firstName}
              </span>
              <SignOutButton>
                <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
