/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: string;
  status: 'Active' | 'Pending' | 'Sold';
  description: string;
  features: string[];
}

export interface LeadForm {
  name: string;
  email: string;
  phone: string;
  type: 'buyer' | 'seller' | 'consultation' | 'valuation';
  message: string;
  propertyDetails?: {
    address: string;
    propertyType: string;
    beds: number;
    baths: number;
  };
}

export interface ComparisonListing {
  address: string;
  beds: number;
  baths: number;
  price: string;
  distance: string;
}

export interface EvaluationResult {
  estimatedValue: string;
  midValue: number;
  confidence: "High" | "Medium" | "Premium Advisory Required";
  commentary: string;
  comps: ComparisonListing[];
  regionalInsights: string[];
}
