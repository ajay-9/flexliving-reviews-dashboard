import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg text-card-foreground p-6 mb-12 bg-white border-0 shadow-lg ${className}`}>
      {children}
    </div>
  );
};
