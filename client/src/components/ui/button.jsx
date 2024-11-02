import React from 'react';

export function Button({ children, onClick, className, disabled }) {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-4 rounded-md font-bold text-white transition-all duration-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}