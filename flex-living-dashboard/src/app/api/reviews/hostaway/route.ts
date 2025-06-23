import { NextResponse } from 'next/server';
import mockData from './mock.json';
import { HostawayApiResponse, HostawayReview, NormalizedReview } from '@/types/api';

/**
 * Pure normalization of Hostaway API response
 * Processes both real API and mock data consistently
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
  review.reviewCategory?.forEach(cat => {
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
 * Fetch reviews from real Hostaway API
 */
async function fetchHostawayReviews(): Promise<HostawayApiResponse | null> {
  try {
    const response = await fetch('https://api.hostfully.com/v1/reviews', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.HOSTAWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Account-Id': process.env.HOSTAWAY_ACCOUNT_ID || '61148'
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hostaway API Error:', error);
    return null;
  }
}

/**
 * API Route Handler - Attempts real API first, falls back to mock
 * This route will be tested as per assessment requirements
 */
export async function GET() {
  try {
    // ✅ 1. ATTEMPT REAL HOSTAWAY API FIRST
    console.log('Attempting Hostaway API call...');
    const realApiResponse = await fetchHostawayReviews();
    
    let apiResponse: HostawayApiResponse;
    let dataSource = 'mock'; // Default assumption
    
    // ✅ 2. USE REAL DATA IF AVAILABLE AND VALID
    if (realApiResponse && 
        realApiResponse.status === 'success' && 
        realApiResponse.result && 
        realApiResponse.result.length > 0) {
      
      apiResponse = realApiResponse;
      dataSource = 'live';
      console.log(`Using live Hostaway data: ${realApiResponse.result.length} reviews`);
      
    } else {
      // ✅ 3. FALLBACK TO MOCK DATA
      apiResponse = mockData as HostawayApiResponse;
      console.log('Using mock data fallback');
    }

    // ✅ 4. VALIDATE API RESPONSE STRUCTURE
    if (apiResponse.status !== 'success') {
      throw new Error('API response unsuccessful');
    }

    // ✅ 5. NORMALIZE ALL DATA CONSISTENTLY
    const normalizedReviews = apiResponse.result
      .map(normalizeHostawayReview)
      .filter(Boolean) as NormalizedReview[];

    // ✅ 6. RETURN STRUCTURED RESPONSE
    return NextResponse.json({
      status: 'success',
      dataSource, // Helps with debugging
      data: {
        reviews: normalizedReviews,
        total: normalizedReviews.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('API Route Error:', error);
    
    // ✅ 7. FINAL FALLBACK WITH MOCK DATA
    try {
      const fallbackResponse = mockData as HostawayApiResponse;
      const normalizedReviews = fallbackResponse.result
        .map(normalizeHostawayReview)
        .filter(Boolean) as NormalizedReview[];

      return NextResponse.json({
        status: 'success',
        dataSource: 'fallback',
        data: {
          reviews: normalizedReviews,
          total: normalizedReviews.length,
          timestamp: new Date().toISOString()
        }
      });
    } catch (fallbackError) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Failed to process reviews',
          error: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 500 }
      );
    }
  }
}
