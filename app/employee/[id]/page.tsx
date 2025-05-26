'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EmployeeDetailTabs from '@/components/EmployeeDetailTabs';

type User = {
  id: string | number;
  name: string;
  email: string;
  age: number;
  department: string;
  address: string;
  phone: string;
  bio: string;
  rating: number;
  projects: string[];
};

export default function EmployeeDetailPage() {
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Mock fetch user by id
    async function fetchUser() {
      const dummyUser: User = {
        id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 32,
        department: 'Engineering',
        address: '123 Main St, Springfield',
        phone: '+1 (555) 123-4567',
        bio: 'A dedicated engineer with 5 years experience in full-stack development.',
        rating: 4,
        projects: [
          'Project Apollo',
          'Website Redesign',
          'Internal Tools Upgrade',
        ],
      };
      setUser(dummyUser);
    }
    fetchUser();
  }, [id]);

  if (!user) return <p className="p-6 text-center">Loading user data...</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <EmployeeDetailTabs user={user} />
    </main>
  );
}
