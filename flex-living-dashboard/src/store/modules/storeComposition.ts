import { StateCreator } from 'zustand';
import { AnalysisSlice } from './analysisStore';

// Define the combined store interface
export interface CombinedStore extends AnalysisSlice {
  // This will be extended with your existing ReviewState interface
  // We're keeping it separate to avoid conflicts
}

// Store composition utilities
export type StoreSlice<T> = StateCreator<
  CombinedStore,
  [],
  [],
  T
>;

// Helper to combine multiple slices
export const combineSlices = <T extends Record<string, any>>(
  ...slices: Array<(set: any, get: any) => Partial<T>>
) => {
  return (set: any, get: any) => {
    const combined = {} as T;
    
    slices.forEach(slice => {
      Object.assign(combined, slice(set, get));
    });
    
    return combined;
  };
};
