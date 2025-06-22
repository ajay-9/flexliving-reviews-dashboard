import { NormalizedReview } from './api';


export interface PropertyAssets {
  images: string[];
  pricing: {
    basePrice: number;
    currency: string;
    cleaningFee: number;
  };
  capacity: {
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
  };
  amenities: string[];
  location: {
    area: string;
    city: string;
    postcode: string;
  };
  description: string;
}

export interface PropertyDisplayData {
  name: string;
  slug: string;
  assets: PropertyAssets;
  reviews: NormalizedReview[];
  averageRating: number;
  categoryAverages: Record<string, number>;
  totalApprovedReviews: number;
}
