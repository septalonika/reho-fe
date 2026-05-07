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

const schedules = [
  {
    id: 1,
    kegiatan: "Ibadah Minggu Pagi",
    tanggal: "11 Mei 2026",
    waktu: "09:00 WIB",
    status: "Confirmed",
    color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  },
  {
    id: 2,
    kegiatan: "Ibadah Kaum Muda",
    tanggal: "13 Mei 2026",
    waktu: "18:00 WIB",
    status: "Confirmed",
    color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  },
  {
    id: 3,
    kegiatan: "Doa Semalam Suntuk",
    tanggal: "15 Mei 2026",
    waktu: "21:00 WIB",
    status: "Pending",
    color: "bg-amber-100 text-amber-700 hover:bg-amber-100"
  },
  {
    id: 4,
    kegiatan: "Ibadah Minggu Raya",
    tanggal: "18 Mei 2026",
    waktu: "09:00 WIB",
    status: "Confirmed",
    color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  },
  {
    id: 5,
    kegiatan: "Latihan Musik",
    tanggal: "20 Mei 2026",
    waktu: "17:00 WIB",
    status: "Draft",
    color: "bg-slate-100 text-slate-700 hover:bg-slate-100"
  }
];

export function UpcomingSchedule() {
  return (
    <Card className="col-span-1 lg:col-span-8 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-heading font-semibold">Jadwal Terdekat</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-muted">
              <TableHead className="font-semibold text-primary">Kegiatan</TableHead>
              <TableHead className="font-semibold text-primary">Tanggal</TableHead>
              <TableHead className="font-semibold text-primary">Waktu</TableHead>
              <TableHead className="font-semibold text-primary text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((item) => (
              <TableRow key={item.id} className="border-muted/50">
                <TableCell className="font-medium">{item.kegiatan}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.waktu}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className={cn("rounded-full font-normal", item.color)}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Helper function since I'm using cn here
import { cn } from "@/lib/utils";
