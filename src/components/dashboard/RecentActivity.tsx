import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  UserCircle, 
  Calendar, 
  DollarSign,
  FileEdit
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "cms",
    action: "Banner baru ditambahkan",
    user: "Admin Media",
    time: "2 jam yang lalu",
    icon: PlusCircle,
    color: "text-blue-500 bg-blue-50"
  },
  {
    id: 2,
    type: "keuangan",
    action: "Persembahan dicatat",
    user: "Bendahara",
    time: "4 jam yang lalu",
    icon: DollarSign,
    color: "text-emerald-500 bg-emerald-50"
  },
  {
    id: 3,
    type: "jadwal",
    action: "Jadwal Ibadah diubah",
    user: "Sekretaris",
    time: "6 jam yang lalu",
    icon: Calendar,
    color: "text-amber-500 bg-amber-50"
  },
  {
    id: 4,
    type: "cms",
    action: "Berita renungan diupdate",
    user: "Admin Media",
    time: "Kemarin",
    icon: FileEdit,
    color: "text-purple-500 bg-purple-50"
  },
  {
    id: 5,
    type: "user",
    action: "User baru terdaftar",
    user: "System",
    time: "2 hari yang lalu",
    icon: UserCircle,
    color: "text-slate-500 bg-slate-50"
  }
];

export function RecentActivity() {
  return (
    <Card className="col-span-1 lg:col-span-4 border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg font-heading font-semibold">Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4 relative">
              {index !== activities.length - 1 && (
                <div className="absolute left-5 top-10 bottom-[-24px] w-[1px] bg-border" />
              )}
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                activity.color
              )}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm">
                  <span className="font-bold text-primary">{activity.action}</span> oleh <span className="text-muted-foreground">{activity.user}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
