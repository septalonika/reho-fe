import { create } from "zustand";

interface UIState {
  moreSheetOpen: boolean;
  authSheetOpen: boolean;
  authSheetCallback: (() => void) | null;
  adminSidebarCollapsed: boolean;
  setMoreSheetOpen: (open: boolean) => void;
  openAuthSheet: (callback?: () => void) => void;
  closeAuthSheet: () => void;
  toggleAdminSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  moreSheetOpen: false,
  authSheetOpen: false,
  authSheetCallback: null,
  adminSidebarCollapsed: false,
  setMoreSheetOpen: (open) => set({ moreSheetOpen: open }),
  openAuthSheet: (callback) =>
    set({ authSheetOpen: true, authSheetCallback: callback ?? null }),
  closeAuthSheet: () =>
    set({ authSheetOpen: false, authSheetCallback: null }),
  toggleAdminSidebar: () =>
    set((s) => ({ adminSidebarCollapsed: !s.adminSidebarCollapsed })),
}));