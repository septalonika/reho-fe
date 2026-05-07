"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  UserCircle, 
  Calendar, 
  DollarSign,
  FileEdit
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

export function RecentActivity() {
  return (
    <motion.div
      className="col-span-1 lg:col-span-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-none shadow-sm h-full overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-heading font-semibold">Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.id} 
                className="flex gap-4 relative"
                variants={itemVariants}
              >
                {index !== activities.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-[-24px] w-[0.5px] bg-border" />
                )}
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform hover:scale-110",
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
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

