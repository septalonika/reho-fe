import { SideNavBar } from "./SideNavBar";
import { TopNavBar } from "./TopNavBar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside className="hidden md:block fixed inset-y-0 left-0 z-40">
        <SideNavBar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-[260px] flex flex-col">
        <TopNavBar />
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
