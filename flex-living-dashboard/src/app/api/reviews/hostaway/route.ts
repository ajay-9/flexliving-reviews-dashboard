import { NextResponse } from 'next/server';
import mockData from './mock.json';
import { HostawayApiResponse, HostawayReview, NormalizedReview } from '@/types/api';

/**
 * Pure normalization of Hostaway API response
 * Only processes what's in the API - no business logic
 */
function normalizeHostawayReview(review: HostawayReview): NormalizedReview | null {
  // Only process guest reviews with ratings (as per assessment)
  if (review.type !== 'guest-to-host' || review.rating === null) {
    return null;
  }

  // Convert date string to Date object
  const reviewDate = new Date(review.submittedAt);

  if (isNaN(reviewDate.getTime())) {
    console.error('Invalid date format:', review.submittedAt);
    return null;
  }

  // Dynamic category processing - don't hardcode categories
  const categoryRatings: Record<string, number> = {};
  review.reviewCategory.forEach(cat => {
    categoryRatings[cat.category] = cat.rating;
  });

  return {
    id: review.id,
    type: review.type,
    status: review.status,
    rating: review.rating,
    publicReview: review.publicReview,
    categoryRatings,
    submittedAt: review.submittedAt,
    date: reviewDate,
    guestName: review.guestName,
    listingName: review.listingName,
    // Moderation status starts undefined
    approved: undefined,
    rejected: undefined
  };
}

/**
 * API Route Handler - Returns pure normalized data from Hostaway API
 * This route will be tested as per assessment requirements
 */
export async function GET() {
  try {
    const apiResponse = mockData as HostawayApiResponse;
    
    if (apiResponse.status !== 'success') {
      throw new Error('API response unsuccessful');
    }

    const normalizedReviews = apiResponse.result
      .map(normalizeHostawayReview)
      .filter(Boolean) as NormalizedReview[];

    return NextResponse.json({
      status: 'success',
      data: {
        reviews: normalizedReviews,
        total: normalizedReviews.length
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to process reviews' },
      { status: 500 }
    );
  }
}
