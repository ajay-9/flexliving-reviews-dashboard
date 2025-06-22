import { NormalizedReview } from './api';

export interface PropertyStats {
  name: string;
  reviews: NormalizedReview[];
  averageRating: number;
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  ratingDistribution: Record<number, number>;
  categoryAverages: Record<string, number>; // Dynamic categories
  mostCommonComplaint: string;
}

export interface FilterState {
  search: string;
  channel: string;
  rating: string;
  category: string;
  time: string;
}

export interface TrendData {
  month: string;
  categories: Record<string, number>;
}
