import { SideNavBar } from "@/components/layout/SideNavBar";
import { TopNavBar } from "@/components/layout/TopNavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] admin-bg">
      <SideNavBar />
      <TopNavBar />
      {/* pl matches sidebar width (w-52 = 13rem), responsive for collapsed */}
      <main className="pt-14 pl-52 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[100dvh]">
        <div className="p-7 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
