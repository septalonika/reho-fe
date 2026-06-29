"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SERVICE_ROLE_LABELS, type ServiceRole } from "@/lib/schemas/schedule.schema";

interface Volunteer {
  id: string;
  name: string;
}

interface Assignment {
  role: ServiceRole;
  volunteerId: string;
  conflict?: string;
}

interface Service {
  id: string;
  title: string;
  time: string;
  assignments: Assignment[];
}

const mockVolunteers: Volunteer[] = [
  { id: "v1", name: "Pdt. Yohanes Sutrisno" },
  { id: "v2", name: "Maria Lestari" },
  { id: "v3", name: "Andi Pratama" },
  { id: "v4", name: "Budi Kurniawan" },
  { id: "v5", name: "Sari Dewi" },
  { id: "v6", name: "Tono Wijaya" },
  { id: "v7", name: "Dewi Kartika" },
];

const mockServices: Service[] = [
  {
    id: "s1",
    title: "Ibadah Pagi",
    time: "07:00",
    assignments: [
      { role: "pengkhotbah", volunteerId: "v1" },
      { role: "worship_leader", volunteerId: "v2" },
      { role: "musisi", volunteerId: "v3", conflict: "Ibadah Sore" },
      { role: "usher", volunteerId: "v5" },
      { role: "multimedia", volunteerId: "v6" },
    ],
  },
  {
    id: "s2",
    title: "Ibadah Sore",
    time: "17:00",
    assignments: [
      { role: "pengkhotbah", volunteerId: "v1" },
      { role: "worship_leader", volunteerId: "v7" },
      { role: "musisi", volunteerId: "v3" },
      { role: "usher", volunteerId: "v4" },
      { role: "multimedia", volunteerId: "v6" },
    ],
  },
];

const ROLES: ServiceRole[] = ["pengkhotbah", "worship_leader", "musisi", "usher", "multimedia"];

function RosterTable({ service }: { service: Service }) {
  const [assignments, setAssignments] = useState<Assignment[]>(service.assignments);
  const qc = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data: Assignment[]) => {
      await new Promise((r) => setTimeout(r, 500));
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roster"] }),
  });

  const hasConflicts = assignments.some((a) => a.conflict);

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <div>
          <span className="text-sm font-medium text-ink">{service.title}</span>
          <span className="text-xs text-ink-muted ml-2">{service.time}</span>
        </div>
        <Button
          size="sm"
          onClick={() => saveMutation.mutate(assignments)}
          disabled={hasConflicts || saveMutation.isPending}
        >
          {saveMutation.isPending ? "Menyimpan…" : "Simpan"}
        </Button>
      </div>

      <div className="divide-y divide-border">
        {ROLES.map((role) => {
          const assignment = assignments.find((a) => a.role === role);
          const conflict = assignment?.conflict;

          return (
            <div
              key={role}
              className={cn(
                "flex items-center px-4 py-3 gap-3",
                conflict && "bg-accent-red/30"
              )}
            >
              <span className="text-xs text-ink-muted uppercase tracking-wide w-28 shrink-0">
                {SERVICE_ROLE_LABELS[role]}
              </span>
              <select
                className="flex-1 text-sm text-ink bg-white border border-border rounded-md px-3 py-1.5 focus:outline-none focus:border-ink-2 transition-colors"
                value={assignment?.volunteerId ?? ""}
                onChange={(e) => {
                  setAssignments((prev) =>
                    prev.map((a) =>
                      a.role === role ? { ...a, volunteerId: e.target.value, conflict: undefined } : a
                    )
                  );
                }}
              >
                <option value="">— Pilih petugas —</option>
                {mockVolunteers.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
              {conflict && (
                <div className="flex items-center gap-1 text-xs text-[#9F2F2D] shrink-0">
                  <Warning size={14} weight="fill" />
                  <span>Bentrok ({conflict})</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RosterPage() {
  const { data: services, isPending } = useQuery({
    queryKey: ["roster", "week"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockServices;
    },
  });

  return (
    <div>
      <div className="mb-6">
        <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-0.5">Jadwal</p>
        <h1 className="text-2xl font-medium text-ink tracking-tight">Penugasan Roster</h1>
        <p className="text-xs text-ink-muted mt-1">Minggu, 29 Juni 2026</p>
      </div>

      {isPending ? (
        <div className="space-y-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      ) : (
        services!.map((svc) => <RosterTable key={svc.id} service={svc} />)
      )}
    </div>
  );
}
