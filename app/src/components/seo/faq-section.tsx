import { HelpCircle } from "lucide-react";
import type { FaqItem } from "@/lib/faqs";

interface FaqSectionProps {
  faqs: FaqItem[];
  cityName?: string;
}

export function FaqSection({ faqs, cityName }: FaqSectionProps) {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-[var(--color-saffron)]" />
        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          {cityName
            ? `Frequently Asked Questions — ${cityName} Panchang`
            : "Frequently Asked Questions"}
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-lg border bg-card shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-foreground transition-colors hover:text-[var(--color-vedic)] [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="border-t px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
