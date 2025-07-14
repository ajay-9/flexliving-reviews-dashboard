import { PropertyAnalysis } from '@/types/analysis';

// Analysis selectors - pure functions for computed values
export const analysisSelectors = {
  
  // Get analysis for a specific property
  getPropertyAnalysis: (
    analyses: Record<string, PropertyAnalysis>,
    propertyName: string
  ): PropertyAnalysis | null => {
    return analyses[propertyName] || null;
  },

  // Get all critical properties
  getCriticalProperties: (
    analyses: Record<string, PropertyAnalysis>
  ): Array<{ propertyName: string; analysis: PropertyAnalysis }> => {
    return Object.entries(analyses)
      .filter(([_, analysis]) => analysis.issueLevel === 'critical')
      .map(([propertyName, analysis]) => ({ propertyName, analysis }));
  },

  // Get all emerging concerns
  getEmergingConcerns: (
    analyses: Record<string, PropertyAnalysis>
  ): Array<{ propertyName: string; analysis: PropertyAnalysis }> => {
    return Object.entries(analyses)
      .filter(([_, analysis]) => analysis.issueLevel === 'emerging')
      .map(([propertyName, analysis]) => ({ propertyName, analysis }));
  },

  // Get improvement opportunities
  getImprovementOpportunities: (
    analyses: Record<string, PropertyAnalysis>
  ): Array<{ propertyName: string; analysis: PropertyAnalysis }> => {
    return Object.entries(analyses)
      .filter(([_, analysis]) => analysis.issueLevel === 'improvement')
      .map(([propertyName, analysis]) => ({ propertyName, analysis }));
  },

  // Get analysis statistics
  getAnalysisStats: (
    analyses: Record<string, PropertyAnalysis>,
    totalProperties: number
  ) => {
    const analyzed = Object.keys(analyses).length;
    const critical = Object.values(analyses).filter(a => a.issueLevel === 'critical').length;
    const emerging = Object.values(analyses).filter(a => a.issueLevel === 'emerging').length;
    const improvements = Object.values(analyses).filter(a => a.issueLevel === 'improvement').length;
    const good = Object.values(analyses).filter(a => a.issueLevel === 'good').length;

    return {
      totalProperties,
      analyzed,
      pending: totalProperties - analyzed,
      critical,
      emerging,
      improvements,
      good,
      analysisProgress: totalProperties > 0 ? (analyzed / totalProperties) * 100 : 0
    };
  },

  // Get properties needing attention (critical + emerging)
  getPropertiesNeedingAttention: (
    analyses: Record<string, PropertyAnalysis>
  ): Array<{ propertyName: string; analysis: PropertyAnalysis; priority: number }> => {
    return Object.entries(analyses)
      .filter(([_, analysis]) => ['critical', 'emerging'].includes(analysis.issueLevel))
      .map(([propertyName, analysis]) => ({
        propertyName,
        analysis,
        priority: analysis.issueLevel === 'critical' ? 1 : 2
      }))
      .sort((a, b) => a.priority - b.priority);
  }
};
