import { NormalizedReview } from '@/types/api';
import { PropertyStats } from '@/types/dashboard';
import { FILTER_OPTIONS } from '@/config/constants';

/**
 * Business logic for processing reviews into property statistics
 * Separated from API normalization for maintainability
 */
export function groupReviewsByProperty(reviews: NormalizedReview[]): PropertyStats[] {
  const propertiesMap = new Map<string, NormalizedReview[]>();

  // Group reviews by listing name
  reviews.forEach(review => {
    if (!propertiesMap.has(review.listingName)) {
      propertiesMap.set(review.listingName, []);
    }
    propertiesMap.get(review.listingName)!.push(review);
  });

  const propertyStats: PropertyStats[] = [];

  propertiesMap.forEach((propertyReviews, name) => {
    const totalReviews = propertyReviews.length;
    if (totalReviews === 0) return;

    // Calculate average rating (scale to 5-star system)
    const totalRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = (totalRating / totalReviews) / 2;

    // Dynamic category averages - don't hardcode categories
    const categoryTotals: Record<string, { total: number; count: number }> = {};
    propertyReviews.forEach(review => {
      Object.entries(review.categoryRatings).forEach(([category, rating]) => {
        if (!categoryTotals[category]) {
          categoryTotals[category] = { total: 0, count: 0 };
        }
        categoryTotals[category].total += rating;
        categoryTotals[category].count += 1;
      });
    });

    const categoryAverages: Record<string, number> = {};
    Object.entries(categoryTotals).forEach(([category, data]) => {
      categoryAverages[category] = Math.round(data.total / data.count);
    });

    // Rating distribution for 5-star system
    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    propertyReviews.forEach(review => {
      const starRating = Math.max(1, Math.min(5, Math.ceil(review.rating / 2)));
      ratingDistribution[starRating]++;
    });

    // Find most common complaint (lowest category)
    const mostCommonComplaint = Object.entries(categoryAverages)
      .sort((a, b) => a[1] - b[1])[0]?.[0] || 'None';


    propertyStats.push({
      name,
      reviews: propertyReviews.sort((a, b) => b.date.getTime() - a.date.getTime()),
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      pendingReviews: totalReviews, // Initially all pending
      approvedReviews: 0,
      categoryAverages,
      ratingDistribution,
      mostCommonComplaint
    });
  });

  return propertyStats.sort((a, b) => b.pendingReviews - a.pendingReviews);
}

/**
 * Add channel data at component level (not in API since channel not provided)
 */
export function addChannelToReview(review: NormalizedReview, index: number): NormalizedReview & { channel: string } {
  // Hardcode channel assignment since not in API
  const channels = FILTER_OPTIONS.CHANNELS;
  const channelIndex = index % channels.length;
  
  return {
    ...review,
    channel: channels[channelIndex]
  };
}
