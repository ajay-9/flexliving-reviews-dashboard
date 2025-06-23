// src/utils/reviewData.ts
import { NormalizedReview } from '@/types/api';

export const fetchReviewsWithApprovals = async (): Promise<NormalizedReview[]> => {
  // Fetch fresh data from API
  const response = await fetch("/api/reviews/hostaway");
  const data = await response.json();
  
  if (data.status !== "success") {
    throw new Error("Failed to fetch reviews");
  }

  const reviews = data.data.reviews as NormalizedReview[];
  const reviewsWithDates = reviews.map((review) => ({
    ...review,
    date: new Date(review.date),
  }));

  // Apply stored approval decisions from localStorage
  const storedState = localStorage.getItem('review-store');
  if (storedState) {
    try {
      const { state } = JSON.parse(storedState);
      const approvalDecisions = state.approvalDecisions || {};
      
      return reviewsWithDates.map(review => {
        const decision = approvalDecisions[review.id];
        if (decision === 'approved') {
          return { ...review, approved: true, rejected: false };
        } else if (decision === 'rejected') {
          return { ...review, approved: false, rejected: true };
        }
        return review;
      });
    } catch (error) {
      console.error('Error parsing stored approval decisions:', error);
    }
  }

  return reviewsWithDates;
};
