import { useState, useMemo } from 'react';

type User = {
  id: number | string;
  name: string;
  email: string;
  department: string;
  rating: number;
};

export default function useSearch(users: User[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]); // ratings as strings for checkbox labels

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Department filter
      if (selectedDepartments.length > 0 && !selectedDepartments.includes(user.department)) {
        return false;
      }

      // Rating filter
      if (selectedRatings.length > 0 && !selectedRatings.includes(user.rating.toString())) {
        return false;
      }

      return true;
    });
  }, [users, searchTerm, selectedDepartments, selectedRatings]);

  return {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
  };
}
