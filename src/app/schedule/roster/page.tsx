"use client";

import * as React from "react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import {
  Plus,
  Calendar as CalendarIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// --- Types ---

interface Musician {
  role: string;
  name: string;
}

interface RosterItem {
  id: string;
  date: string;
  serviceName: string;
  wl: string;
  musicians: Musician[];
  singers: string[];
  ushers: string;
  collectors: string;
  multi: string;
}

// --- Mock Data ---

const mockRosterData: RosterItem[] = [
  {
    id: "1",
    date: "01 Okt 2023",
    serviceName: "Ibadah Raya 1 (07:00)",
    wl: "Daniel K.",
    musicians: [
      { role: "Keyboard", name: "Sarah" },
      { role: "Gitar", name: "Yohanes" },
    ],
    singers: ["Maria", "Ruth"],
    ushers: "Tim A (4 org)",
    collectors: "Bpk. Anton",
    multi: "Joshua",
  },
  {
    id: "2",
    date: "01 Okt 2023",
    serviceName: "Ibadah Raya 2 (09:30)",
    wl: "Budi Santoso",
    musicians: [
      { role: "Keyboard", name: "Kevin" },
      { role: "Drum", name: "Michael" },
    ],
    singers: ["Budi Santoso", "Lydia"],
    ushers: "Tim B (4 org)",
    collectors: "Ibu Rini",
    multi: "Andreas",
  },
  {
    id: "3",
    date: "08 Okt 2023",
    serviceName: "Ibadah Raya 1 (07:00)",
    wl: "Priscilla",
    musicians: [
      { role: "Keyboard", name: "David" },
      { role: "Bass", name: "Samuel" },
    ],
    singers: ["Ester", "Hana"],
    ushers: "Tim C (4 org)",
    collectors: "Bpk. Budi",
    multi: "Titus",
  },
  {
    id: "4",
    date: "08 Okt 2023",
    serviceName: "Ibadah Raya 2 (09:30)",
    wl: "Stephanus",
    musicians: [
      { role: "Keyboard", name: "Clara" },
      { role: "Gitar", name: "Albert" },
    ],
    singers: ["Rachel", "Naomi"],
    ushers: "Tim D (4 org)",
    collectors: "Ibu Santi",
    multi: "Markus",
  },
];

// --- Helpers ---

const checkConflict = (item: RosterItem, name: string) => {
  let occurrences = 0;
  if (item.wl === name) occurrences++;
  if (item.musicians.some((m) => m.name === name)) occurrences++;
  if (item.singers.includes(name)) occurrences++;
  if (item.multi === name) occurrences++;
  return occurrences > 1;
};

// --- Components ---

export default function RosterPage() {
  const [periode, setPeriode] = useQueryState(
    "periode",
    parseAsString.withDefault("1 - 31 Okt 2023"),
  );
  const [serviceType, setServiceType] = useQueryState(
    "jenis",
    parseAsString.withDefault("Semua Ibadah"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Roster Pelayanan
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage service schedules and volunteer assignments.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-5 w-5" />
          Buat Roster
        </Button>
      </div>

      {/* Filter Section */}
      <div className="bg-card border rounded-xl p-4 shadow-sm flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-2 flex-1 min-w-[240px]">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Periode
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={periode || ""}
              onChange={(e) => setPeriode(e.target.value)}
              className="pl-10 h-10 bg-muted/20"
              placeholder="Pilih periode..."
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Jenis Ibadah
          </label>
          <Select value={serviceType || ""} onValueChange={setServiceType}>
            <SelectTrigger className="h-10 bg-muted/20">
              <SelectValue placeholder="Pilih jenis ibadah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua Ibadah">Semua Ibadah</SelectItem>
              <SelectItem value="Ibadah Raya Minggu">
                Ibadah Raya Minggu
              </SelectItem>
              <SelectItem value="Ibadah Pemuda">Ibadah Pemuda</SelectItem>
              <SelectItem value="Sekolah Minggu">Sekolah Minggu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="h-10 gap-2 text-muted-foreground">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Table Section */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[140px]">Tanggal</TableHead>
                <TableHead>Ibadah</TableHead>
                <TableHead>WL</TableHead>
                <TableHead>Pemusik</TableHead>
                <TableHead>Singer</TableHead>
                <TableHead>Usher</TableHead>
                <TableHead>Kolektan</TableHead>
                <TableHead>Multi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRosterData.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/10 transition-colors group"
                >
                  <TableCell className="font-medium text-primary whitespace-nowrap">
                    {item.date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.serviceName}
                  </TableCell>

                  {/* WL */}
                  <TableCell>
                    {checkConflict(item, item.wl) ? (
                      <div className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive px-2 py-0.5 rounded border border-destructive/20 text-sm font-medium">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>{item.wl}</span>
                      </div>
                    ) : (
                      <span className="text-sm">{item.wl}</span>
                    )}
                  </TableCell>

                  {/* Pemusik */}
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      {item.musicians.map((m, idx) => (
                        <div key={idx} className="flex gap-1">
                          <span className="text-muted-foreground">
                            {m.role}:
                          </span>
                          {checkConflict(item, m.name) ? (
                            <span className="text-destructive font-semibold">
                              {m.name}
                            </span>
                          ) : (
                            <span className="text-foreground/90">{m.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* Singer */}
                  <TableCell>
                    <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                      {item.singers.map((s, idx) => (
                        <React.Fragment key={idx}>
                          {checkConflict(item, s) ? (
                            <div className="inline-flex items-center gap-1 bg-destructive/10 text-destructive px-1.5 py-0.5 rounded border border-destructive/20 text-xs font-medium">
                              <AlertTriangle className="h-3 w-3" />
                              <span>{s}</span>
                            </div>
                          ) : (
                            <span className="text-sm">{s}</span>
                          )}
                          {idx < item.singers.length - 1 && (
                            <span className="text-muted-foreground">,</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </TableCell>

                  {/* Usher */}
                  <TableCell className="text-sm whitespace-nowrap">
                    {item.ushers}
                  </TableCell>

                  {/* Kolektan */}
                  <TableCell className="text-sm whitespace-nowrap">
                    {item.collectors}
                  </TableCell>

                  {/* Multi */}
                  <TableCell className="text-sm whitespace-nowrap">
                    {item.multi}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-muted/10 px-4 py-3 border-t flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Showing 4 of 24 schedules
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, (p || 1) - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => (p || 1) + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
