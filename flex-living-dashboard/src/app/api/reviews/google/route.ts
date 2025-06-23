import { NextResponse } from "next/server";

// Caching and rate limiting configuration
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 12 hours in milliseconds
const MAX_REVIEWS = 5; // Limit to 5 reviews

// In-memory cache for Google reviews
let cachedGoogleData: any = null;
let lastGoogleFetch = 0;

// Google review interfaces
interface GoogleReview {
  id: string;
  rating: number; // 1-5 scale (keep original)
  text: string;
  author_name: string;
  time: number;
  relative_time_description: string;
}

interface GooglePlace {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  formatted_address: string;
  reviews: GoogleReview[];
}

// Normalize Google review format
const normalizeGoogleReview = (review: any, placeId: string): GoogleReview => {
  return {
    id: `google_${placeId}_${review.time}`,
    rating: review.rating,
    text: review.text,
    author_name: review.author_name,
    time: review.time,
    relative_time_description: review.relative_time_description,
  };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get("placeId");

    if (!placeId) {
      return NextResponse.json(
        {
          status: "error",
          message: "placeId parameter required",
        },
        { status: 400 }
      );
    }

    const now = Date.now();

    // Check cache first to avoid unnecessary API calls
    if (
      cachedGoogleData &&
      cachedGoogleData.placeId === placeId &&
      now - lastGoogleFetch < CACHE_DURATION
    ) {
      return NextResponse.json({
        status: "success",
        dataSource: "cached",
        data: cachedGoogleData.data,
        cacheAge: Math.floor((now - lastGoogleFetch) / 1000 / 60),
        message: "12 hours cache active - preserving API quota",
      });
    }

    // Fetch from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,formatted_address&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(
        `Google API status: ${data.status} - ${
          data.error_message || "Unknown error"
        }`
      );
    }

    const place = data.result;

    // Process and limit reviews
    const googleReviews = (place.reviews || [])
      .slice(0, MAX_REVIEWS)
      .map((review: any) => normalizeGoogleReview(review, placeId));

    const responseData = {
      place: {
        id: placeId,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        totalReviews: place.user_ratings_total,
      },
      reviews: googleReviews,
      total: googleReviews.length,
      maxReviews: MAX_REVIEWS,
      timestamp: new Date().toISOString(),
      rateLimiting: {
        cacheMinutes: 12 * 60, // 12 hours
        nextRefresh: new Date(now + CACHE_DURATION).toISOString(),
      },
    };

    // Cache the response
    cachedGoogleData = {
      placeId,
      data: responseData,
    };
    lastGoogleFetch = now;

    return NextResponse.json({
      status: "success",
      dataSource: "live",
      data: responseData,
    });
  } catch (error) {
    console.error("Google Places API Error:", error);

    // Return cached data as fallback if available
    if (cachedGoogleData) {
      return NextResponse.json({
        status: "success",
        dataSource: "cached-fallback",
        data: cachedGoogleData.data,
        warning: "API error - serving cached data",
      });
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch Google reviews",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
