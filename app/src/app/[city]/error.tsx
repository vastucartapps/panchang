"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CityError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
      <RefreshCw className="mb-4 h-10 w-10 text-[var(--color-saffron)]" />
      <h1 className="mb-2 text-2xl font-bold text-[var(--color-vedic)]">
        Something Went Wrong
      </h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        We encountered an error loading the Panchang data. This might be a
        temporary issue with our servers.
      </p>
      <Button
        onClick={reset}
        className="gap-2 bg-[var(--color-vedic)] hover:bg-[var(--color-vedic-light)]"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
