import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="grid h-screen place-content-center bg-background px-4 text-center gap-5">
      <div>
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</p>

        <p className="text-gray-500">We can&apos;t find that page.</p>
      </div>

      <Link href="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}
