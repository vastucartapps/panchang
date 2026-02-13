"use client";

import { useEffect } from "react";

/**
 * Reports Core Web Vitals to Google Analytics.
 * Uses the native PerformanceObserver API (no extra dependencies).
 */
export function WebVitalsReporter() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          window.gtag!("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "LCP",
            value: Math.round(last.startTime),
            non_interaction: true,
          });
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Not supported
    }

    // First Input Delay / Interaction to Next Paint
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as PerformanceEventTiming;
          if (e.processingStart) {
            window.gtag!("event", "web_vitals", {
              event_category: "Web Vitals",
              event_label: "FID",
              value: Math.round(e.processingStart - e.startTime),
              non_interaction: true,
            });
          }
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });
    } catch {
      // Not supported
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
            clsValue += (entry as unknown as { value: number }).value;
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });

      // Report CLS on page hide
      const reportCLS = () => {
        if (window.gtag) {
          window.gtag("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "CLS",
            value: Math.round(clsValue * 1000),
            non_interaction: true,
          });
        }
      };
      addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") reportCLS();
      });
    } catch {
      // Not supported
    }
  }, []);

  return null;
}
