import { 
  users, 
  promoCodes, 
  delayReports,
  type User, 
  type InsertUser,
  type PromoCode,
  type InsertPromoCode,
  type DelayReport,
  type InsertDelayReport
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Promo code methods
  getAllPromoCodes(): Promise<PromoCode[]>;
  createPromoCode(insertPromoCode: InsertPromoCode): Promise<PromoCode>;
  getPromoCodesByAirline(airline: string): Promise<PromoCode[]>;
  
  // Delay report methods
  getAllDelayReports(): Promise<DelayReport[]>;
  createDelayReport(insertDelayReport: InsertDelayReport): Promise<DelayReport>;
  getDelayReportsByAirline(airline: string): Promise<DelayReport[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Promo code methods
  async getAllPromoCodes(): Promise<PromoCode[]> {
    return await db
      .select()
      .from(promoCodes)
      .where(eq(promoCodes.isActive, true))
      .orderBy(desc(promoCodes.createdAt));
  }

  async createPromoCode(insertPromoCode: InsertPromoCode): Promise<PromoCode> {
    const [promoCode] = await db
      .insert(promoCodes)
      .values(insertPromoCode)
      .returning();
    return promoCode;
  }

  async getPromoCodesByAirline(airline: string): Promise<PromoCode[]> {
    return await db
      .select()
      .from(promoCodes)
      .where(eq(promoCodes.airline, airline))
      .orderBy(desc(promoCodes.createdAt));
  }

  // Delay report methods
  async getAllDelayReports(): Promise<DelayReport[]> {
    return await db
      .select()
      .from(delayReports)
      .orderBy(desc(delayReports.createdAt));
  }

  async createDelayReport(insertDelayReport: InsertDelayReport): Promise<DelayReport> {
    const [delayReport] = await db
      .insert(delayReports)
      .values(insertDelayReport)
      .returning();
    return delayReport;
  }

  async getDelayReportsByAirline(airline: string): Promise<DelayReport[]> {
    return await db
      .select()
      .from(delayReports)
      .where(eq(delayReports.airline, airline))
      .orderBy(desc(delayReports.createdAt));
  }
}

export const storage = new DatabaseStorage();
