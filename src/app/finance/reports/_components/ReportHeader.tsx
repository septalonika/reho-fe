"use client";

import * as React from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { 
  FileDown, 
  Table as TableIcon,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ReportHeader() {
  const [month, setMonth] = useQueryState("month", parseAsInteger.withDefault(12));
  const [year, setYear] = useQueryState("year", parseAsInteger.withDefault(2023));

  const months = [
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  const years = [
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Laporan Keuangan</h1>
        <p className="text-muted-foreground mt-1">Ringkasan aktivitas finansial dan arus kas operasional.</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        {/* Filters */}
        <div className="flex items-center gap-2 bg-card border border-border/50 rounded-lg p-1 shadow-sm">
          <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
            <SelectTrigger className="w-[130px] border-none bg-transparent focus:ring-0">
              <SelectValue placeholder="Bulan" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value.toString()}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="w-px h-6 bg-border/50" />
          
          <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
            <SelectTrigger className="w-[100px] border-none bg-transparent focus:ring-0">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y.value} value={y.value.toString()}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-primary">
            <FileDown size={18} />
            PDF
          </Button>
          <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
            <TableIcon size={18} />
            Excel
          </Button>
        </div>
      </div>
    </div>
  );
}
