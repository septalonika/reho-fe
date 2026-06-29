import {
  Book,
  Cross,
  CalendarBlank,
  CurrencyDollar,
  type Icon,
} from "@phosphor-icons/react";

export interface PublicNavItem {
  href: string;
  label: string;
  icon: Icon;
}

export const PUBLIC_NAV: PublicNavItem[] = [
  { href: "/", label: "Warta", icon: Book },
  { href: "/devotional", label: "Renungan", icon: Cross },
  { href: "/schedule", label: "Jadwal", icon: CalendarBlank },
  { href: "/finance", label: "Keuangan", icon: CurrencyDollar },
];
