import React from 'react';
import { NormalizedReview } from '@/types';
import { StarRating } from '../shared/StarRating';

interface PublicReviewCardProps {
  review: NormalizedReview;
}

export const PublicReviewCard: React.FC<PublicReviewCardProps> = ({ review }) => {
  // Safe date conversion (handles both Date objects and strings)
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
        {/* Guest Avatar */}
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <span className="font-semibold text-blue-600">
            {review.guestName.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold text-gray-900">{review.guestName}</span>
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
