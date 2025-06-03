'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;       // single full name string
  email: string;
  age?: number;       // optional, since it might not be present
  department: string;
  rating?: number;
};

type UserCardProps = {
  user: User;
  isBookmarkPage?: boolean;
};

export default function UserCard({ user, isBookmarkPage = false }: UserCardProps) {
  const router = useRouter();
  const toggleBookmark = useBookmarks(state => state.toggleBookmark);
  const isBookmarked = useBookmarks(state => state.isBookmarked);

  const bookmarked = isBookmarked(String(user.id ?? ''));

  // Split full name into first and last (optional, just for display)
  const [firstName, ...lastNameParts] = user.name.split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
      <p className="text-sm text-gray-500">{user.email}</p>
      <p className="text-sm text-gray-500">
        Age: {user.age ?? 'N/A'} | Dept: {user.department}
      </p>

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
