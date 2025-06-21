import { create } from 'zustand';
import { PropertyStats, FilterState, NormalizedReview } from '@/types';


interface ReviewState {
  properties: PropertyStats[];
  filteredProperties: PropertyStats[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  
  fetchReviews: () => Promise<void>;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  moderateReview: (propertyName: string, reviewId: number, status: 'approve' | 'reject') => void;
}

const filterProperties = (properties: PropertyStats[], filters: FilterState): PropertyStats[] => {
  const now = new Date();
  
  return properties
    .map(property => {
      const reviews = property.reviews.filter(review => {
        if (filters.channel && review.channel !== filters.channel) return false;
        
        if (filters.time) {
          const reviewDate = typeof review.date === 'string' ? new Date(review.date) : review.date;
          const daysDiff = (now.getTime() - reviewDate.getTime()) / (1000 * 3600 * 24);
          if (filters.time === '7d' && daysDiff > 7) return false;
          if (filters.time === '30d' && daysDiff > 30) return false;
          if (filters.time === '90d' && daysDiff > 90) return false;
        }
        
        return true;
      });

      return { ...property, reviews };
    })
    .filter(property => {
      if (filters.search && !property.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      if (filters.rating && Math.floor(property.averageRating) !== parseInt(filters.rating)) {
        return false;
      }
      
      return property.reviews.length > 0;
    });
};

export const useReviewStore = create<ReviewState>((set, get) => ({
  properties: [],
  filteredProperties: [],
  loading: true,
  error: null,
  filters: { search: '', channel: '', rating: '', category: '', time: '' },

  fetchReviews: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/reviews/hostaway');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
      const json = await response.json();
      
      // ← UPDATED: Convert date strings back to Date objects
      const properties = json.data.properties.map((property: PropertyStats) => ({
        ...property,
        reviews: property.reviews.map((review: any) => ({
          ...review,
          date: new Date(review.date) // Convert string back to Date
        }))
      }));
      
      set({ 
        properties, 
        filteredProperties: properties, 
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateFilters: (newFilters) => {
    set(state => {
      const updatedFilters = { ...state.filters, ...newFilters };
      const filteredProperties = filterProperties(state.properties, updatedFilters);
      return { filters: updatedFilters, filteredProperties };
    });
  },

  moderateReview: (propertyName, reviewId, status) => {
    set(state => {
      const newProperties = state.properties.map(property => {
        if (property.name === propertyName) {
          const updatedReviews = property.reviews.map(review => {
            if (review.id === reviewId && !review.approved && !review.rejected) {
              return status === 'approve' 
                ? { ...review, approved: true }
                : { ...review, rejected: true };
            }
            return review;
          });

          return {
            ...property,
            reviews: updatedReviews,
            pendingReviews: property.pendingReviews - 1,
            approvedReviews: status === 'approve' ? property.approvedReviews + 1 : property.approvedReviews,
          };
        }
        return property;
      });

      const filteredProperties = filterProperties(newProperties, state.filters);
      return { properties: newProperties, filteredProperties };
    });
  },
}));
