/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Type } from "@google/genai";
import { getGeminiClient } from "./gemini";

interface EvaluationInput {
  address?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
}

function buildMockEvaluation(address: string, propertyType?: string, bedrooms?: number, bathrooms?: number) {
  let baseVal = 1350000;
  if (bedrooms) baseVal += bedrooms * 150000;
  if (bathrooms) baseVal += bathrooms * 100000;
  if (propertyType?.toLowerCase().includes("estate") || propertyType?.toLowerCase().includes("villa")) {
    baseVal += 800000;
  }

  const formattedAddress = address.length > 35 ? address.substring(0, 35) + "..." : address;
  const lowValStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseVal * 0.94);
  const highValStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseVal * 1.06);

  return {
    estimatedValue: `${lowValStr} - ${highValStr}`,
    midValue: baseVal,
    confidence: "High",
    commentary: `Hello! Carole Staats here. Based on our micro-neighborhood analysis for "${formattedAddress}", this property possesses excellent local demand markers. Single-family homes with ${bedrooms || 3} bedrooms and ${bathrooms || 2.5} bathrooms in this pocket of the market have experienced consistent value retention. In today's climate, positioning is everything. To maximize your return, I would recommend a strategic pre-launch marketing campaign combined with light tailored staging to highlight your home's best features. I'd love to drop by, walk the property, and provide a comprehensive physical analysis with no obligation. Let's make your next move exceptional.`,
    comps: [
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
    ],
    regionalInsights: [
      "Local inventory remains tight (under 1.5 months of supply), which heavily favors sellers positioning premium homes.",
      "Average sold-to-list ratios sit at 102.4%, showing highly active buyer bidding on well-presented properties.",
      "Nearby top-tier public school ratings continue to act as a significant driver for regional value appreciation."
    ]
  };
}

export async function evaluateHome(body: EvaluationInput) {
  const { address, propertyType, bedrooms, bathrooms } = body;

  if (!address) {
    return { status: 400 as const, body: { error: "Property address is required." } };
  }

  try {
    const ai = getGeminiClient();

    if (ai) {
      const promptText = `Act as an elite luxury real estate valuation engine and lead-generation advisor representing Carole Staats, REALTOR®.
Given the following property details:
- Property Address: "${address}"
- Property Type: "${propertyType || "Residential State"}"
- Bedrooms: ${bedrooms || 3}
- Bathrooms: ${bathrooms || 2.5}

Estimate a highly realistic Pennsylvania luxury appraisal value range. Determine a midValue (number). Set the confidence to "High" or "Medium".
Provide "commentary" in a warm, sophisticated, professional voice (150-200 words) from Carole.
Include "comps" (3 realistic comparable properties recently sold nearby).
Include "regionalInsights" (3 bullets).

Return strictly JSON with: estimatedValue, midValue, confidence, commentary, comps, regionalInsights.`;

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

      const parsedData = JSON.parse(response.text?.trim() || "{}");
      return { status: 200 as const, body: parsedData };
    }

    return { status: 200 as const, body: buildMockEvaluation(address, propertyType, bedrooms, bathrooms) };
  } catch (err) {
    console.error("Valuation endpoint error: ", err);
    return { status: 500 as const, body: { error: "Failed to generate market appraisal. Please try again." } };
  }
}
