'use client';

import React from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="search"
      placeholder="Search by name, email, or department..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      aria-label="Search employees"
    />
  );
}
