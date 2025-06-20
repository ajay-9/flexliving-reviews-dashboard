import React from 'react';
import { NormalizedReview } from '@/types';
import { useReviewStore } from '@/store/reviewStore';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: NormalizedReview;
  propertyName: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, propertyName }) => {
  const { moderateReview } = useReviewStore();

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-3">
        <div className="font-semibold text-gray-900">{review.guestName}</div>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={review.rating / 2} size={14} />
          <span className="text-sm font-medium">{review.rating}/10</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {review.date.toLocaleDateString()}
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        {review.publicReview}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => moderateReview(propertyName, review.id, 'approve')}
          className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors font-medium text-sm"
        >
          Approve
        </button>
        <button
          onClick={() => moderateReview(propertyName, review.id, 'reject')}
          className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors font-medium text-sm"
        >
          Reject
        </button>
      </div>
    </div>
  );
};
