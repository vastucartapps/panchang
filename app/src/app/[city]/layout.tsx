import { NetworkHeader } from "@/components/layout/network-header";
import { Footer } from "@/components/layout/footer";

export default function CityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NetworkHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
