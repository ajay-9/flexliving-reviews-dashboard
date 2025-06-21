export interface RawReviewCategory {
  category: 'cleanliness' | 'communication' | 'value';
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
  channel: string; 
}

export interface NormalizedReview {
  id: number;
  type: string;
  status: string;
  rating: number;
  publicReview: string;
  guestName: string;
  listingName: string;
  channel: string; 
  date: Date | string; // Allow both Date objects and strings
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


export interface PropertyDetails {
  slug: string;
  name: string;
  description: string;
  location: {
    area: string;
    city: string;
    postcode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
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
  images: string[];
  checkInOut: {
    checkIn: string;
    checkOut: string;
  };
  policies: {
    smoking: boolean;
    pets: boolean;
    parties: boolean;
  };
}

export interface PropertyStats {
  name: string;
  slug: string;                    // ← NEW
  details: PropertyDetails;        // ← NEW
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


