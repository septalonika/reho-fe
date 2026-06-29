import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicTabBar } from "@/components/layout/PublicTabBar";
import { MoreSheet } from "@/components/layout/MoreSheet";
import { AuthGateSheet } from "@/components/auth/AuthGateSheet";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-canvas">
      <PublicHeader />
      <main className="w-full max-w-7xl mx-auto px-5 md:px-8 pb-24 md:pb-12">
        {children}
      </main>
      <PublicTabBar />
      <MoreSheet />
      <AuthGateSheet />
    </div>
  );
}
