import { useReviewStore } from '@/store/reviewStore';
import { useMemo } from 'react';

// Custom hook for analysis features
export const useAnalysis = () => {
  const {
    analyses,
    analysisLoading,
    analysisErrors,
    analyzeProperty,
    analyzeBatch,
    clearAnalysisCache,
    getAnalysisStats,
    getCriticalProperties,
    getEmergingConcerns,
    getImprovementOpportunities,
    getPropertiesNeedingAttention
  } = useReviewStore();

  // Memoized computed values
  const stats = useMemo(() => getAnalysisStats(), [getAnalysisStats]);
  const criticalProperties = useMemo(() => getCriticalProperties(), [getCriticalProperties]);
  const emergingConcerns = useMemo(() => getEmergingConcerns(), [getEmergingConcerns]);
  const improvements = useMemo(() => getImprovementOpportunities(), [getImprovementOpportunities]);
  const needsAttention = useMemo(() => getPropertiesNeedingAttention(), [getPropertiesNeedingAttention]);

  // Computed loading states
  const isAnalyzing = useMemo(() => 
    Object.values(analysisLoading).some(Boolean), 
    [analysisLoading]
  );

  const hasErrors = useMemo(() => 
    Object.values(analysisErrors).some(error => error.length > 0), 
    [analysisErrors]
  );

  return {
    // State
    analyses,
    analysisLoading,
    analysisErrors,
    
    // Actions
    analyzeProperty,
    analyzeBatch,
    clearAnalysisCache,
    
    // Computed values
    stats,
    criticalProperties,
    emergingConcerns,
    improvements,
    needsAttention,
    isAnalyzing,
    hasErrors
  };
};

// Hook for individual property analysis
export const usePropertyAnalysis = (propertyName: string) => {
  const { getAnalysisStatus, analyzeProperty } = useReviewStore();
  
  const status = useMemo(() => 
    getAnalysisStatus(propertyName), 
    [getAnalysisStatus, propertyName]
  );

  const refresh = () => analyzeProperty(propertyName, true);

  return {
    ...status,
    refresh
  };
};
