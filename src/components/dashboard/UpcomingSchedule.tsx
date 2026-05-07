"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const schedules = [
  {
    id: 1,
    kegiatan: "Ibadah Minggu Pagi",
    tanggal: "11 Mei 2026",
    waktu: "09:00 WIB",
    status: "Confirmed",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
  },
  {
    id: 2,
    kegiatan: "Ibadah Kaum Muda",
    tanggal: "13 Mei 2026",
    waktu: "18:00 WIB",
    status: "Confirmed",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
  },
  {
    id: 3,
    kegiatan: "Doa Semalam Suntuk",
    tanggal: "15 Mei 2026",
    waktu: "21:00 WIB",
    status: "Pending",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20"
  },
  {
    id: 4,
    kegiatan: "Ibadah Minggu Raya",
    tanggal: "18 Mei 2026",
    waktu: "09:00 WIB",
    status: "Confirmed",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
  },
  {
    id: 5,
    kegiatan: "Latihan Musik",
    tanggal: "20 Mei 2026",
    waktu: "17:00 WIB",
    status: "Draft",
    color: "bg-slate-500/10 text-slate-600 border-slate-500/20"
  }
];

export function UpcomingSchedule() {
  return (
    <motion.div
      className="col-span-1 lg:col-span-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-heading font-semibold">Jadwal Terdekat</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-muted">
                <TableHead className="font-semibold text-primary">Kegiatan</TableHead>
                <TableHead className="font-semibold text-primary text-center">Tanggal</TableHead>
                <TableHead className="font-semibold text-primary text-center">Waktu</TableHead>
                <TableHead className="font-semibold text-primary text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((item) => (
                <TableRow key={item.id} className="border-muted/50 transition-colors hover:bg-muted/30">
                  <TableCell className="font-medium">{item.kegiatan}</TableCell>
                  <TableCell className="text-center">{item.tanggal}</TableCell>
                  <TableCell className="text-center">{item.waktu}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={cn("rounded-full font-medium px-3", item.color)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
