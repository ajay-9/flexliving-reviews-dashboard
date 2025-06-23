import React from 'react';
import Link from 'next/link';
import { PropertyDisplayData } from '@/types/property';
import { StarRating } from '../shared/StarRating';
import { PublicReviewCard } from './PublicReviewCard';
import { Card } from '../shared/ui/Card';

interface PropertyReviewsProps {
  property: PropertyDisplayData;
}

export const PropertyReviews: React.FC<PropertyReviewsProps> = ({ property }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Guest Reviews</h2>
      </div>

      {/* Review Categories Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        {Object.entries(property.categoryAverages).slice(0, 3).map(([category, rating]) => (
          <div key={category} className="text-center">
            <div className="font-semibold text-lg">{rating}/10</div>
            <div className="text-sm text-gray-600 capitalize">{category}</div>
          </div>
        ))}
      </div>

      {/* Individual Approved Reviews */}
      {property.reviews.length > 0 ? (
        <div className="space-y-6">
          {property.reviews.slice(0, 6).map(review => (
            <PublicReviewCard key={review.id} review={review} />
          ))}
          {property.reviews.length > 6 && (
            <div className="text-center pt-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Show all {property.reviews.length} reviews
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-4">No approved reviews to display yet.</p>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Go to dashboard to approve reviews →
          </Link>
        </div>
      )}
    </Card>
  );
};
