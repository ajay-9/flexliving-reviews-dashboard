import { StateCreator } from 'zustand';
import { PropertyAnalysis } from '@/types/analysis';
import { analysisService } from '@/services/analysisService';

// Analysis-specific state slice
export interface AnalysisSlice {
  // Analysis state
  analyses: Record<string, PropertyAnalysis>;
  analysisLoading: Record<string, boolean>;
  analysisErrors: Record<string, string>;
  
  // Analysis actions
  analyzeProperty: (propertyName: string, forceRefresh?: boolean) => Promise<void>;
  analyzeBatch: (propertyNames?: string[]) => Promise<void>;
  clearAnalysisCache: () => void;
  getAnalysisStatus: (propertyName: string) => {
    analysis: PropertyAnalysis | null;
    isLoading: boolean;
    error: string | null;
  };
}

// Create analysis store slice
export const createAnalysisSlice: StateCreator<
  AnalysisSlice,
  [],
  [],
  AnalysisSlice
> = (set, get) => ({
  // Initial state
  analyses: {},
  analysisLoading: {},
  analysisErrors: {},

  // Single property analysis
  analyzeProperty: async (propertyName: string, forceRefresh = false) => {
    // Set loading state
    set(state => ({
      ...state,
      analysisLoading: {
        ...state.analysisLoading,
        [propertyName]: true
      },
      analysisErrors: {
        ...state.analysisErrors,
        [propertyName]: ''
      }
    }));

    try {
      // Get property reviews from main store (we'll access this via combined store)
      const analysis = await analysisService.analyzeProperty({
        propertyName,
        reviews: [], // Will be populated by the combined store
        forceRefresh
      });

      set(state => ({
        ...state,
        analyses: {
          ...state.analyses,
          [propertyName]: analysis
        },
        analysisLoading: {
          ...state.analysisLoading,
          [propertyName]: false
        }
      }));

    } catch (error) {
      set(state => ({
        ...state,
        analysisLoading: {
          ...state.analysisLoading,
          [propertyName]: false
        },
        analysisErrors: {
          ...state.analysisErrors,
          [propertyName]: error instanceof Error ? error.message : 'Analysis failed'
        }
      }));
    }
  },

  // Batch analysis
  analyzeBatch: async (propertyNames?: string[]) => {
    try {
      // This will be implemented in the combined store where we have access to properties
      console.log('Batch analysis triggered for:', propertyNames);
    } catch (error) {
      console.error('Batch analysis failed:', error);
    }
  },

  // Clear analysis cache
  clearAnalysisCache: () => {
    set(state => ({
      ...state,
      analyses: {},
      analysisLoading: {},
      analysisErrors: {}
    }));
    analysisService.clearCache();
  },

  // Get analysis status for a property
  getAnalysisStatus: (propertyName: string) => {
    const state = get();
    return {
      analysis: state.analyses[propertyName] || null,
      isLoading: state.analysisLoading[propertyName] || false,
      error: state.analysisErrors[propertyName] || null
    };
  }
});
