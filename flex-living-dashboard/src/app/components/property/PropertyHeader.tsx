"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface PropertyHeaderProps {
  title?: string;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  title = "Property Details",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Trigger after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 w-full z-50 top-0 transition-all duration-500 ${
        isScrolled
          ? "bg-[#284E4C] shadow-lg backdrop-blur-sm"
          : "bg-[#FFFDF6] shadow-sm backdrop-blur-sm"
      }`}
      style={{ top: "0px" }}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-[88px]">
          
          {/* Logo Section - Left Side */}
          <div className="flex items-center">
            <div className="flex items-center">
              {isScrolled ? (
                // White logo for dark background
                <img
                  alt="The Flex"
                  width={120}
                  height={40}
                  className="object-contain"
                  src="https://lsmvmmgkpbyqhthzdexc.supabase.co/storage/v1/object/public/website/Uploads/White_V3%20Symbol%20&%20Wordmark.png"
                  style={{ color: "transparent" }}
                />
              ) : (
                // Dark logo for light background
                <img
                  alt="The Flex"
                  width={120}
                  height={40}
                  className="object-contain"
                  src="/images/logo.png"
                  style={{ color: "transparent" }}
                />
              )}
            </div>
          </div>

          {/* Center Navigation - Hidden on mobile - TEXT ONLY (NO LINKS) */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* Landlords - TEXT ONLY */}
            <div
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-9 px-4 py-2 font-medium transition-colors duration-500 cursor-default ${
                isScrolled
                  ? "text-white"
                  : "text-[#284E4C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4"></path>
                <path d="M10 10h4"></path>
                <path d="M10 14h4"></path>
                <path d="M10 18h4"></path>
              </svg>
              <span>Landlords</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>

            {/* About Us - TEXT ONLY */}
            <div
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-9 px-4 py-2 font-medium transition-colors duration-500 cursor-default ${
                isScrolled
                  ? "text-white"
                  : "text-[#284E4C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <span>About Us</span>
            </div>

            {/* Careers - TEXT ONLY */}
            <div
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-9 px-4 py-2 font-medium transition-colors duration-500 cursor-default ${
                isScrolled
                  ? "text-white"
                  : "text-[#284E4C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4"></path>
                <path d="M10 10h4"></path>
                <path d="M10 14h4"></path>
                <path d="M10 18h4"></path>
              </svg>
              <span>Careers</span>
            </div>

            {/* Contact - TEXT ONLY */}
            <div
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-9 px-4 py-2 font-medium transition-colors duration-500 cursor-default ${
                isScrolled
                  ? "text-white"
                  : "text-[#284E4C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span>Contact</span>
            </div>
          </div>

          {/* RIGHT SIDE - Language, Currency, and Manage Reviews */}
          <div className="flex items-center space-x-3 mr-2">
            
            {/* Language and Currency - TEXT ONLY (Hidden on smaller screens) */}
            <div className="hidden md:flex items-center space-x-2">
              <div
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-9 px-3 py-2 font-medium transition-colors duration-500 cursor-default ${
                  isScrolled
                    ? "text-white"
                    : "text-[#284E4C]"
                }`}
              >
                <span className="flex items-center">
                  <span className="pr-2">🇬🇧</span>
                  <span>English</span>
                </span>
              </div>

              <div
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-9 px-3 py-2 font-medium transition-colors duration-500 cursor-default ${
                  isScrolled
                    ? "text-white"
                    : "text-[#284E4C]"
                }`}
              >
                £ GBP
              </div>
            </div>

            {/* ✅ MANAGE REVIEWS BUTTON - KEEP AS FUNCTIONAL LINK TO YOUR DASHBOARD */}
            <Link
              href="/"
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 transition-colors duration-500 ${
                isScrolled
                  ? "bg-white text-[#284E4C] hover:bg-gray-100"
                  : "bg-[#284E4C] text-white hover:bg-[#284E4C]/90"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
              Manage Reviews
            </Link>

            {/* Mobile Menu Button - TEXT ONLY */}
            <div
              className={`lg:hidden inline-flex items-center justify-center whitespace-nowrap font-medium h-8 rounded-md px-3 text-xs transition-colors duration-500 cursor-default ${
                isScrolled
                  ? "text-white"
                  : "text-[#284E4C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
