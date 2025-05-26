// components/Header.tsx (or Navbar.tsx)
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-900 p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        HR Dashboard
      </h1>
      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link href="/bookmarks" className="text-blue-600 hover:underline">
          Bookmarks
        </Link>
        <Link href="/analytics" className="text-blue-600 hover:underline">
          Analytics
        </Link>
      </nav>
    </header>
  );
}
