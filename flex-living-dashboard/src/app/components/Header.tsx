import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900">
          Flex Living
        </div>
        <div className="text-xl font-semibold text-gray-800">
          Reviews
        </div>
        <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium">
          Logout
        </button>
      </div>
    </header>
  );
};
