import { NextResponse } from 'next/server';

// Caching and rate limiting configuration
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours for place search
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests

// In-memory cache for place searches
let cachedPlaceData: { [key: string]: any } = {};
let lastSearchTime: { [key: string]: number } = {};
let isRateLimited = false;

// Rate limiting function to prevent API abuse
const enforceRateLimit = async () => {
  if (isRateLimited) {
    throw new Error('Rate limit active. Please wait before making another request.');
  }
  
  isRateLimited = true;
  setTimeout(() => {
    isRateLimited = false;
  }, RATE_LIMIT_DELAY);
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let query = searchParams.get('q') || 'GuestReady London UK';
    
    // Optimize query for GuestReady specifically
    if (query.includes('GuestReady')) {
      query = 'GuestReady London 31 Kirby Street';
    }

    const cacheKey = query.toLowerCase().trim();
    const now = Date.now();
    
    // Check cache first to avoid unnecessary API calls
    if (cachedPlaceData[cacheKey] && 
        lastSearchTime[cacheKey] && 
        (now - lastSearchTime[cacheKey]) < CACHE_DURATION) {
      
      return NextResponse.json({
        status: 'success',
        data: cachedPlaceData[cacheKey],
        cached: true,
        cacheAge: Math.floor((now - lastSearchTime[cacheKey]) / 1000 / 60),
        message: 'Data served from cache to preserve API quota'
      });
    }

    // Enforce rate limiting for new requests
    await enforceRateLimit();
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,formatted_address&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google API status: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }
    
    // Cache successful response for 24 hours
    cachedPlaceData[cacheKey] = data;
    lastSearchTime[cacheKey] = now;
    
    return NextResponse.json({
      status: 'success',
      data: data,
      cached: false,
      apiUsage: {
        requestCost: '$0.017',
        nextCacheExpiry: new Date(now + CACHE_DURATION).toISOString()
      }
    });
    
  } catch (error) {
    console.error('Places Search Error:', error);
    
    // Return cached data as fallback if available
    const query = request.url.split('q=')[1]?.split('&')[0] || '';
    const cacheKey = decodeURIComponent(query).toLowerCase().trim();
    
    if (cachedPlaceData[cacheKey]) {
      return NextResponse.json({
        status: 'success',
        data: cachedPlaceData[cacheKey],
        cached: true,
        warning: 'API error - serving cached data'
      });
    }
    
    return NextResponse.json({
      status: 'error',
      message: 'Failed to search for place',
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
