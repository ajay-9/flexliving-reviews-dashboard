import React from 'react';
import { PropertyDisplayData } from '@/types';

interface PropertyBookingProps {
  property: PropertyDisplayData;
  averageRating: number;
  totalReviews: number;
}

export const PropertyBooking: React.FC<PropertyBookingProps> = ({ 
  property, 
  averageRating, 
  totalReviews 
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 overflow-hidden bg-white border-0 shadow-lg rounded-2xl">
        
        {/* Header with exact color from dev tools */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#284E4C]"></div>
          <div className="relative p-6">
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-1">
              <span>Book your stay</span>
            </h3>
            <p className="text-sm text-[#D2DADA]">
              <span>Select dates to see the total price</span>
            </p>
          </div>
        </div>

        {/* Form section */}
        <div className="p-6 pt-4">
          
          {/* Date and guests selection - Exact structure from dev tools */}
          <div className="space-y-1">
            <div className="flex gap-2">
              {/* Select dates section */}
              <div className="flex-1">
                <div className="grid w-full h-full">
                  <button className="inline-flex items-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-input px-4 py-2 w-full h-[42px] justify-start text-left font-normal bg-[#F1F3EE] border-0 shadow-sm hover:bg-[#FFFDF6] transition-colors rounded-l-md rounded-r-none group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>Select dates</span>
                  </button>
                </div>
              </div>
              
              {/* Guests section */}
              <div className="w-[120px]">
                <button className="flex w-full items-center justify-between rounded-md border-input px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 h-[42px] bg-[#F1F3EE] border-0 shadow-sm hover:bg-[#FFFDF6] transition-colors text-[#333333] rounded-l-none rounded-r-md">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span style={{ pointerEvents: 'none' }}>1</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Buttons section */}
          <div className="space-y-3 pt-6">
            {/* Check availability button */}
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 h-12 rounded-md px-8 w-full bg-[#284E4C] hover:bg-[#284E4C]/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                <path d="m9 16 2 2 4-4"></path>
              </svg>
              <span>Check availability</span>
            </button>

            {/* Send inquiry button */}
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-12 rounded-md px-8 w-full border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:border-[#284E4C]/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
              </svg>
              <span>Send Inquiry</span>
            </button>
          </div>

          {/* Instant confirmation */}
          <p className="text-sm text-[#5C5C5A] text-center mt-4">
            <span className="inline-flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
              <span>Instant confirmation</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
