'use client';

import React, { useState, useEffect } from 'react';

type FilterDropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  // Close dropdown when clicking outside (optional enhancement)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#filter-dropdown-${label}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [label]);

  return (
    <div id={`filter-dropdown-${label}`} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label} {selected.length > 0 ? `(${selected.length})` : ''}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'} />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-60 overflow-auto">
          <div className="py-1">
            {options.map(option => (
              <label
                key={option}
                className="flex items-center px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="mr-2"
                  aria-checked={selected.includes(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
