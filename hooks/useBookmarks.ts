import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  role: string;
  department: string;
  email?: string;
  age?: number;
  rating?: number;
};

type BookmarksStore = {
  bookmarks: User[];
  toggleBookmark: (user: User) => void;
  isBookmarked: (id: string) => boolean;
};

export const useBookmarks = create<BookmarksStore>((set, get) => ({
  bookmarks: [],
  toggleBookmark: (user) => {
    const exists = get().bookmarks.find((u) => u.id === user.id);
    if (exists) {
      set({ bookmarks: get().bookmarks.filter((u) => u.id !== user.id) });
    } else {
      set({ bookmarks: [...get().bookmarks, user] });
    }
  },
  isBookmarked: (id) => !!get().bookmarks.find((u) => u.id === id),
}));
