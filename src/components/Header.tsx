"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">SignalCheck</h1>
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.firstName}
              </span>
              <SignOutButton>
                <Button variant="destructive">Sign Out</Button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
