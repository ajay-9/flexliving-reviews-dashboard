import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../shared/ui/Button';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isPropertyPage = pathname?.startsWith('/property/');

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Flex Living
        </Link>
        
        <div className="text-xl font-semibold text-gray-800">
          {isPropertyPage ? 'Property Details' : 'Reviews Dashboard'}
        </div>
        
        <div className="flex items-center gap-4">
          {/* ← NEW: Conditional navigation */}
          {isPropertyPage ? (
            <Link href="/">
              <Button variant="outline">
                Manage Reviews
              </Button>
            </Link>
          ) : (
            <Button variant="outline">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
