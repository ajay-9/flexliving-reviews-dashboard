"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface PropertyHeaderProps {
  title?: string;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ 
  title = "Property Details" 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Trigger after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed left-0 right-0 w-full z-50 top-0 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#284E4C] shadow-lg backdrop-blur-sm' // Dark green when scrolled (Image 2)
          : 'bg-white/90 backdrop-blur-sm shadow-sm'   // Light/transparent at top (Image 1)
      }`}
      style={{ top: '0px' }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-[88px]">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              {isScrolled ? (
                // White logo for dark background
                <img
                  alt="The Flex"
                  width={120}
                  height={40}
                  className="object-contain"
                  src="https://lsmvmmgkpbyqhthzdexc.supabase.co/storage/v1/object/public/website/Uploads/White_V3%20Symbol%20&%20Wordmark.png"
                  style={{ color: 'transparent' }}
                />
              ) : (
                // Dark logo for light background
                <div className="text-2xl font-bold text-[#284E4C]">
                  the flex.
                </div>
              )}
            </div>
          </Link>

          {/* Center Title */}
          <div className="hidden md:block">
            <h1 className={`text-xl font-semibold transition-colors duration-500 ${
              isScrolled ? 'text-white' : 'text-[#284E4C]'
            }`}>
              {title}
            </h1>
          </div>

          {/* Right Side Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Navigation Items */}
            <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium transition-colors duration-500 ${
              isScrolled 
                ? 'text-white hover:bg-white/10' 
                : 'text-[#284E4C] hover:bg-[#284E4C]/10'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path>
              </svg>
              <span>Landlords</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>

            <Link href="/about-us" className={`font-medium transition-colors duration-500 ${
              isScrolled ? 'text-white' : 'text-[#284E4C]'
            }`}>
              <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium transition-colors duration-500 ${
                isScrolled 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-[#284E4C] hover:bg-[#284E4C]/10'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <span>About Us</span>
              </button>
            </Link>

            <Link href="/careers" className={`font-medium transition-colors duration-500 ${
              isScrolled ? 'text-white' : 'text-[#284E4C]'
            }`}>
              <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium transition-colors duration-500 ${
                isScrolled 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-[#284E4C] hover:bg-[#284E4C]/10'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <path d="M12 7v14"></path>
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                </svg>
                <span>Careers</span>
              </button>
            </Link>

            <Link href="/contact" className={`font-medium transition-colors duration-500 ${
              isScrolled ? 'text-white' : 'text-[#284E4C]'
            }`}>
              <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium transition-colors duration-500 ${
                isScrolled 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-[#284E4C] hover:bg-[#284E4C]/10'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>Contact</span>
              </button>
            </Link>

            {/* Language and Currency */}
            <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium transition-colors duration-500 ${
              isScrolled 
                ? 'text-white hover:bg-white/10' 
                : 'text-[#284E4C] hover:bg-[#284E4C]/10'
            }`}>
              <span className="flex items-center">
                <span className="pr-2">🇬🇧</span>
                <span className="hidden sm:inline">English</span>
              </span>
            </button>

            <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium transition-colors duration-500 ${
              isScrolled 
                ? 'text-white hover:bg-white/10' 
                : 'text-[#284E4C] hover:bg-[#284E4C]/10'
            }`}>
              £ GBP
            </button>

            {/* Manage Reviews Button */}
            <Link
              href="/"
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 transition-colors duration-500 ${
                isScrolled
                  ? 'bg-white text-[#284E4C] hover:bg-gray-100'
                  : 'bg-[#284E4C] text-white hover:bg-[#284E4C]/90'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
              Manage Reviews
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className={`inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-3 text-xs md:hidden transition-colors duration-500 ${
            isScrolled 
              ? 'text-white hover:bg-white/10' 
              : 'text-[#284E4C] hover:bg-[#284E4C]/10'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};
