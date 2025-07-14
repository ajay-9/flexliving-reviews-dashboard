import { PropertyAnalysis, AnalysisCache } from '@/types/analysis';
import { ANALYSIS_CONFIG } from '@/config/analysisConfig';

class CacheService {
  private cache: AnalysisCache = {};
  private readonly CACHE_KEY = 'property-analysis-cache';
  private isClient = typeof window !== 'undefined';

  constructor() {
    if (this.isClient) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    if (!this.isClient) return;
    
    try {
      const stored = localStorage.getItem(this.CACHE_KEY);
      if (stored) {
        this.cache = JSON.parse(stored);
        this.cleanExpiredEntries();
        console.log('📦 Analysis cache loaded from localStorage');
      }
    } catch (error) {
      console.error('Failed to load analysis cache:', error);
      this.cache = {};
    }
  }

  private saveToStorage(): void {
    if (!this.isClient) return;
    
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
      console.log('Analysis cache saved to localStorage');
    } catch (error) {
      console.error('Failed to save analysis cache:', error);
    }
  }

  private cleanExpiredEntries(): void {
    const now = Date.now();
    const expiredKeys = Object.keys(this.cache).filter(key => 
      this.cache[key].expiresAt < now
    );
    
    if (expiredKeys.length > 0) {
      expiredKeys.forEach(key => delete this.cache[key]);
      console.log(`🗑️ Removed ${expiredKeys.length} expired cache entries:`, expiredKeys);
      
      if (this.isClient) {
        this.saveToStorage();
      }
    }
  }

  isCached(propertyName: string): boolean {
    const entry = this.cache[propertyName];
    const isCached = entry && entry.expiresAt > Date.now();
    
    if (isCached) {
      const ageHours = Math.round((Date.now() - entry.cachedAt) / (1000 * 60 * 60));
      console.log(`✅ Cache HIT for "${propertyName}" (${ageHours}h old)`);
    } else {
      console.log(`❌ Cache MISS for "${propertyName}"`);
    }
    
    return isCached;
  }

  get(propertyName: string): PropertyAnalysis | null {
    const entry = this.cache[propertyName];
    if (entry && entry.expiresAt > Date.now()) {
      const ageMinutes = Math.round((Date.now() - entry.cachedAt) / (1000 * 60));
      console.log(`🔄 Using CACHED analysis for "${propertyName}" (${ageMinutes} minutes old)`);
      return entry.analysis;
    }
    return null;
  }

  set(propertyName: string, analysis: PropertyAnalysis): void {
    const now = Date.now();
    this.cache[propertyName] = {
      analysis,
      cachedAt: now,
      expiresAt: now + ANALYSIS_CONFIG.CACHE_DURATION
    };
    
    console.log(`💾 CACHED new analysis for "${propertyName}" (expires in 24h)`);
    
    if (this.isClient) {
      this.saveToStorage();
    }
  }

  needsAnalysis(propertyName: string, reviewCount: number): boolean {
    if (reviewCount < ANALYSIS_CONFIG.MIN_REVIEWS_FOR_ANALYSIS) {
      console.log(`⏭️ Skipping "${propertyName}" - insufficient reviews (${reviewCount} < ${ANALYSIS_CONFIG.MIN_REVIEWS_FOR_ANALYSIS})`);
      return false;
    }
    
    const needs = !this.isCached(propertyName);
    if (needs) {
      console.log(`🔍 "${propertyName}" needs fresh analysis`);
    }
    
    return needs;
  }

  getAnalysisAge(propertyName: string): number | null {
    const entry = this.cache[propertyName];
    if (entry) {
      return Date.now() - entry.cachedAt;
    }
    return null;
  }

  clear(): void {
    const cacheSize = Object.keys(this.cache).length;
    this.cache = {};
    
    console.log(`🧹 Cleared analysis cache (${cacheSize} entries removed)`);
    
    if (this.isClient) {
      localStorage.removeItem(this.CACHE_KEY);
    }
  }
}

export const cacheService = new CacheService();
