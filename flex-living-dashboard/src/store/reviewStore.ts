import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PropertyStats, FilterState } from "@/types/dashboard";
import { NormalizedReview } from "@/types/api";
import {
  groupReviewsByProperty,
  addChannelToReview,
} from "@/utils/reviewHelpers";

interface ReviewState {
  properties: PropertyStats[];
  filteredProperties: PropertyStats[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  // Store approval decisions separately
  approvalDecisions: Record<number, 'approved' | 'rejected'>;
  fetchReviews: () => Promise<void>;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  moderateReview: (
    propertyName: string,
    reviewId: number,
    status: "approve" | "reject"
  ) => void;
}

// Apply stored approval decisions to reviews
const applyApprovalDecisions = (
  reviews: NormalizedReview[],
  approvalDecisions: Record<number, 'approved' | 'rejected'>
): NormalizedReview[] => {
  return reviews.map(review => {
    const decision = approvalDecisions[review.id];
    if (decision === 'approved') {
      return { ...review, approved: true, rejected: false };
    } else if (decision === 'rejected') {
      return { ...review, approved: false, rejected: true };
    }
    return review; // Keep original state if no decision
  });
};

// Recalculate function
const recalculatePropertyStats = (property: PropertyStats): PropertyStats => {
  const approvedReviews = property.reviews.filter(r => r.approved === true);
  const pendingReviews = property.reviews.filter(r => !r.approved && !r.rejected);

  if (approvedReviews.length === 0) {
    return {
      ...property,
      totalReviews: 0,
      averageRating: 0,
      approvedReviews: 0,
      pendingReviews: pendingReviews.length,
      categoryAverages: {},
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      mostCommonComplaint: 'None'
    };
  }

  const totalRating = approvedReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = (totalRating / approvedReviews.length) / 2;

  const categoryTotals: Record<string, { total: number; count: number }> = {};
  approvedReviews.forEach(review => {
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
  approvedReviews.forEach(review => {
    const starRating = Math.max(1, Math.min(5, Math.ceil(review.rating / 2)));
    ratingDistribution[starRating]++;
  });

  const mostCommonComplaint = Object.entries(categoryAverages)
    .sort((a, b) => a[1] - b[1])[0]?.[0] || 'None';

  return {
    ...property,
    totalReviews: approvedReviews.length,
    averageRating: Number(averageRating.toFixed(1)),
    approvedReviews: approvedReviews.length,
    pendingReviews: pendingReviews.length,
    categoryAverages,
    ratingDistribution,
    mostCommonComplaint
  };
};

const filterProperties = (
  properties: PropertyStats[],
  filters: FilterState
): PropertyStats[] => {
  const now = new Date();
  
  let filteredProperties = properties
    .map((property) => {
      const reviews = property.reviews.filter((review, index) => {
        let reviewWithChannel;
        try {
          reviewWithChannel = addChannelToReview(review, index);
        } catch (error) {
          reviewWithChannel = { ...review, channel: 'Direct Booking' };
        }

        // Apply channel filter
        if (filters.channel && reviewWithChannel.channel !== filters.channel)
          return false;

        // Apply time filter
        if (filters.time) {
          const reviewDate =
            review.date instanceof Date ? review.date : new Date(review.date);
          const daysDiff =
            (now.getTime() - reviewDate.getTime()) / (1000 * 3600 * 24);

          if (filters.time === "7d" && daysDiff > 7) return false;
          if (filters.time === "30d" && daysDiff > 30) return false;
          if (filters.time === "90d" && daysDiff > 90) return false;
        }

        return true;
      });

      return { ...property, reviews };
    })
    .filter((property) => {
      // Search filter
      if (
        filters.search &&
        !property.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Rating filter
      if (
        filters.rating &&
        Math.floor(property.averageRating) !== parseInt(filters.rating)
      ) {
        return false;
      }

      return property.reviews.length > 0;
    });

  // NEW CATEGORY FILTER LOGIC - Sort by category performance
  if (filters.category && filters.category !== 'all') {
    // Filter out properties that don't have the selected category data
    filteredProperties = filteredProperties.filter(property => {
      return property.categoryAverages && 
             property.categoryAverages[filters.category] !== undefined;
    });

    // Sort properties by selected category performance (ascending order - worst first)
    filteredProperties.sort((a, b) => {
      const categoryA = a.categoryAverages[filters.category] || 0;
      const categoryB = b.categoryAverages[filters.category] || 0;
      
      return categoryB - categoryA; // Descending order (lowest ratings first)
    });
  }

  return filteredProperties;
};


// Proper Zustand store with persistence
export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      properties: [],
      filteredProperties: [],
      loading: true,
      error: null,
      filters: { search: "", channel: "", rating: "", category: "", time: "" },
      approvalDecisions: {},

      fetchReviews: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/reviews/hostaway");
          if (!response.ok) throw new Error("Failed to fetch reviews");
          
          const json = await response.json();
          const reviews = json.data.reviews as NormalizedReview[];
          
          const reviewsWithDates = reviews.map((review) => ({
            ...review,
            date: new Date(review.date),
          }));

          // Apply stored approval decisions
          const { approvalDecisions } = get();
          const reviewsWithApprovals = applyApprovalDecisions(reviewsWithDates, approvalDecisions);
          
          const properties = groupReviewsByProperty(reviewsWithApprovals);

          set({
            properties,
            filteredProperties: properties,
            loading: false,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      updateFilters: (newFilters) => {
        set((state) => {
          const updatedFilters = { ...state.filters, ...newFilters };
          const filteredProperties = filterProperties(
            state.properties,
            updatedFilters
          );
          return { 
            ...state, // ✅ SPREAD ALL EXISTING STATE
            filters: updatedFilters, 
            filteredProperties 
          };
        });
      },

   
      moderateReview: (propertyName, reviewId, status) => {
        set((state) => {
          // Store approval decision persistently
          const newApprovalDecisions = {
            ...state.approvalDecisions,
            [reviewId]: status === "approve" ? "approved" as const : "rejected" as const
          };

          const newProperties = state.properties.map((property) => {
            if (property.name === propertyName) {
              const updatedReviews = property.reviews.map((review) => {
                if (review.id === reviewId) {
                  if (status === "approve") {
                    return { ...review, approved: true, rejected: false };
                  } else {
                    return { ...review, approved: false, rejected: true };
                  }
                }
                return review;
              });

              const updatedProperty = recalculatePropertyStats({
                ...property,
                reviews: updatedReviews
              });

              return updatedProperty;
            }
            return property;
          });

          const filteredProperties = filterProperties(newProperties, state.filters);
          
          
          return {
            ...state, // Preserve all existing state
            properties: newProperties,
            filteredProperties,
            approvalDecisions: newApprovalDecisions
          };
        });
      },
    }),
    {
      name: 'review-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        approvalDecisions: state.approvalDecisions
      }),
    }
  )
);
