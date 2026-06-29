import { z } from "zod";

export type ServiceRole = "pengkhotbah" | "worship_leader" | "musisi" | "usher" | "multimedia";

export const SERVICE_ROLE_LABELS: Record<ServiceRole, string> = {
  pengkhotbah: "Pengkhotbah",
  worship_leader: "Worship Leader",
  musisi: "Musisi",
  usher: "Usher",
  multimedia: "Multimedia",
};

export const rosterAssignmentSchema = z.object({
  serviceId: z.string(),
  role: z.enum(["pengkhotbah", "worship_leader", "musisi", "usher", "multimedia"]),
  volunteerId: z.string().min(1, "Petugas wajib dipilih"),
});

export const rsvpSchema = z.object({
  assignmentId: z.string(),
  status: z.enum(["accepted", "declined"]),
  declineReason: z.string().optional(),
}).refine(
  (d) => d.status === "accepted" || (d.status === "declined" && d.declineReason),
  { message: "Alasan penolakan wajib diisi", path: ["declineReason"] }
);

export type RosterAssignment = z.infer<typeof rosterAssignmentSchema>;
export type RSVPInput = z.infer<typeof rsvpSchema>;