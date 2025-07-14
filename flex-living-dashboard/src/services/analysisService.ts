import { PropertyAnalysis, AnalysisRequest } from '@/types/analysis';
import { PropertyStats } from '@/types/dashboard';
import { NormalizedReview } from '@/types/api';
import { ANALYSIS_CONFIG } from '@/config/analysisConfig';
import { cacheService } from './cacheService';
import { perplexityService } from './perplexityService';
import { validateAnalysisResponse, sanitizeAnalysisResponse, createFallbackAnalysis } from '@/utils/validationHelpers';

class AnalysisService {
  private processingQueue: string[] = [];
  private activeAnalyses = new Set<string>();

  async analyzeProperty(request: AnalysisRequest): Promise<PropertyAnalysis> {
    const { propertyName, reviews, forceRefresh = false } = request;

    console.log(`🔍 Starting analysis process for "${propertyName}"`);

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = cacheService.get(propertyName);
      if (cached) {
        console.log(`📋 Returning CACHED analysis for "${propertyName}"`);
        return cached;
      }
    } else {
      console.log(`🔄 Force refresh requested for "${propertyName}" - bypassing cache`);
    }

    // Validate minimum reviews
    if (reviews.length < ANALYSIS_CONFIG.MIN_REVIEWS_FOR_ANALYSIS) {
      throw new Error(`Insufficient reviews for analysis. Need at least ${ANALYSIS_CONFIG.MIN_REVIEWS_FOR_ANALYSIS}, got ${reviews.length}`);
    }

    // Check if already processing
    if (this.activeAnalyses.has(propertyName)) {
      throw new Error(`Analysis already in progress for ${propertyName}`);
    }

    try {
      this.activeAnalyses.add(propertyName);
      console.log(`🚀 Starting FRESH AI analysis for "${propertyName}" with ${reviews.length} reviews`);

      // Call Perplexity API
      console.log(`🤖 Calling Perplexity AI for "${propertyName}"`);
      const aiResponse = await perplexityService.analyzeProperty(propertyName, reviews);
      console.log(`✅ Perplexity AI response received for "${propertyName}"`);

      // Validate response
      const validation = validateAnalysisResponse(aiResponse);
      if (!validation.isValid) {
        console.error(`❌ Invalid AI response for "${propertyName}":`, validation.errors);
        console.log(`🔄 Falling back to rule-based analysis for "${propertyName}"`);
        return this.createRuleBasedFallback(propertyName, reviews);
      }

      // Log warnings
      if (validation.warnings.length > 0) {
        console.warn(`⚠️ AI response warnings for "${propertyName}":`, validation.warnings);
      }

      // Sanitize response
      const sanitized = sanitizeAnalysisResponse(aiResponse);

      // Create analysis result with improvement suggestions
      const analysis: PropertyAnalysis = {
        propertyName,
        summary: sanitized.summary,
        issueLevel: sanitized.issueLevel,
        painPoints: sanitized.painPoints,
        improvementSuggestions: sanitized.improvementSuggestions || [], // ADDED: Include improvement suggestions
        confidence: sanitized.confidence,
        analyzedAt: new Date().toISOString(),
        reviewCount: reviews.length,
        lastReviewDate: reviews[0]?.date.toISOString() || new Date().toISOString()
      };

      console.log(`✅ AI analysis completed for "${propertyName}" - Issue Level: ${analysis.issueLevel}, Confidence: ${Math.round(analysis.confidence * 100)}%`);

      // Cache the result
      cacheService.set(propertyName, analysis);

      return analysis;

    } catch (error) {
      console.error(`❌ AI analysis failed for "${propertyName}":`, error);
      console.log(`🔄 Using rule-based fallback for "${propertyName}"`);
      
      // Return fallback analysis instead of throwing
      return this.createRuleBasedFallback(propertyName, reviews);

    } finally {
      this.activeAnalyses.delete(propertyName);
      console.log(`🏁 Analysis process completed for "${propertyName}"`);
    }
  }

  async batchAnalyzeProperties(properties: PropertyStats[]): Promise<PropertyAnalysis[]> {
    console.log(`🔄 Starting batch analysis for ${properties.length} properties`);

    // Filter properties that need analysis AND are not currently being processed
    const needsAnalysis = properties.filter(property => {
      const needsAnalysisCheck = cacheService.needsAnalysis(property.name, property.reviews.length);
      const notInProgress = !this.activeAnalyses.has(property.name);
      return needsAnalysisCheck && notInProgress;
    });

    console.log(`📊 Batch Analysis Summary:`);
    console.log(`  - Total properties: ${properties.length}`);
    console.log(`  - Need fresh analysis: ${needsAnalysis.length}`);
    console.log(`  - Using cached data: ${properties.length - needsAnalysis.length}`);

    if (needsAnalysis.length === 0) {
      console.log(`✅ All properties have cached analysis - returning cached results`);
      // Return cached results
      return properties
        .map(p => cacheService.get(p.name))
        .filter(Boolean) as PropertyAnalysis[];
    }

    // Process in batches to respect rate limits
    const results: PropertyAnalysis[] = [];
    const batchSize = ANALYSIS_CONFIG.CONCURRENT_ANALYSES;

    console.log(`⚡ Processing ${needsAnalysis.length} properties in batches of ${batchSize}`);

    for (let i = 0; i < needsAnalysis.length; i += batchSize) {
      const batch = needsAnalysis.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(needsAnalysis.length / batchSize);
      
      console.log(`📦 Processing batch ${batchNumber}/${totalBatches}: [${batch.map(p => p.name).join(', ')}]`);
      
      const batchPromises = batch.map(property =>
        this.analyzeProperty({
          propertyName: property.name,
          reviews: property.reviews
        }).catch(error => {
          console.error(`❌ Batch analysis failed for ${property.name}:`, error);
          return null;
        })
      );

      try {
        const batchResults = await Promise.all(batchPromises);
        const successCount = batchResults.filter(Boolean).length;
        
        console.log(`✅ Batch ${batchNumber}/${totalBatches} completed: ${successCount}/${batch.length} successful`);
        
        batchResults.forEach(result => {
          if (result) {
            results.push(result);
          }
        });

      } catch (error) {
        console.error(`❌ Batch ${batchNumber} processing error:`, error);
      }

      // Add delay between batches
      if (i + batchSize < needsAnalysis.length) {
        console.log(`⏳ Waiting ${ANALYSIS_CONFIG.REQUEST_DELAY}ms before next batch...`);
        await new Promise(resolve => setTimeout(resolve, ANALYSIS_CONFIG.REQUEST_DELAY));
      }
    }

    // Include cached results for properties that didn't need analysis
    properties.forEach(property => {
      if (!needsAnalysis.find(p => p.name === property.name)) {
        const cached = cacheService.get(property.name);
        if (cached) {
          results.push(cached);
        }
      }
    });

    console.log(`🎉 Batch analysis completed: ${results.length}/${properties.length} properties analyzed`);

    return results;
  }

  // ENHANCED: Rule-based fallback with improvement suggestions
  private createRuleBasedFallback(propertyName: string, reviews: NormalizedReview[]): PropertyAnalysis {
    console.log(`🔧 Creating rule-based fallback analysis for "${propertyName}"`);
    
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length / 2;
    
    let issueLevel: 'critical' | 'emerging' | 'improvement' | 'good' = 'good';
    if (avgRating < 3.0) issueLevel = 'critical';
    else if (avgRating < 3.5) issueLevel = 'emerging';
    else if (avgRating > 4.0) issueLevel = 'improvement';

    // Find most common low-rated categories
    const categoryTotals: Record<string, { total: number; count: number }> = {};
    reviews.forEach(review => {
      Object.entries(review.categoryRatings).forEach(([category, rating]) => {
        if (!categoryTotals[category]) {
          categoryTotals[category] = { total: 0, count: 0 };
        }
        categoryTotals[category].total += rating;
        categoryTotals[category].count += 1;
      });
    });

    const categoryAverages = Object.entries(categoryTotals)
      .map(([category, data]) => ({
        category: category.replace(/_/g, ' '),
        average: data.total / data.count
      }))
      .sort((a, b) => a.average - b.average);

    const painPoints = categoryAverages.slice(0, 3).map(cat => 
      `${cat.category} rated ${cat.average.toFixed(1)}/10 on average`
    );

    // ADDED: Generate improvement suggestions based on category scores and issue level
    const improvementSuggestions = this.generateImprovementSuggestions(categoryAverages, issueLevel);

    const analysis: PropertyAnalysis = {
      propertyName,
      summary: `Property has ${reviews.length} reviews with ${avgRating.toFixed(1)}/5 rating.\nRule-based analysis due to AI processing issues.`,
      issueLevel,
      painPoints: painPoints.length > 0 ? painPoints : ['No significant issues identified'],
      improvementSuggestions, // ADDED: Include improvement suggestions
      confidence: 0.6,
      analyzedAt: new Date().toISOString(),
      reviewCount: reviews.length,
      lastReviewDate: reviews[0]?.date.toISOString() || new Date().toISOString()
    };

    console.log(`✅ Rule-based fallback completed for "${propertyName}" - Issue Level: ${analysis.issueLevel}`);
    
    // Cache the fallback result too
    cacheService.set(propertyName, analysis);

    return analysis;
  }

  // ADDED: Helper method for generating improvement suggestions
  private generateImprovementSuggestions(
    categoryAverages: Array<{category: string; average: number}>, 
    issueLevel: string
  ): string[] {
    const suggestions: string[] = [];
    
    // Find lowest scoring categories for targeted improvements
    const lowestCategories = categoryAverages.slice(0, 2);
    
    lowestCategories.forEach(cat => {
      if (cat.category.includes('clean')) {
        suggestions.push(issueLevel === 'critical' ? 'Emergency deep cleaning' : 'Enhanced cleaning standards');
      } else if (cat.category.includes('communication')) {
        suggestions.push(issueLevel === 'critical' ? '24/7 support hotline' : 'Faster response times');
      } else if (cat.category.includes('value')) {
        suggestions.push(issueLevel === 'critical' ? 'Pricing review urgent' : 'Competitive pricing analysis');
      } else if (cat.category.includes('respect')) {
        suggestions.push('Guest guidelines training');
      }
    });
    
    // Add general suggestion based on issue level
    if (issueLevel === 'critical') {
      suggestions.push('Staff training program');
    } else if (issueLevel === 'emerging') {
      suggestions.push('Preventive maintenance');
    } else if (issueLevel === 'improvement') {
      suggestions.push('Premium amenities upgrade');
    } else {
      suggestions.push('Guest experience enhancement');
    }
    
    // Ensure we always have exactly 3 suggestions
    const finalSuggestions = suggestions.slice(0, 3);
    while (finalSuggestions.length < 3) {
      finalSuggestions.push('Property optimization review');
    }
    
    return finalSuggestions;
  }

  getAnalysisStatus(propertyName: string): {
    isProcessing: boolean;
    isCached: boolean;
    cacheAge?: number;
  } {
    return {
      isProcessing: this.activeAnalyses.has(propertyName),
      isCached: cacheService.isCached(propertyName),
      cacheAge: cacheService.getAnalysisAge(propertyName) || undefined
    };
  }

  clearCache(): void {
    console.log('🧹 Clearing all analysis cache');
    cacheService.clear();
  }
}

export const analysisService = new AnalysisService();
