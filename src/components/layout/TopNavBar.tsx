"use client";

import { List, SignOut, User } from "@phosphor-icons/react";
import { useUIStore } from "@/lib/store/ui.store";
import { useAuthStore } from "@/lib/store/auth.store";
import { Badge } from "@/components/ui/badge";

const ROLE_LABELS = {
  admin: "Admin",
  staff: "Staf",
  congregation: "Jemaat",
} as const;

export function TopNavBar() {
  const { toggleAdminSidebar, adminSidebarCollapsed } = useUIStore();
  const { user, logout } = useAuthStore();

  return (
    <header
      className="fixed top-0 right-0 left-0 z-20 bg-white/90 backdrop-blur-sm border-b border-black/[0.06] h-14 flex items-center px-4 gap-3 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{ paddingLeft: adminSidebarCollapsed ? "3.75rem" : "13.5rem" }}
    >
      <button
        onClick={toggleAdminSidebar}
        className="text-ink-muted hover:text-ink transition-colors"
      >
        <List size={18} />
      </button>

      <div className="flex-1" />

      {user && (
        <div className="flex items-center gap-3">
          <Badge variant="default" className="hidden sm:inline-flex">
            {ROLE_LABELS[user.role]}
          </Badge>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center">
              <User size={14} className="text-ink-muted" />
            </div>
            <span className="text-sm text-ink hidden sm:block">{user.name}</span>
          </div>
          <button
            onClick={logout}
            className="text-ink-muted hover:text-ink transition-colors"
            title="Keluar"
          >
            <SignOut size={16} />
          </button>
        </div>
      )}
    </header>
  );
}
