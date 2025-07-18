import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for basic authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Promo codes table to store user-submitted airline promo codes
export const promoCodes = pgTable("promo_codes", {
  id: serial("id").primaryKey(),
  airline: text("airline").notNull(),
  code: text("code").notNull(),
  description: text("description"),
  submittedBy: text("submitted_by").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Delay reports table to store user-submitted delay reports
export const delayReports = pgTable("delay_reports", {
  id: serial("id").primaryKey(),
  flightNumber: text("flight_number").notNull(),
  airline: text("airline").notNull(),
  route: text("route").notNull(),
  delayMinutes: integer("delay_minutes").notNull(),
  reason: text("reason"),
  reportedBy: text("reported_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const promoCodesRelations = relations(promoCodes, ({ one }) => ({
  user: one(users, {
    fields: [promoCodes.submittedBy],
    references: [users.username],
  }),
}));

export const delayReportsRelations = relations(delayReports, ({ one }) => ({
  user: one(users, {
    fields: [delayReports.reportedBy],
    references: [users.username],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPromoCodeSchema = createInsertSchema(promoCodes).omit({
  id: true,
  createdAt: true,
});

export const insertDelayReportSchema = createInsertSchema(delayReports).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PromoCode = typeof promoCodes.$inferSelect;
export type InsertPromoCode = z.infer<typeof insertPromoCodeSchema>;
export type DelayReport = typeof delayReports.$inferSelect;
export type InsertDelayReport = z.infer<typeof insertDelayReportSchema>;
