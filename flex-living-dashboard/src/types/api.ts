// Exact API response structure from assessment PDF
export interface HostawayReviewCategory {
  category: string; // Dynamic - don't hardcode categories
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: HostawayReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  // Note: channel not in API response - will be added at component level
}

export interface HostawayApiResponse {
  status: string;
  result: HostawayReview[];
}

// Normalized for frontend use (only what's needed)
export interface NormalizedReview {
  id: number;
  type: string;
  status: string;
  rating: number;
  publicReview: string;
  categoryRatings: Record<string, number>; // Dynamic categories
  submittedAt: string;
  date: Date;
  guestName: string;
  listingName: string;
  // Moderation status added by frontend
  approved?: boolean;
  rejected?: boolean;
}
