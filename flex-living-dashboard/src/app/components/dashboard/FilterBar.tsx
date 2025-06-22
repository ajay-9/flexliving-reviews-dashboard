import React from 'react';
import { Search } from 'lucide-react';
import { useReviewStore } from '@/store/reviewStore';

export const FilterBar: React.FC = () => {
  const { filters, updateFilters } = useReviewStore();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filters.channel}
          onChange={(e) => updateFilters({ channel: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Channel</option>
          <option value="Airbnb">Airbnb</option>
          <option value="Booking.com">Booking.com</option>
          <option value="Direct Booking">Direct Booking</option>
        </select>

        <select
          value={filters.rating}
          onChange={(e) => updateFilters({ rating: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Rating</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Category</option>
          <option value="cleanliness">Cleanliness</option>
          <option value="communication">Communication</option>
          <option value="value">Value</option>
        </select>

        <select
          value={filters.time}
          onChange={(e) => updateFilters({ time: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Time</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>
    </div>
  );
};
