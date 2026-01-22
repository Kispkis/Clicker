
import { db } from "./db";
import { clicks, type InsertClick, type Click } from "@shared/schema";
import { sql, and, gte, lt } from "drizzle-orm";

export interface IStorage {
  createClick(click: InsertClick): Promise<Click>;
  getTodaysClicks(): Promise<Click[]>;
}

export class DatabaseStorage implements IStorage {
  async createClick(insertClick: InsertClick): Promise<Click> {
    // Determine the start of the current day in the server's timezone
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Count clicks for today to determine the sequence number
    // We use a transaction or simple query. For simplicity and this scale, 
    // a count query before insert is sufficient, though race conditions 
    // are possible in high concurrency. Given the requirements, this is acceptable.
    
    // We can use SQL count for efficiency
    const [countResult] = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(clicks)
      .where(gte(clicks.clickedAt, startOfDay));
      
    const sequenceNumber = (countResult?.count || 0) + 1;

    const [newClick] = await db
      .insert(clicks)
      .values({
        ...insertClick,
        sequenceNumber: sequenceNumber,
        clickedAt: now
      })
      .returning();

    return newClick;
  }

  async getTodaysClicks(): Promise<Click[]> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return await db
      .select()
      .from(clicks)
      .where(gte(clicks.clickedAt, startOfDay))
      .orderBy(clicks.clickedAt); // Order by time
  }
}

export const storage = new DatabaseStorage();
