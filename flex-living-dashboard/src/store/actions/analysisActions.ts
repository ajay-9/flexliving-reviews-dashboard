import { PropertyStats } from '@/types/dashboard';

export const analysisActions = {
  createAnalyzePropertyAction: (
    getProperties: () => PropertyStats[],
    setState: (updater: (state: any) => any) => void
  ) => {
    return async (propertyName: string, forceRefresh = false) => {
      const properties = getProperties();
      const property = properties.find(p => p.name === propertyName);
      
      if (!property) {
        setState(state => ({
          ...state,
          analysisErrors: {
            ...state.analysisErrors,
            [propertyName]: 'Property not found'
          }
        }));
        return;
      }

      // Set loading state immediately
      setState(state => ({
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
        console.log(`🚀 Store action: Starting analysis for "${propertyName}"`);
        
        const response = await fetch('/api/analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyNames: [propertyName],
            forceRefresh
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.status === 'success') {
          const propertyAnalysis = result.data.analyses.find(
            (analysis: any) => analysis.propertyName === propertyName
          );
          
          if (propertyAnalysis) {
            console.log(`✅ Store action: Analysis completed for "${propertyName}"`);
            
            // Update state with completed analysis
            setState(state => ({
              ...state,
              analyses: {
                ...state.analyses,
                [propertyName]: propertyAnalysis
              },
              analysisLoading: {
                ...state.analysisLoading,
                [propertyName]: false
              },
              analysisErrors: {
                ...state.analysisErrors,
                [propertyName]: ''
              }
            }));
            
            // Force a re-render by updating the state again
            setTimeout(() => {
              setState(state => ({ ...state }));
            }, 100);
            
          } else {
            throw new Error('No analysis found for this property');
          }
        } else {
          throw new Error(result.message || 'Analysis failed');
        }

      } catch (error) {
        console.error(`❌ Store action failed for "${propertyName}":`, error);
        
        setState(state => ({
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
    };
  },

  // Keep your existing createAnalyzeBatchAction
  createAnalyzeBatchAction: (
    getProperties: () => PropertyStats[],
    setState: (updater: (state: any) => any) => void
  ) => {
    return async (propertyNames?: string[]) => {
      const properties = getProperties();
      const targetProperties = propertyNames 
        ? properties.filter(p => propertyNames.includes(p.name))
        : properties;

      try {
        console.log(`🔄 Batch analysis: Processing ${targetProperties.length} properties`);
        
        const response = await fetch('/api/analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyNames: targetProperties.map(p => p.name),
            forceRefresh: true
          })
        });

        if (!response.ok) {
          throw new Error(`Batch API request failed: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.status === 'success') {
          const analysesMap: Record<string, any> = {};
          result.data.analyses.forEach((analysis: any) => {
            analysesMap[analysis.propertyName] = analysis;
          });

          setState(state => ({
            ...state,
            analyses: {
              ...state.analyses,
              ...analysesMap
            }
          }));
          
          console.log(`✅ Batch analysis completed: ${result.data.analyses.length} properties`);
        }

      } catch (error) {
        console.error('Batch analysis failed:', error);
      }
    };
  }
};
