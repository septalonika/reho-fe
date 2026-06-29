import { z } from "zod";

export const devotionalSchema = z.object({
  id: z.string(),
  date: z.string(),
  scripture: z.string().min(1),
  scriptureText: z.string().min(1),
  reflection: z.string().min(1),
  author: z.string().optional(),
});

export type Devotional = z.infer<typeof devotionalSchema>;