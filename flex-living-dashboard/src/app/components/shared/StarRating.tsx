import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16 }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => {
        const starNumber = i + 1;
        
        if (rating >= starNumber) {
          // FULL STAR - clearly filled
          return (
            <Star
              key={i}
              size={size}
              className="fill-yellow-400 text-yellow-400"
            />
          );
        } else if (rating > i) {
          // HALF STAR - much clearer styling
          return (
            <div key={i} className="relative">
              <Star
                size={size}
                className="text-gray-300"
              />
              <div 
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: '50%' }}
              >
                <Star
                  size={size}
                  className="fill-yellow-400 text-yellow-400"
                />
              </div>
            </div>
          );
        } else {
          // EMPTY STAR - clearly empty
          return (
            <Star
              key={i}
              size={size}
              className="text-gray-300"
            />
          );
        }
      })}
    </div>
  );
};
