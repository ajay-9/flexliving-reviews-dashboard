import React, { useState } from 'react';
import { Calendar, Users, Star } from 'lucide-react';
import { PropertyDetails } from '@/types';
import { Button } from './ui/Button';
import { StarRating } from './StarRating';

interface PropertyBookingProps {
  property: PropertyDetails;
  averageRating: number;
  totalReviews: number;
}

export const PropertyBooking: React.FC<PropertyBookingProps> = ({ 
  property, 
  averageRating, 
  totalReviews 
}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  const nights = calculateNights();
  const subtotal = property.pricing.basePrice * nights;
  const cleaningFee = property.pricing.cleaningFee;
  const total = subtotal + cleaningFee;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">£{property.pricing.basePrice}</span>
          <span className="text-gray-600">night</span>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={averageRating} size={16} />
          <span className="text-sm font-medium">{averageRating}</span>
          <span className="text-sm text-gray-600">({totalReviews} reviews)</span>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-IN</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-0 p-0 focus:ring-0 text-sm"
            />
          </div>
          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-OUT</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-0 p-0 focus:ring-0 text-sm"
            />
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg p-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">GUESTS</label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full border-0 p-0 focus:ring-0 text-sm"
          >
            {Array.from({ length: property.capacity.maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i > 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button className="w-full mb-4" size="lg">
        Reserve
      </Button>

      <div className="text-center text-sm text-gray-600 mb-4">
        You won't be charged yet
      </div>

      {checkIn && checkOut && (
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span>£{property.pricing.basePrice} x {nights} nights</span>
            <span>£{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Cleaning fee</span>
            <span>£{cleaningFee}</span>
          </div>
          <div className="flex justify-between font-semibold text-base border-t pt-2">
            <span>Total</span>
            <span>£{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};
