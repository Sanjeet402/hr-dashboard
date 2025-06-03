'use client';

import React, { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import useSearch from '@/hooks/useSearch';
import ProtectedRoute from '@/components/ProtectedRoute';
import Modal from '@/components/Modal';
import CreateUserForm from '@/components/CreateUserForm';

type User = {
  id: number | string;
  firstName: string;
  lastName: string;
  name: string; // ✅ Add this
  email: string;
  age: number;
  department: string;
  rating: number;
};

const departments = ['Sales', 'Engineering', 'HR', 'Marketing', 'Finance'];
const ratings = ['1', '2', '3', '4', '5'];

const USERS_PER_PAGE = 8;

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();

      const enriched = data.users.map((user: any, i: number) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`, // ✅ Add this
        email: user.email,
        age: user.age,
        department: departments[i % departments.length],
        rating: Math.floor(Math.random() * 5) + 1,
      }));

      setUsers(enriched as User[]);

    }
    fetchUsers();
  }, []);

  const {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
  } = useSearch(users);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredUsers, totalPages, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-6">
        <button
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Create User
        </button>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterDropdown
            label="Department"
            options={departments}
            selected={selectedDepartments}
            onChange={setSelectedDepartments}
          />
          <FilterDropdown
            label="Rating"
            options={ratings}
            selected={selectedRatings}
            onChange={setSelectedRatings}
          />
        </div>

        {paginatedUsers.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No employees match your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    pageNum === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Create New User</h2>
          <CreateUserForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </main>
    </ProtectedRoute>
  );
}
