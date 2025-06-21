import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Link href="/" className="flex items-center hover:text-gray-900">
        <ChevronLeft size={16} className="mr-1" />
        Back
      </Link>
    </nav>
  );
};
