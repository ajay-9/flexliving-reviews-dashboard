"use client";
import React, { useEffect } from 'react';
import { Header } from './components/dashboard/Header';
import { FilterBar } from './components/dashboard/FilterBar';
import { PropertyPanel } from './components/dashboard/PropertyPanel';
import { Sidebar } from './components/dashboard/Sidebar';
import { useReviewStore } from '@/store/reviewStore';
import { Loader } from './components/shared/ui/Loader';

/**
 * Main dashboard page - Landing page as requested
 * Shows property managers' review management interface
 */
export default function DashboardPage() {
  const { filteredProperties, loading, error, fetchReviews } = useReviewStore();

  useEffect(() => {
    // console.log('Fetching reviews on component mount');
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="min-h-screen bg-slate-50">
      
      <Header />
      <FilterBar />
      
      <main className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold p-8 bg-red-50 rounded-lg">
            Error: {error}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3 w-full">
              {filteredProperties.length > 0 ? (
                <div className="space-y-4">
                  {filteredProperties.map(property => (
                    <PropertyPanel key={property.name} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-16 bg-white rounded-lg shadow-sm border">
                  No properties match the current filters.
                </div>
              )}
            </div>
            
            <div className="lg:w-1/3 w-full">
              <Sidebar />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
