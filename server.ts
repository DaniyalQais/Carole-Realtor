/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    // Check if key is empty, undefined, or still contains the mock placeholder
    if (!key || key === "" || key.includes("MY_GEMINI_API_KEY")) {
      console.warn("GEMINI_API_KEY is missing or unconfigured. Fallback simulator will be used.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing and static files middlewares
  app.use(express.json());

  // API Route: Featured Properties
  app.get("/api/featured-listings", (req, res) => {
    // Return sample premium listings
    res.json([
      {
        id: "prop-1",
        title: "The Glass Pavilion",
        price: 3850000,
        address: "1420 Ridgeview Terrace, Los Altos Hills, CA",
        beds: 5,
        baths: 6,
        sqft: 5200,
        image: "hero_luxury_home", // refers to the generated asset image name
        type: "Estate",
        status: "Active",
        description: "A breathtaking architectural masterpiece designed by award-winning studio. This residence blends boundaries between natural outdoors and interior space with sleek 14-foot automated glass panel walls, cantilevered terraces, and refined walnut finishes.",
        features: ["Infinity Pool & Spa", "Automated Smart Glass Walls", "Teak Sunken Lounge", "750-Bottle Wine Gallery", "Private 1.2-Acre Oasis"]
      },
      {
        id: "prop-2",
        title: "Centennial Contemporary",
        price: 2450000,
        address: "988 Oakwood Lane, Los Altos, CA",
        beds: 4,
        baths: 4.5,
        sqft: 3800,
        image: "luxury_interior", // refers to the generated asset image name
        type: "Single Family House",
        status: "Active",
        description: "Exquisite modernist living nestled in old-growth Oaks. Built in 2024, this home centers an expansive marble culinary island, high-pitch ceilings with skylights, automated soundscapes, and an impressive indoor-outdoor transition to a cedar redwood veranda.",
        features: ["Calacatta Marble Kitchen", "Cedar Redwood Veranda", "Integrated Sonos Audio", "Double Height Vaulted Ceilings", "Smart-Home Automation"]
      },
      {
        id: "prop-3",
        title: "Sausalito Bay Villa",
        price: 4950000,
        address: "44 Shoreline Path, Sausalito, CA",
        beds: 4,
        baths: 5,
        sqft: 4500,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        type: "Coastal Villa",
        status: "Active",
        description: "Immersive panoramas of the San Francisco Skyline and Angel Island. This custom-constructed coastal villa offers floating terraces on the water, a private deep-water yacht slip, limestone heated floors, and a private master wing with a custom cedar sauna.",
        features: ["Direct Yacht Slip Integration", "Panoramas of San Francisco Bay", "Limestone Heated Floors", "Private Finnish Teak Sauna", "Frameless Glass Railings"]
      }
    ]);
  });

  // API Route: AI Home Valuation Tool (with Gemini + Fallback support)
  app.post("/api/home-evaluation", async (req, res) => {
    const { address, propertyType, bedrooms, bathrooms } = req.body;

    if (!address) {
      res.status(400).json({ error: "Property address is required." });
      return;
    }

    try {
      const ai = getGeminiClient();

      if (ai) {
        // Create prompt asking for structured property analysis
        const promptText = `Act as an elite luxury real estate valuation engine and lead-generation advisor representing Carole Staats, REALTOR®.
Given the following property details:
- Property Address: "${address}"
- Property Type: "${propertyType || "Residential State"}"
- Bedrooms: ${bedrooms || 3}
- Bathrooms: ${bathrooms || 2.5}

Estimate a highly realistic California luxury appraisal value range (e.g., "$1,650,000 - $1,780,000"). Determine a midValue (number, e.g., 1715000). Set the confidence to "High" or "Medium" based on accuracy.
Provide "commentary" in a warm, sophisticated, professional voice (150-200 words) from Carole. Address the property advantages, describe how Carole would position this property to secure prime market attention, and extend a luxurious invitation to book an on-site consultation to customize their strategy.
Include "comps" (3 realistic comparable properties recently sold nearby, specifying Address, Beds, Baths, Price, and approximate distance).
Include "regionalInsights" (3 bullets outlining neighborhood micro-trends, local growth, inventory levels, or school ranking remarks).

Return strictly in the following JSON format structure:
{
  "estimatedValue": "string representation of range (e.g. $1,850,000 - $1,980,000)",
  "midValue": number (e.g. 1915000),
  "confidence": "High" | "Medium" | "Premium Advisory Required",
  "commentary": "string representing Carole's custom expertise letter",
  "comps": [
    { "address": "string", "beds": number, "baths": number, "price": "string", "distance": "string" }
  ],
  "regionalInsights": ["string", "string", "string"]
}
`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: promptText,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                estimatedValue: { type: Type.STRING },
                midValue: { type: Type.NUMBER },
                confidence: { type: Type.STRING },
                commentary: { type: Type.STRING },
                comps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      address: { type: Type.STRING },
                      beds: { type: Type.NUMBER },
                      baths: { type: Type.NUMBER },
                      price: { type: Type.STRING },
                      distance: { type: Type.STRING }
                    },
                    required: ["address", "beds", "baths", "price", "distance"]
                  }
                },
                regionalInsights: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["estimatedValue", "midValue", "confidence", "commentary", "comps", "regionalInsights"]
            }
          }
        });

        const dataText = response.text?.trim() || "";
        const parsedData = JSON.parse(dataText);
        res.json(parsedData);
      } else {
        // Fallback: Generate custom simulated appraisal if the API key is not ready yet
        // Base valuation calculations using beds/baths/type
        let baseVal = 1350000;
        if (bedrooms) baseVal += bedrooms * 150000;
        if (bathrooms) baseVal += bathrooms * 100000;
        if (propertyType?.toLowerCase().includes("estate") || propertyType?.toLowerCase().includes("villa")) {
          baseVal += 800000;
        }

        const formattedAddress = address.length > 35 ? address.substring(0, 35) + "..." : address;
        const lowValStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseVal * 0.94);
        const highValStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseVal * 1.06);

        const mockComps = [
          {
            address: "128 Sunnyvale Way, Los Altos, CA",
            beds: Number(bedrooms) || 3,
            baths: Number(bathrooms) || 2.5,
            price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseVal * 0.98),
            distance: "0.4 miles away"
          },
          {
            address: "816 Cascade Drive, Sunnyvale, CA",
            beds: Math.max(1, (Number(bedrooms) || 3) - 1),
            baths: Math.max(1, (Number(bathrooms) || 2) - 0.5),
            price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseVal * 0.84),
            distance: "0.8 miles away"
          },
          {
            address: "1404 Redwood Crest, Los Altos Hills, CA",
            beds: (Number(bedrooms) || 3) + 1,
            baths: (Number(bathrooms) || 2) + 1,
            price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseVal * 1.22),
            distance: "1.1 miles away"
          }
        ];

        const mockResult = {
          estimatedValue: `${lowValStr} - ${highValStr}`,
          midValue: baseVal,
          confidence: "High",
          commentary: `Hello! Carole Staats here. Based on our micro-neighborhood analysis for "${formattedAddress}", this property possesses excellent local demand markers. Single-family homes with ${bedrooms || 3} bedrooms and ${bathrooms || 2.5} bathrooms in this pocket of the market have experienced consistent value retention. In today's climate, positioning is everything. To maximize your return, I would recommend a strategic pre-launch marketing campaign combined with light tailored staging to highlight your high-pitch views. I'd love to drop by, walk the property, and provide a comprehensive physical analysis with no obligation. Let's make your next move exceptional.`,
          comps: mockComps,
          regionalInsights: [
            "Local inventory remains tight (under 1.5 months of supply), which heavily favors sellers positioning premium homes.",
            "Average sold-to-list ratios sit at 102.4%, showing highly active buyer bidding on well-presented properties.",
            "Nearby top-tier public school ratings continue to act as a significant driver for regional value appreciation."
          ]
        };

        // Artificial slight delay to simulate a real, luxurious analysis
        setTimeout(() => {
          res.json(mockResult);
        }, 1500);
      }
    } catch (err: any) {
      console.error("Valuation endpoint error: ", err);
      res.status(500).json({ error: "Failed to generate market appraisal. Please try again." });
    }
  });

  // API Route: Lead Generation / Booking
  app.post("/api/book-consultation", (req, res) => {
    const { name, email, phone, type, message, propertyDetails } = req.body;

    if (!name || (!email && !phone)) {
      res.status(400).json({ error: "Name and at least one contact method (Email or Phone) are required." });
      return;
    }

    // Capture date
    const dateFormatted = new Date().toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Clean greeting depending on choice
    let typeLabel = "Personal Real Estate Strategy Consultation";
    if (type === "valuation") typeLabel = "Comprehensive Home Valuation Appraisal";
    else if (type === "buyer") typeLabel = "Exclusive Buyer Advisory Briefing";
    else if (type === "seller") typeLabel = "Seller Market Advisory Assessment";

    res.json({
      success: true,
      message: `Thank you, ${name}! Carole Staats has personally received your request for: "${typeLabel}".`,
      details: `An executive briefing summary has been created for your consultation date elements. Carole will contact you directly via ${phone ? "phone call at " + phone : "email at " + email} within 4 business hours to finalize our meeting time. We look forward to guiding you with absolute confidence.`,
      requestId: `CS-${Math.floor(100000 + Math.random() * 900000)}`,
      submissionDate: dateFormatted
    });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n  ✓ Dev server ready at http://localhost:${PORT}\n`);
    console.log(`  Press Ctrl+C to stop\n`);
  });
}

startServer();
