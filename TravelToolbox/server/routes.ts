import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertPromoCodeSchema, insertDelayReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Promo codes routes
  app.get("/api/promo-codes", async (req, res) => {
    try {
      const promoCodes = await storage.getAllPromoCodes();
      res.json(promoCodes);
    } catch (error) {
      console.error("Error fetching promo codes:", error);
      res.status(500).json({ error: "Failed to fetch promo codes" });
    }
  });

  app.post("/api/promo-codes", async (req, res) => {
    try {
      const validatedData = insertPromoCodeSchema.parse(req.body);
      const promoCode = await storage.createPromoCode(validatedData);
      res.json(promoCode);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating promo code:", error);
        res.status(500).json({ error: "Failed to create promo code" });
      }
    }
  });

  app.get("/api/promo-codes/:airline", async (req, res) => {
    try {
      const airline = req.params.airline;
      const promoCodes = await storage.getPromoCodesByAirline(airline);
      res.json(promoCodes);
    } catch (error) {
      console.error("Error fetching promo codes by airline:", error);
      res.status(500).json({ error: "Failed to fetch promo codes" });
    }
  });

  // Delay reports routes
  app.get("/api/delay-reports", async (req, res) => {
    try {
      const delayReports = await storage.getAllDelayReports();
      res.json(delayReports);
    } catch (error) {
      console.error("Error fetching delay reports:", error);
      res.status(500).json({ error: "Failed to fetch delay reports" });
    }
  });

  app.post("/api/delay-reports", async (req, res) => {
    try {
      const validatedData = insertDelayReportSchema.parse(req.body);
      const delayReport = await storage.createDelayReport(validatedData);
      res.json(delayReport);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating delay report:", error);
        res.status(500).json({ error: "Failed to create delay report" });
      }
    }
  });

  app.get("/api/delay-reports/:airline", async (req, res) => {
    try {
      const airline = req.params.airline;
      const delayReports = await storage.getDelayReportsByAirline(airline);
      res.json(delayReports);
    } catch (error) {
      console.error("Error fetching delay reports by airline:", error);
      res.status(500).json({ error: "Failed to fetch delay reports" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
