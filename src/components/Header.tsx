"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="shadow dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            <span className="font-bold text-primary">Signal</span>Check
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {user.firstName}</span>
              <SignOutButton>
                <Button variant="destructive">Sign Out</Button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
