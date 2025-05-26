// components/UserCard.tsx
'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { useRouter } from 'next/navigation';

export default function UserCard({ user, isBookmarkPage = false }) {
  const router = useRouter();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(user.id);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
      <p className="text-sm text-gray-500">{user.email}</p>
      <p className="text-sm text-gray-500">Age: {user.age} | Dept: {user.department}</p>

      {/* Stars */}
      <div className="flex my-2">
        {'⭐️'.repeat(user.rating || 0)}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          View
        </button>

        {isBookmarkPage ? (
          <>
            <button
              onClick={() => toggleBookmark(user)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
            <button
              onClick={() => alert('Promoted!')}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Promote
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleBookmark(user)}
              className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button 
              onClick={() => alert('Promoted!')} 
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Promote
            </button>
          </>
        )}
      </div>
    </div>
  );
}
