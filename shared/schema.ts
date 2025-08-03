import { z } from "zod";

// Simple trip request schema - no database needed for free tool
export const tripRequestSchema = z.object({
  budget: z.number().min(100),
  startDate: z.string(),
  endDate: z.string(),
  departureAirport: z.string().length(3),
});

export type TripRequest = z.infer<typeof tripRequestSchema>;


