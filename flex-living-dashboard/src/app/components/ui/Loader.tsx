import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-gray-600">Loading reviews...</span>
    </div>
  );
};
