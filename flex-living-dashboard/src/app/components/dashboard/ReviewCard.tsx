import React from "react";
import { NormalizedReview } from "@/types/api";
import { useReviewStore } from "@/store/reviewStore";
import { StarRating } from "../shared/StarRating";

interface ReviewCardProps {
  review: NormalizedReview;
  propertyName: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  propertyName,
}) => {
  const { moderateReview } = useReviewStore();

  // Safe date conversion
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  };

  // Convert 10-point rating to 5-star for display
  const convertToStars = (rating: number) => {
    return Math.round(rating / 2);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      {/* Header with guest info and overall rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="font-semibold text-blue-600">
              {review.guestName.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.guestName}</h4>
            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <StarRating rating={convertToStars(review.rating)} size={16} />
            <span className="font-bold text-lg">{review.rating}/10</span>
          </div>
        </div>
      </div>

      {/*CUSTOMER CATEGORY RATINGS */}
      <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
        <h5 className="font-semibold text-gray-900 mb-3 text-sm">Customer Category Ratings</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(review.categoryRatings).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  rating >= 8 ? 'bg-green-500' : 
                  rating >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {category.replace(/_/g, ' ')}
                </span>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm font-bold text-gray-900">
                  {rating}/10
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review text */}
      <div className="border-l-4 border-blue-200 pl-4">
        <p className="text-gray-700 leading-relaxed">{review.publicReview}</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => moderateReview(propertyName, review.id, "approve")}
          className="flex-1 px-4 py-3 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Approve
        </button>
        <button
          onClick={() => moderateReview(propertyName, review.id, "reject")}
          className="flex-1 px-4 py-3 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Reject
        </button>
      </div>
    </div>
  );
};
