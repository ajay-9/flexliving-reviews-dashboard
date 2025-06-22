import React from 'react';

interface PropertyAmenitiesProps {
  amenities: string[];
}

export const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  return (
    <div className="rounded-lg text-card-foreground p-6 mb-12 bg-white border-0 shadow-lg">
      {/* Header with exact styling from dev tools */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#333333]">
          <span>Amenities</span>
        </h2>
        <button 
          className="justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-9 px-4 py-2 flex items-center gap-2 border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5" 
          type="button"
        >
          <span>View all amenities</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>

      {/* Amenities Grid - Exact styling from dev tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Cable TV */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sofa h-4 w-4">
              <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"></path>
              <path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"></path>
              <path d="M4 18v2"></path>
              <path d="M20 18v2"></path>
              <path d="M12 4v9"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Cable TV</span>
          </span>
        </div>

        {/* Internet */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network h-4 w-4">
              <rect x="16" y="16" width="6" height="6" rx="1"></rect>
              <rect x="2" y="16" width="6" height="6" rx="1"></rect>
              <rect x="9" y="2" width="6" height="6" rx="1"></rect>
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
              <path d="M12 12V8"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Internet</span>
          </span>
        </div>

        {/* Wireless */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wifi h-4 w-4">
              <path d="M12 20h.01"></path>
              <path d="M2 8.82a15 15 0 0 1 20 0"></path>
              <path d="M5 12.859a10 10 0 0 1 14 0"></path>
              <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Wireless</span>
          </span>
        </div>

        {/* Kitchen */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils-crossed h-4 w-4">
              <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"></path>
              <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"></path>
              <path d="m2.1 21.8 6.4-6.3"></path>
              <path d="m19 5-7 7"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Kitchen</span>
          </span>
        </div>

        {/* Washing Machine */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-washing-machine h-4 w-4">
              <path d="M3 6h3"></path>
              <path d="M17 6h.01"></path>
              <rect width="18" height="20" x="3" y="2" rx="2"></rect>
              <circle cx="12" cy="13" r="5"></circle>
              <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Washing Machine</span>
          </span>
        </div>

        {/* Hair Dryer */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wind h-4 w-4">
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Hair Dryer</span>
          </span>
        </div>

        {/* Heating */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thermometer h-4 w-4">
              <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Heating</span>
          </span>
        </div>

        {/* Smoke Detector */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-4 w-4">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Smoke detector</span>
          </span>
        </div>

        {/* Carbon Monoxide Detector */}
        <div className="flex items-center gap-3 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-4 w-4">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <span className="capitalize">
            <span>Carbon Monoxide Detector</span>
          </span>
        </div>
      </div>
    </div>
  );
};
