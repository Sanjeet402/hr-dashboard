'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import UserCard from '@/components/UserCard';

// Define types here if you don't have a separate file
type User = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating?: number;
};

type Bookmark = {
  id: string;
  name: string;       // full name e.g. "John Doe"
  role: string;
  department: string;
  email?: string;
  age?: number;
  rating?: number;
};

function bookmarkToUser(bookmark: Bookmark): User {
  const [firstName, ...lastNameParts] = bookmark.name.split(' ');
  const lastName = lastNameParts.join(' ') || '';

  return {
    id: bookmark.id,
    firstName,
    lastName,
    email: bookmark.email || '',
    age: bookmark.age ?? 0,
    department: bookmark.department,
    rating: bookmark.rating || 0,
  };
}

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks(); // No cast needed
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📌 Bookmarked Employees</h1>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => {
            const user = bookmarkToUser(bookmark);
            return <UserCard key={user.id} user={user} isBookmarkPage />;
          })}
        </div>
      )}
    </div>
  );
}
