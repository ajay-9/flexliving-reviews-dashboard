import { NormalizedReview } from '@/types/api';
import { PropertyStats } from '@/types/dashboard';
import { FILTER_OPTIONS } from '@/config/constants';

export function groupReviewsByProperty(reviews: NormalizedReview[]): PropertyStats[] {
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
    if (totalReviews === 0) return;

    const totalRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = (totalRating / totalReviews) / 2;

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

    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    propertyReviews.forEach(review => {
      const starRating = Math.max(1, Math.min(5, Math.ceil(review.rating / 2)));
      ratingDistribution[starRating]++;
    });

    const mostCommonComplaint = Object.entries(categoryAverages)
      .sort((a, b) => a[1] - b[1])[0]?.[0] || 'None';

    propertyStats.push({
      name,
      // Fixed date sorting
      reviews: propertyReviews.sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      }),
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      pendingReviews: totalReviews,
      approvedReviews: 0,
      categoryAverages,
      ratingDistribution,
      mostCommonComplaint
    });
  });

  return propertyStats.sort((a, b) => b.pendingReviews - a.pendingReviews);
}

export function addChannelToReview(review: NormalizedReview, index: number): NormalizedReview & { channel: string } {
  const channels = FILTER_OPTIONS.CHANNELS;
  const channelIndex = index % channels.length;
  
  return {
    ...review,
    channel: channels[channelIndex]
  };
}
