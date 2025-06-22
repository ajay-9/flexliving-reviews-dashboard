import React from 'react';

export const PropertyStayPolicies: React.FC = () => {
  return (
    <div className="rounded-lg text-card-foreground p-6 mb-12 bg-white border-0 shadow-lg">
      {/* Header with exact styling from dev tools */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#333333]">
          <span>Stay Policies</span>
        </h2>
        <button 
          className="justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-9 px-4 py-2 flex items-center gap-2 border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5" 
          type="button"
        >
          <span>View all policies</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>

      {/* Policies Content */}
      <div className="space-y-8">
        
        {/* Check-in & Check-out */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-5 w-5 text-[#284E4C]">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#333333]">
              <span>Check-in & Check-out</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 text-[#5C5C5A]">
              <div className="p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in h-4 w-4">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10,17 15,12 10,7"></polyline>
                  <line x1="15" x2="3" y1="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <span className="font-medium text-[#333333]">Check-in time</span>
                <div className="text-sm text-[#5C5C5A]">3:00 PM</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#5C5C5A]">
              <div className="p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-4 w-4">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16,17 21,12 16,7"></polyline>
                  <line x1="21" x2="9" y1="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <span className="font-medium text-[#333333]">Check-out time</span>
                <div className="text-sm text-[#5C5C5A]">10:00 AM</div>
              </div>
            </div>
          </div>
        </div>

        {/* House Rules */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home h-5 w-5 text-[#284E4C]">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#333333]">
              <span>House Rules</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-[#5C5C5A]">
              <div className="p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cigarette-off h-4 w-4">
                  <path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13"></path>
                  <path d="M18 8c0-2.5-2-2.5-2-5"></path>
                  <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                  <path d="M22 8c0-2.5-2-2.5-2-5"></path>
                  <path d="M7 12v4"></path>
                  <path d="m2 2 20 20"></path>
                </svg>
              </div>
              <span className="capitalize">
                <span>No smoking</span>
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-[#5C5C5A]">
              <div className="p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dog h-4 w-4">
                  <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"></path>
                  <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"></path>
                  <path d="M8 14v.5c0 .662-.336 1.272-.896 1.634l-.369.297c-.33.264-.634.68-.634 1.142V19a2 2 0 0 0 2 2h1.142c.462 0 .878-.304 1.142-.634l.297-.369c.362-.56.972-.896 1.634-.896h.344c.662 0 1.272.336 1.634.896l.297.369c.264.33.68.634 1.142.634H17a2 2 0 0 0 2-2v-1.027c0-.462-.302-.878-.634-1.142l-.369-.297C17.336 15.772 17 15.162 17 14.5V14a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2z"></path>
                </svg>
              </div>
              <span className="capitalize">
                <span>No pets</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#5C5C5A]">
              <div className="p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-party-popper h-4 w-4">
                  <path d="M5.8 11.3 2 22l10.7-3.79"></path>
                  <path d="M4 3h.01"></path>
                  <path d="M22 8h.01"></path>
                  <path d="M15 2h.01"></path>
                  <path d="M22 20h.01"></path>
                  <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"></path>
                  <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"></path>
                  <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"></path>
                  <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"></path>
                </svg>
              </div>
              <span className="capitalize">
                <span>No parties or events</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#5C5C5A]">
              <div className="p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-4 w-4">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <span className="capitalize">
                <span>Security deposit required</span>
              </span>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-x h-5 w-5 text-[#284E4C]">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                <path d="m14 14-4 4"></path>
                <path d="m10 14 4 4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#333333]">
              <span>Cancellation Policy</span>
            </h3>
          </div>
          <div className="space-y-4 bg-gray-50 rounded-lg p-4">
            <div>
              <h4 className="font-medium text-[#333333] mb-2">For stays less than 28 days</h4>
              <ul className="text-sm text-[#5C5C5A] space-y-1 list-disc list-inside">
                <li>Full refund up to 14 days before check-in</li>
                <li>No refund for bookings less than 14 days before check-in</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#333333] mb-2">For stays of 28 days or more</h4>
              <ul className="text-sm text-[#5C5C5A] space-y-1 list-disc list-inside">
                <li>Full refund up to 30 days before check-in</li>
                <li>No refund for bookings less than 30 days before check-in</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
