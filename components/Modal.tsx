'use client';

import React from 'react';

export default function Modal({ isOpen, onClose, children }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
