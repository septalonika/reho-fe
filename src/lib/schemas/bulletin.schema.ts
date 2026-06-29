import { z } from "zod";

export const liturgyItemSchema = z.object({
  order: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().optional(),
  officiant: z.string().optional(),
});

export const bulletinSchema = z.object({
  id: z.string(),
  weekDate: z.string(),
  title: z.string().min(1, "Judul wajib diisi"),
  theme: z.string().optional(),
  liturgy: z.array(liturgyItemSchema),
  announcements: z.array(
    z.object({ id: z.string(), text: z.string(), imageUrl: z.string().optional() })
  ),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().optional(),
});

export const prayerRequestSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  request: z.string().min(10, "Permohonan minimal 10 karakter"),
  isAnonymous: z.boolean().default(false),
});

export type Bulletin = z.infer<typeof bulletinSchema>;
export type LiturgyItem = z.infer<typeof liturgyItemSchema>;
export type PrayerRequest = z.infer<typeof prayerRequestSchema>;