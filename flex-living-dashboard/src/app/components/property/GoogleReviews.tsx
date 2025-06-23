import React, { useState, useEffect } from 'react';
import { StarRating } from '@/app/components/shared/StarRating';

interface GoogleReview {
  id: string;
  rating: number;
  text: string;
  author_name: string;
  relative_time_description: string;
}

interface GoogleReviewsProps {
  placeId?: string;
  propertyName: string;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({ 
  placeId, 
  propertyName 
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placeInfo, setPlaceInfo] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch Google reviews with guards to prevent duplicate calls
  useEffect(() => {
    if (!placeId || reviews.length > 0 || loading || isFetching) {
      return;
    }

    const fetchGoogleReviews = async () => {
      setIsFetching(true);
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/reviews/google?placeId=${placeId}`);
        
        if (!response.ok) {
          throw new Error(`Reviews API responded with ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status === 'success') {
          setReviews(result.data.reviews);
          setPlaceInfo(result.data.place);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to load Google reviews');
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchGoogleReviews();
  }, [placeId]);

  // Early returns for different states
  if (!placeId) return null;
  if (loading) return <div className="text-center py-4">Loading Google reviews...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;
  if (reviews.length === 0) return null;

  return (
    <div className="rounded-lg text-card-foreground p-6 mb-12 bg-white border-0 shadow-lg">
      {/* Header with place rating */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#284E4C]">
          Google Reviews
        </h3>
        {placeInfo && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <StarRating rating={placeInfo.rating} size={16} />
            <span>{placeInfo.rating}/5 ({placeInfo.totalReviews} total reviews)</span>
          </div>
        )}
      </div>

      {/* Individual reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900">
                {review.author_name}
              </div>
              <div className="flex items-center space-x-2">
                <StarRating rating={review.rating} size={14} />
                <span className="text-sm text-gray-500">
                  {review.relative_time_description}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* Google attribution */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Reviews from Google • Showing most recent {reviews.length} reviews
        </p>
      </div>
    </div>
  );
};
