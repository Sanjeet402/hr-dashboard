import { create } from 'zustand';

export const useBookmarks = create((set, get) => ({
  bookmarks: [],
  toggleBookmark: (user) => {
    const exists = get().bookmarks.find(u => u.id === user.id);
    if (exists) {
      set({ bookmarks: get().bookmarks.filter(u => u.id !== user.id) });
    } else {
      set({ bookmarks: [...get().bookmarks, user] });
    }
  },
  isBookmarked: (id) => !!get().bookmarks.find(u => u.id === id),
}));
