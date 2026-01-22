
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clicks = pgTable("clicks", {
  id: serial("id").primaryKey(),
  buttonLabel: text("button_label").notNull(),
  sequenceNumber: integer("sequence_number").notNull(),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

export const insertClickSchema = createInsertSchema(clicks).pick({
  buttonLabel: true,
});

export type Click = typeof clicks.$inferSelect;
export type InsertClick = z.infer<typeof insertClickSchema>;

export type CreateClickRequest = InsertClick;

export type ClickResponse = {
  sequence: number;
  date: string;
  time: string;
  buttonLabel: string;
};
