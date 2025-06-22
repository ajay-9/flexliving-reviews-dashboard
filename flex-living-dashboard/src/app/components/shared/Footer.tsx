import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#284E4C] text-white font-sans mt-0">
      <div className="container mx-auto px-4 py-16 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Join The Flex Section */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2 font-sans">
                <span>Join The Flex</span>
              </h3>
              <p className="text-gray-300 mb-6 font-sans">
                <span>Sign up now and stay up to date on our latest news and exclusive deals including 5% off your first stay!</span>
              </p>
            </div>
            
            {/* Newsletter Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans" 
                  placeholder="First name" 
                  required 
                  type="text" 
                />
                <input 
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans" 
                  placeholder="Last name" 
                  required 
                  type="text" 
                />
              </div>
              
              <input 
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans" 
                placeholder="Email address" 
                required 
                type="email" 
              />
              
              <div className="flex gap-2">
                <button 
                  type="button" 
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[120px] h-10 min-h-[40px] bg-white/10 border-white/20 text-white font-sans"
                >
                  <div className="flex items-center gap-1 font-sans">
                    🇬🇧<span className="font-sans">+44</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                
                <input 
                  className="flex w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 h-10 min-h-[40px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans" 
                  placeholder="Phone number" 
                  required 
                  type="tel" 
                />
              </div>
              
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2 w-full bg-white text-primary hover:bg-gray-100 transition-colors font-sans" 
                type="submit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
                <span className="font-sans">Subscribe</span>
              </button>
            </form>
          </div>

          {/* The Flex Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              <span>The Flex</span>
            </h3>
            <p className="mb-4 text-gray-300 font-sans">
              <span>Professional property management services for landlords, flexible corporate lets for businesses and quality accommodations for short-term and long-term guests.</span>
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/theflexliving/" className="text-white hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/theflex.global/" className="text-white hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/theflexliving" className="text-white hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors font-sans" href="#">
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors font-sans" href="#">
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors font-sans" href="#">
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors font-sans" href="#">
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              <span>Locations</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <div className="text-gray-300 hover:text-white transition-colors font-sans cursor-pointer">
                  <span>London</span>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-white transition-colors font-sans cursor-pointer">
                  <span>Paris</span>
                </div>
              </li>
              <li>
                <div className="text-gray-300 hover:text-white transition-colors font-sans cursor-pointer">
                  <span>Algiers</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Us Section - Updated with random numbers */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              <span>Contact Us</span>
            </h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 flex-shrink-0">
                    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span className="font-medium font-sans">
                    <span>Support Numbers</span>
                  </span>
                </div>
                <ul className="space-y-2">
                  <li>
          <div className="flex items-center text-gray-300">
            <span className="mr-2">🇬🇧</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium font-sans">
                <span>United Kingdom</span>
              </span>
              <span className="text-sm font-sans">+44 77 2374 5646</span>
            </div>
          </div>
        </li>
                  <li>
          <div className="flex items-center text-gray-300">
            <span className="mr-2">🇩🇿</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium font-sans">
                <span>Algeria</span>
              </span>
              <span className="text-sm font-sans">+33 7 57 59 22 41</span>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-center text-gray-300">
            <span className="mr-2">🇫🇷</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium font-sans">
                <span>France</span>
              </span>
              <span className="text-sm font-sans">+33 6 44 64 57 17</span>
            </div>
          </div>
        </li>
      </ul>
    </li>
    <li className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 flex-shrink-0">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
      <span className="text-gray-300 font-sans">
        info@theflex.global
      </span>
    </li>
  </ul>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-white">
          <p className="font-sans">
            © 2025 <span>The Flex. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
