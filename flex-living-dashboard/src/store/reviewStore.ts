import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PropertyStats, FilterState } from "@/types/dashboard";
import { NormalizedReview } from "@/types/api";
import { PropertyAnalysis } from "@/types/analysis";
import {
  groupReviewsByProperty,
  addChannelToReview,
} from "@/utils/reviewHelpers";

// Import new modular components
import { AnalysisSlice } from "./modules/analysisStore";
import { analysisActions } from "./actions/analysisActions";
import { analysisSelectors } from "./selectors/analysisSelectors";

// KEEP YOUR EXISTING INTERFACE EXACTLY THE SAME
interface ReviewState {
  properties: PropertyStats[];
  filteredProperties: PropertyStats[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  approvalDecisions: Record<number, "approved" | "rejected">;
  
  // Your existing methods - UNCHANGED
  fetchReviews: () => Promise<void>;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  moderateReview: (
    propertyName: string,
    reviewId: number,
    status: "approve" | "reject"
  ) => void;
}

// NEW: Extended interface that includes analysis features
interface ExtendedReviewState extends ReviewState {
  // Analysis state (new)
  analyses: Record<string, PropertyAnalysis>;
  analysisLoading: Record<string, boolean>;
  analysisErrors: Record<string, string>;
  
  // Analysis actions (new)
  analyzeProperty: (propertyName: string, forceRefresh?: boolean) => Promise<void>;
  analyzeBatch: (propertyNames?: string[]) => Promise<void>;
  clearAnalysisCache: () => void;
  
  // Analysis selectors (new)
  getAnalysisStatus: (propertyName: string) => {
    analysis: PropertyAnalysis | null;
    isLoading: boolean;
    error: string | null;
  };
  getAnalysisStats: () => ReturnType<typeof analysisSelectors.getAnalysisStats>;
  getCriticalProperties: () => ReturnType<typeof analysisSelectors.getCriticalProperties>;
  getEmergingConcerns: () => ReturnType<typeof analysisSelectors.getEmergingConcerns>;
  getImprovementOpportunities: () => ReturnType<typeof analysisSelectors.getImprovementOpportunities>;
  getPropertiesNeedingAttention: () => ReturnType<typeof analysisSelectors.getPropertiesNeedingAttention>;
}

// KEEP ALL YOUR EXISTING HELPER FUNCTIONS EXACTLY THE SAME
const applyApprovalDecisions = (
  reviews: NormalizedReview[],
  approvalDecisions: Record<number, "approved" | "rejected">
): NormalizedReview[] => {
  return reviews.map(review => {
    const decision = approvalDecisions[review.id];
    if (decision === 'approved') {
      return { ...review, approved: true, rejected: false };
    } else if (decision === 'rejected') {
      return { ...review, approved: false, rejected: true };
    }
    return review;
  });
};

const recalculatePropertyStats = (property: PropertyStats): PropertyStats => {
  // KEEP YOUR EXISTING IMPLEMENTATION EXACTLY THE SAME
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
  // KEEP YOUR EXISTING IMPLEMENTATION EXACTLY THE SAME
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

        if (filters.channel && reviewWithChannel.channel !== filters.channel)
          return false;

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
      if (
        filters.search &&
        !property.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.rating &&
        Math.floor(property.averageRating) !== parseInt(filters.rating)
      ) {
        return false;
      }

      return property.reviews.length > 0;
    });

  if (filters.category && filters.category !== 'all') {
    filteredProperties = filteredProperties.filter(property => {
      return property.categoryAverages &&
        property.categoryAverages[filters.category] !== undefined;
    });

    filteredProperties.sort((a, b) => {
      const categoryA = a.categoryAverages[filters.category] || 0;
      const categoryB = b.categoryAverages[filters.category] || 0;
      return categoryB - categoryA;
    });
  }

  return filteredProperties;
};

// ENHANCED STORE WITH MODULAR ANALYSIS FEATURES
export const useReviewStore = create<ExtendedReviewState>()(
  persist(
    (set, get) => {
      // Create analysis actions with access to store state
      const analyzePropertyAction = analysisActions.createAnalyzePropertyAction(
        () => get().properties,
        set
      );
      
      const analyzeBatchAction = analysisActions.createAnalyzeBatchAction(
        () => get().properties,
        set
      );

      return {
        // KEEP ALL YOUR EXISTING STATE EXACTLY THE SAME
        properties: [],
        filteredProperties: [],
        loading: true,
        error: null,
        filters: { search: "", channel: "", rating: "", category: "", time: "" },
        approvalDecisions: {},
        
        // NEW: Analysis state
        analyses: {},
        analysisLoading: {},
        analysisErrors: {},

        // KEEP ALL YOUR EXISTING METHODS EXACTLY THE SAME
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
              ...state,
              filters: updatedFilters,
              filteredProperties
            };
          });
        },

        moderateReview: (propertyName, reviewId, status) => {
          set((state) => {
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
              ...state,
              properties: newProperties,
              filteredProperties,
              approvalDecisions: newApprovalDecisions
            };
          });
        },

        // NEW: Analysis methods using modular actions
        analyzeProperty: analyzePropertyAction,
        analyzeBatch: analyzeBatchAction,
        
        clearAnalysisCache: () => {
          set(state => ({
            ...state,
            analyses: {},
            analysisLoading: {},
            analysisErrors: {}
          }));
        },

        // NEW: Analysis selectors
        getAnalysisStatus: (propertyName: string) => {
          const state = get();
          return {
            analysis: analysisSelectors.getPropertyAnalysis(state.analyses, propertyName),
            isLoading: state.analysisLoading[propertyName] || false,
            error: state.analysisErrors[propertyName] || null
          };
        },

        getAnalysisStats: () => {
          const state = get();
          return analysisSelectors.getAnalysisStats(state.analyses, state.properties.length);
        },

        getCriticalProperties: () => {
          const state = get();
          return analysisSelectors.getCriticalProperties(state.analyses);
        },

        getEmergingConcerns: () => {
          const state = get();
          return analysisSelectors.getEmergingConcerns(state.analyses);
        },

        getImprovementOpportunities: () => {
          const state = get();
          return analysisSelectors.getImprovementOpportunities(state.analyses);
        },

        getPropertiesNeedingAttention: () => {
          const state = get();
          return analysisSelectors.getPropertiesNeedingAttention(state.analyses);
        }
      };
    },
    {
      name: 'review-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        approvalDecisions: state.approvalDecisions,
        analyses: state.analyses // NEW: Persist analyses too
      }),
    }
  )
);
