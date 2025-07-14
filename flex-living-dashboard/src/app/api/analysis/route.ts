import { NextRequest, NextResponse } from 'next/server';
import { analysisService } from '@/services/analysisService';
import { groupReviewsByProperty } from '@/utils/reviewHelpers';

export async function POST(request: NextRequest) {
  try {
    const { propertyNames, forceRefresh = false } = await request.json();

    // Fetch current review data
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/hostaway`);
    const reviewData = await response.json();
    
    if (reviewData.status !== 'success') {
      throw new Error('Failed to fetch review data');
    }

    const reviews = reviewData.data.reviews.map((review: any) => ({
      ...review,
      date: new Date(review.date)
    }));

    const properties = groupReviewsByProperty(reviews);

    // Filter to requested properties or analyze all
    const targetProperties = propertyNames 
      ? properties.filter(p => propertyNames.includes(p.name))
      : properties;

    const analyses = await analysisService.batchAnalyzeProperties(targetProperties);

    return NextResponse.json({
      status: 'success',
      data: {
        analyses,
        processed: analyses.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Analysis failed',
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyName = searchParams.get('property');

    if (propertyName) {
      const status = analysisService.getAnalysisStatus(propertyName);
      return NextResponse.json({
        status: 'success',
        data: status
      });
    }

    return NextResponse.json({
      status: 'error',
      message: 'Property name required'
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Status check failed'
      },
      { status: 500 }
    );
  }
}
