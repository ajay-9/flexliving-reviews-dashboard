import React from 'react';
import { NormalizedReview, PropertyStats } from '@/types';
import { StarRating } from './StarRating';
import { Card } from './ui/Card';

interface PropertyReviewsProps {
  property: PropertyStats;
}

export const PropertyReviews: React.FC<PropertyReviewsProps> = ({ property }) => {
  const approvedReviews = property.reviews.filter(review => review.approved);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Guest Reviews</h2>
        <div className="flex items-center gap-2">
          <StarRating rating={property.averageRating} />
          <span className="font-semibold">{property.averageRating}</span>
          <span className="text-gray-600">({approvedReviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Categories Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="font-semibold text-lg">{property.categoryAverages.cleanliness}/10</div>
          <div className="text-sm text-gray-600">Cleanliness</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{property.categoryAverages.communication}/10</div>
          <div className="text-sm text-gray-600">Communication</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{property.categoryAverages.value}/10</div>
          <div className="text-sm text-gray-600">Value</div>
        </div>
      </div>

      {/* Individual Reviews */}
      {approvedReviews.length > 0 ? (
        <div className="space-y-6">
          {approvedReviews.slice(0, 6).map(review => (
            <PublicReviewCard key={review.id} review={review} />
          ))}
          {approvedReviews.length > 6 && (
            <div className="text-center pt-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Show all {approvedReviews.length} reviews
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No approved reviews to display yet. Check back soon!
        </div>
      )}
    </Card>
  );
};

// Public Review Card Component
const PublicReviewCard: React.FC<{ review: NormalizedReview }> = ({ review }) => {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <span className="font-semibold text-blue-600">
            {review.guestName.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold">{review.guestName}</span>
            <StarRating rating={review.rating / 2} size={14} />
            <span className="text-sm text-gray-500">
              {formatDate(review.date)}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.publicReview}</p>
        </div>
      </div>
    </div>
  );
};
