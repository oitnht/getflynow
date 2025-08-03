import { generateTripItinerary } from "../../server/services/gemini.ts"; // Adjust path as needed

export default async function handler(req: Request) {
  try {
    const body = await req.json();

    const result = await generateTripItinerary(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
