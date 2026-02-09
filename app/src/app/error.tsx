"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-[var(--color-saffron)]" />
      <h1 className="mb-2 text-3xl font-bold text-[var(--color-vedic)]">
        Unexpected Error
      </h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        Something went wrong. Please try again or return to the homepage.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={reset}
          variant="outline"
        >
          Try Again
        </Button>
        <Link href="/">
          <Button className="bg-[var(--color-vedic)] hover:bg-[var(--color-vedic-light)]">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
