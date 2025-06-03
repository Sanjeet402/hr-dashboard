import { useState } from 'react';

type Bookmark = {
  id: string;
  name: string;
  role: string;
  department: string;
  email?: string;
  age?: number;
  rating?: number;
};

export function useBookmarks(): { bookmarks: Bookmark[] } {
  const [bookmarks] = useState<Bookmark[]>([
    {
      id: '1',
      name: 'Jane Doe',
      role: 'Software Engineer',
      department: 'Engineering',
      email: 'jane@example.com',
      age: 28,
      rating: 4.7,
    },
    {
      id: '2',
      name: 'John Smith',
      role: 'Product Manager',
      department: 'Product',
      email: 'john@example.com',
      age: 32,
      rating: 4.3,
    },
  ]);

  return { bookmarks };
}
