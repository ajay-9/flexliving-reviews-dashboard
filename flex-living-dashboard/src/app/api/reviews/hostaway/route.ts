import { NextResponse } from 'next/server';
import mockData from './mock.json';
import { RawReview, NormalizedReview, PropertyStats } from '@/types';

function normalizeReview(review: RawReview): NormalizedReview | null {
  if (review.type !== 'guest-to-host') return null;

    const reviewDate = new Date(review.submittedAt);

      // Validate the date conversion worked
  if (isNaN(reviewDate.getTime())) {
    console.error('Invalid date format:', review.submittedAt);
    return null; // Skip invalid dates
  }

  const categoryRatings = review.reviewCategory.reduce((acc, cat) => {
    acc[cat.category] = cat.rating;
    return acc;
  }, {} as any);

  return {
    ...review,
     date: reviewDate,
    categoryRatings: {
      cleanliness: categoryRatings.cleanliness || 0,
      communication: categoryRatings.communication || 0,
      value: categoryRatings.value || 0,
    },
  };
}

function processProperties(reviews: NormalizedReview[]): PropertyStats[] {
  const propertiesMap = new Map<string, NormalizedReview[]>();

  reviews.forEach(review => {
    if (!propertiesMap.has(review.listingName)) {
      propertiesMap.set(review.listingName, []);
    }
    propertiesMap.get(review.listingName)!.push(review);
  });

  const propertyStats: PropertyStats[] = [];

  propertiesMap.forEach((propertyReviews, name) => {
    const totalReviews = propertyReviews.length;
    const totalRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / totalReviews / 2; // Scale to 5-star system

    const categoryTotals = propertyReviews.reduce((acc, r) => {
      acc.cleanliness += r.categoryRatings.cleanliness;
      acc.communication += r.categoryRatings.communication;
      acc.value += r.categoryRatings.value;
      return acc;
    }, { cleanliness: 0, communication: 0, value: 0 });

    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const complaints: Record<string, number> = { Cleanliness: 0, Communication: 0, Value: 0 };

    propertyReviews.forEach(review => {
      const starRating = Math.max(1, Math.min(5, Math.ceil(review.rating / 2)));
      ratingDistribution[starRating]++;

      if (review.categoryRatings.cleanliness <= 4) complaints.Cleanliness++;
      if (review.categoryRatings.communication <= 4) complaints.Communication++;
      if (review.categoryRatings.value <= 4) complaints.Value++;
    });

    const mostCommonComplaint = Object.entries(complaints)
      .sort((a, b) => b[1] - a[1])[0];

    propertyStats.push({
      name,
      reviews: propertyReviews.sort((a, b) => b.date.getTime() - a.date.getTime()),
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      pendingReviews: totalReviews,
      approvedReviews: 0,
      categoryAverages: {
        cleanliness: Math.round(categoryTotals.cleanliness / totalReviews),
        communication: Math.round(categoryTotals.communication / totalReviews),
        value: Math.round(categoryTotals.value / totalReviews),
      },
      ratingDistribution,
      mostCommonComplaint: mostCommonComplaint?.[0] || 'None',
    });
  });

  return propertyStats.sort((a, b) => b.pendingReviews - a.pendingReviews);
}

export async function GET() {
  try {
    const rawReviews = mockData.result as RawReview[];
    const normalizedReviews = rawReviews
      .map(normalizeReview)
      .filter(Boolean) as NormalizedReview[];
    const properties = processProperties(normalizedReviews);

    return NextResponse.json({
      status: 'success',
      data: { properties }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to process reviews' },
      { status: 500 }
    );
  }
}
