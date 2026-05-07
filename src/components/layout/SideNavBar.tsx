"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Wallet, 
  Settings, 
  LogOut,
  Church,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href?: string;
  icon: any;
  subItems?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { 
    name: "CMS", 
    icon: FileText,
    subItems: [
      { name: "Banner & Pengumuman", href: "/dashboard/cms/banner" },
      { name: "Berita & Renungan", href: "/dashboard/cms/news" }
    ] 
  },
  { name: "Jadwal", href: "/dashboard/jadwal", icon: Calendar },
  { name: "Keuangan", href: "/dashboard/keuangan", icon: Wallet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SideNavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({});

  // Auto-expand menu if current path is a sub-item
  React.useEffect(() => {
    const activeParent = navigation.find(item => 
      item.subItems?.some(sub => sub.href === pathname)
    );
    if (activeParent) {
      setExpandedMenus(prev => ({ ...prev, [activeParent.name]: true }));
    }
  }, [pathname]);

  const toggleExpand = (name: string) => {
    setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={cn("flex h-full w-[260px] flex-col bg-primary text-primary-foreground", className)}>
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Church className="h-8 w-8 text-secondary" />
          <span className="font-heading text-xl font-bold tracking-tight text-white">
            GKII <span className="text-secondary">Rehobot</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isExpanded = !!expandedMenus[item.name];
          const hasSubItems = !!item.subItems;
          const isParentActive = hasSubItems && item.subItems?.some(sub => sub.href === pathname);
          const isActive = (item.href && pathname === item.href) || isParentActive;

          if (hasSubItems) {
            return (
              <div key={item.name} className="space-y-1">
                <button
                  onClick={() => toggleExpand(item.name)}
                  className={cn(
                    "w-full group flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "text-white bg-white/5" 
                      : "text-primary-foreground/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("h-5 w-5", isActive ? "text-secondary" : "text-primary-foreground/70 group-hover:text-white")} />
                    {item.name}
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isExpanded ? "rotate-180" : ""
                  )} />
                </button>
                
                {isExpanded && (
                  <div className="ml-8 space-y-1 border-l border-white/10 pl-2">
                    {item.subItems?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-xs font-medium transition-colors",
                            isSubActive 
                              ? "bg-secondary text-primary" 
                              : "text-primary-foreground/60 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href || "#"}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-secondary text-primary" 
                  : "text-primary-foreground/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-primary-foreground/70 group-hover:text-white")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-primary-foreground/70 hover:bg-white/10 hover:text-white px-3"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
