import React from 'react';

export function Alert({ children, className }) {
  return (
    <div className={`border-l-4 p-4 rounded-md ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className }) {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );
}

export function AlertDescription({ children, className }) {
  return (
    <p className={`text-sm ${className}`}>
      {children}
    </p>
  );
}