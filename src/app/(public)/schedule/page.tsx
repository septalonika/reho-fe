"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Clock } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useAuthStore, type AuthUser } from "@/lib/store/auth.store";
import { useUIStore } from "@/lib/store/ui.store";

const mockSchedule = [
  {
    id: "s1",
    title: "Ibadah Pagi",
    time: "07:00",
    roles: [
      { role: "Pengkhotbah", person: "Pdt. Yohanes Sutrisno" },
      { role: "Worship Leader", person: "Maria Lestari" },
      { role: "Musisi", person: "Andi Pratama, Budi Kurniawan" },
      { role: "Usher", person: "Sari Dewi, Rini Sari" },
      { role: "Multimedia", person: "Tono Wijaya" },
    ],
  },
  {
    id: "s2",
    title: "Ibadah Sore",
    time: "17:00",
    roles: [
      { role: "Pengkhotbah", person: "Pdt. Yohanes Sutrisno" },
      { role: "Worship Leader", person: "Dewi Kartika" },
      { role: "Musisi", person: "Hendra Putra" },
      { role: "Usher", person: "Toni Santoso" },
      { role: "Multimedia", person: "Lisa Permata" },
    ],
  },
];

const mockMyAssignment = {
  id: "a1",
  serviceTitle: "Ibadah Pagi",
  date: "Min, 29 Jun 2026",
  role: "Musisi",
  status: "pending" as const,
};

function MyServingCard({ user }: { user: AuthUser | null }) {
  const [declineOpen, setDeclineOpen] = useState(false);
  const [reason, setReason] = useState("");
  const qc = useQueryClient();

  const rsvpMutation = useMutation({
    mutationFn: async (status: "accepted" | "declined") => {
      await new Promise((r) => setTimeout(r, 300));
      return status;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-assignment"] }),
  });

  if (!user) return null;

  return (
    <>
      <section className="px-4 mb-5">
        <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-2">Pelayananku</p>
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-ink">{mockMyAssignment.serviceTitle}</p>
              <p className="text-xs text-ink-muted">{mockMyAssignment.date} · {mockMyAssignment.role}</p>
            </div>
            <Badge variant="pending">Menunggu</Badge>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              onClick={() => rsvpMutation.mutate("accepted")}
              disabled={rsvpMutation.isPending}
              className="flex-1"
            >
              Terima
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDeclineOpen(true)}
              className="flex-1"
            >
              Tolak
            </Button>
          </div>
        </div>
      </section>

      <Sheet open={declineOpen} onOpenChange={setDeclineOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Alasan penolakan</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <Input
              placeholder="Tuliskan alasanmu…"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </SheetBody>
          <SheetFooter>
            <Button variant="outline" onClick={() => setDeclineOpen(false)}>Batal</Button>
            <Button
              onClick={() => {
                rsvpMutation.mutate("declined");
                setDeclineOpen(false);
              }}
            >
              Kirim
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function SchedulePage() {
  const { user } = useAuthStore();
  const { openAuthSheet } = useUIStore();

  const { data: schedule, isPending } = useQuery({
    queryKey: ["schedule", "week"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockSchedule;
    },
  });

  return (
    <div className="py-4">
      <div className="px-4 mb-4">
        <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-0.5">Jadwal Pelayanan</p>
        <h1 className="font-serif text-xl text-ink tracking-tight">Minggu, 29 Juni 2026</h1>
      </div>

      <MyServingCard user={user} />

      <section className="px-4">
        <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-2">Petugas Minggu Ini</p>
        {isPending ? (
          <div className="space-y-3">
            <Skeleton className="h-[150px] w-full" />
            <Skeleton className="h-[150px] w-full" />
          </div>
        ) : (
          <div className="space-y-3">
            {schedule!.map((svc) => (
              <div key={svc.id} className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
                  <Clock size={14} className="text-ink-muted" />
                  <span className="text-sm font-medium text-ink">{svc.title}</span>
                  <span className="text-xs text-ink-muted ml-auto">{svc.time}</span>
                </div>
                <div className="divide-y divide-border">
                  {svc.roles.map((r) => (
                    <div key={r.role} className="flex items-center px-4 py-2.5 gap-3">
                      <span className="text-[10px] text-ink-muted uppercase tracking-wide w-24 shrink-0">
                        {r.role}
                      </span>
                      <span className="text-sm text-ink-2">{r.person}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!user && (
          <button
            onClick={() => openAuthSheet()}
            className="mt-4 w-full text-xs text-ink-muted border border-dashed border-border rounded-lg py-3 hover:border-ink-muted transition-colors"
          >
            Masuk untuk melihat jadwal pelayananmu
          </button>
        )}
      </section>
    </div>
  );
}
