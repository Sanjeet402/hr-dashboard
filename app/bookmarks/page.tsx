'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import UserCard from '@/components/UserCard';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📌 Bookmarked Employees</h1>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <UserCard
              key={bookmark.id}
              user={{
                id: bookmark.id,
                name: bookmark.name,
                email: bookmark.email || '',
                age: bookmark.age ?? 0,
                department: bookmark.department,
                rating: bookmark.rating || 0,
              }}
              isBookmarkPage
            />
          ))}
        </div>
      )}
    </div>
  );
}
