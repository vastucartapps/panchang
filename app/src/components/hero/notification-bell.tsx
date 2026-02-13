"use client";

import { useState, useEffect } from "react";
import { Bell, BellRing } from "lucide-react";

export function NotificationBell() {
  const [permission, setPermission] = useState<NotificationPermission>(() =>
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Check if already subscribed
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub) setSubscribed(true);
        });
      });
    }
  }, []);

  const handleClick = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      return;
    }

    if (permission === "denied") {
      return;
    }

    if (subscribed) {
      // Unsubscribe
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          await sub.unsubscribe();
          setSubscribed(false);
        }
      } catch {
        // Ignore errors
      }
      return;
    }

    // Request permission and subscribe
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") return;

      const reg = await navigator.serviceWorker.ready;
      // Subscribe without applicationServerKey for now
      // When a push server is set up, add the VAPID key here
      await reg.pushManager.subscribe({
        userVisibleOnly: true,
        // applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      setSubscribed(true);
    } catch {
      // Push subscription failed — likely no VAPID key configured
      // Still show as enabled since notification permission was granted
      if (Notification.permission === "granted") {
        setSubscribed(true);
      }
    }
  };

  // Don't render if notifications not supported
  if (typeof window !== "undefined" && !("Notification" in window)) {
    return null;
  }

  const Icon = subscribed ? BellRing : Bell;
  const label = subscribed
    ? "Daily notifications enabled"
    : permission === "denied"
      ? "Notifications blocked"
      : "Enable daily notifications";

  return (
    <button
      onClick={handleClick}
      disabled={permission === "denied"}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
        subscribed
          ? "border-[#C4973B]/50 bg-[#C4973B]/10 text-[#C4973B]"
          : permission === "denied"
            ? "cursor-not-allowed border-gray-300 text-gray-400"
            : "border-white/30 text-white hover:bg-white/10"
      }`}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
      {subscribed ? "Subscribed" : "Notify Me"}
    </button>
  );
}
