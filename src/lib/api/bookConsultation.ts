/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface BookConsultationInput {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  message?: string;
  propertyDetails?: { address?: string };
}

export function bookConsultation(body: BookConsultationInput) {
  const { name, email, phone, type } = body;

  if (!name || (!email && !phone)) {
    return {
      status: 400 as const,
      body: { error: "Name and at least one contact method (Email or Phone) are required." },
    };
  }

  const dateFormatted = new Date().toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let typeLabel = "Personal Real Estate Strategy Consultation";
  if (type === "valuation") typeLabel = "Comprehensive Home Valuation Appraisal";
  else if (type === "buyer") typeLabel = "Exclusive Buyer Advisory Briefing";
  else if (type === "seller") typeLabel = "Seller Market Advisory Assessment";

  return {
    status: 200 as const,
    body: {
      success: true,
      message: `Thank you, ${name}! Carole Staats has personally received your request for: "${typeLabel}".`,
      details: `An executive briefing summary has been created for your consultation date elements. Carole will contact you directly via ${phone ? "phone call at " + phone : "email at " + email} within 4 business hours to finalize our meeting time. We look forward to guiding you with absolute confidence.`,
      requestId: `CS-${Math.floor(100000 + Math.random() * 900000)}`,
      submissionDate: dateFormatted
    },
  };
}
