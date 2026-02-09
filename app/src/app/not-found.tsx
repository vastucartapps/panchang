import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Home className="mb-4 h-12 w-12 text-[var(--color-saffron)]" />
      <h1 className="mb-2 text-3xl font-bold text-[var(--color-vedic)]">
        Page Not Found
      </h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Head back to today&apos;s Panchang.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[var(--color-vedic)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-vedic-light)]"
      >
        Go to Today&apos;s Panchang
      </Link>
    </div>
  );
}
