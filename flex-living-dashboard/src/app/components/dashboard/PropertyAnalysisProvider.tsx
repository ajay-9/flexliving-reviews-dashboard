import React, { useState, useEffect } from "react";
import { PropertyStats } from "@/types/dashboard";
import { PropertyAnalysis } from "@/types/analysis";
import { useReviewStore } from "@/store/reviewStore";

interface PropertyAnalysisProviderProps {
  property: PropertyStats;
  children: (props: {
    analysis: PropertyAnalysis | null;
    isAnalyzing: boolean;
    analysisError: string | null;
    loadAnalysis: () => void;
  }) => React.ReactNode;
}

export const PropertyAnalysisProvider: React.FC<
  PropertyAnalysisProviderProps
> = ({ property, children }) => {
  const [localAnalysisError, setLocalAnalysisError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Use Zustand store for state management
  const { 
    getAnalysisStatus, 
    analyzeProperty,
    analyses 
  } = useReviewStore();
  
  // Get analysis status from store
  const { analysis, isLoading, error } = getAnalysisStatus(property.name);

  // Auto-load analysis on mount if not present
  useEffect(() => {
    if (!analysis && !isLoading && property.reviews.length >= 5) {
      console.log(`Auto-loading analysis for: ${property.name}`);
      loadAnalysis();
    }
  }, [property.name]);

  // Watch for analysis completion in store
  useEffect(() => {
    if (analysis) {
      console.log("Analysis result from store:", analysis);
      setLocalAnalysisError(null);
      setIsRefreshing(false);
    }
  }, [analysis]);

  const loadAnalysis = async () => {
    try {
      setLocalAnalysisError(null);
      setIsRefreshing(true);

      console.log("Starting analysis for:", property.name);
      console.log("Review count:", property.reviews.length);

      // Check if property has minimum reviews required
      if (property.reviews.length < 5) {
        console.log(`Skipping analysis for "${property.name}" - insufficient reviews (${property.reviews.length} < 5)`);
        setLocalAnalysisError("Insufficient reviews for analysis (minimum 5 required)");
        setIsRefreshing(false);
        return;
      }

      // Use Zustand store action
      await analyzeProperty(property.name, true); // forceRefresh = true
      
      console.log("Analysis request completed for:", property.name);

    } catch (error) {
      console.error("Analysis failed for", property.name, ":", error);
      setIsRefreshing(false);
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          setLocalAnalysisError("API key configuration error");
        } else if (error.message.includes("rate limit")) {
          setLocalAnalysisError("Rate limit exceeded - please wait");
        } else if (error.message.includes("timeout")) {
          setLocalAnalysisError("Request timeout - please try again");
        } else if (error.message.includes("fetch")) {
          setLocalAnalysisError("Network error - please check your connection");
        } else if (error.message.includes("already in progress")) {
          setLocalAnalysisError("Analysis already in progress - please wait");
        } else {
          setLocalAnalysisError(error.message);
        }
      } else {
        setLocalAnalysisError("Unknown error occurred");
      }
    }
  };

  // Use store error if available, otherwise use local error
  const finalError = error || localAnalysisError;
  const finalIsLoading = isLoading || isRefreshing;

  return (
    <>
      {children({
        analysis,
        isAnalyzing: finalIsLoading,
        analysisError: finalError,
        loadAnalysis,
      })}
    </>
  );
};
