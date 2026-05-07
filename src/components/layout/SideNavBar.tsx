"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Wallet, 
  Settings, 
  LogOut,
  Church
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "CMS", href: "/dashboard/cms", icon: FileText },
  { name: "Jadwal", href: "/dashboard/jadwal", icon: Calendar },
  { name: "Keuangan", href: "/dashboard/keuangan", icon: Wallet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SideNavBar({ className }: { className?: string }) {
  const pathname = usePathname();

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
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
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
