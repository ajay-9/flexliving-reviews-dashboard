import { NormalizedReview } from "./api";

export interface PropertyAnalysis {
  propertyName: string;
  summary: string;
  issueLevel: "critical" | "emerging" | "improvement" | "good";
  painPoints: string[];
  improvementSuggestions: string[];
  confidence: number;
  analyzedAt: string;
  reviewCount: number;
  lastReviewDate: string;
}

export interface AnalysisCache {
  [propertyName: string]: {
    analysis: PropertyAnalysis;
    cachedAt: number;
    expiresAt: number;
  };
}

export interface AnalysisRequest {
  propertyName: string;
  reviews: NormalizedReview[];
  forceRefresh?: boolean;
}

export interface PerplexityResponse {
  summary: string;
  issueLevel: "critical" | "emerging" | "improvement" | "good";
  painPoints: string[];
  improvementSuggestions: string[];
  confidence: number;
}

export interface AnalysisValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
