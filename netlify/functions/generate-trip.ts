import { generateTripItinerary } from "../../server/services/gemini.ts";

export default async function handler(event: any) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    const tripData = JSON.parse(event.body || "{}");

    const result = await generateTripItinerary(tripData);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
      headers: { "Content-Type": "application/json" },
    };
  }
}

