export interface RawReviewCategory {
  category: 'cleanliness' | 'communication' | 'value' | 'respect_house_rules';
  rating: number;
}

export interface RawReview {
  id: number;
  type: string;
  status: string;
  rating: number;
  publicReview: string;
  reviewCategory: RawReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
 
}

export interface NormalizedReview extends Omit<RawReview, 'submittedAt' | 'reviewCategory'> {
  date: Date;
  categoryRatings: {
    cleanliness: number;
    communication: number;
    value: number;
  };
  approved?: boolean;
  rejected?: boolean;
}

export interface PropertyStats {
  name: string;
  reviews: NormalizedReview[];
  averageRating: number;
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  ratingDistribution: Record<number, number>;
  categoryAverages: {
    cleanliness: number;
    communication: number;
    value: number;
  };
  mostCommonComplaint: string;
}

export interface FilterState {
  search: string;
  channel: string;
  rating: string;
  category: string;
  time: string;
}
