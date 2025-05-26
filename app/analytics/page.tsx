'use client';

import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { useBookmarks } from '@/hooks/useBookmarks';

Chart.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type User = {
  id: number;
  department: string;
  rating: number;
};

export default function AnalyticsPage() {
  const { bookmarks } = useBookmarks();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch user data from dummyjson or mock data here
    fetch('https://dummyjson.com/users?limit=50')
      .then(res => res.json())
      .then(data => {
        // Map data to users with dept and rating (mocked rating)
        const mapped = data.users.map((user: any) => ({
          id: user.id,
          department: user.company?.department || 'Unknown',
          rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
        }));
        setUsers(mapped);
      });
  }, []);

  // Calculate department-wise average rating
  const deptRatings = users.reduce<Record<string, { sum: number; count: number }>>((acc, user) => {
    if (!acc[user.department]) acc[user.department] = { sum: 0, count: 0 };
    acc[user.department].sum += user.rating;
    acc[user.department].count += 1;
    return acc;
  }, {});

  const departments = Object.keys(deptRatings);
  const avgRatings = departments.map(
    (dept) => deptRatings[dept].sum / deptRatings[dept].count
  );

  // Bookmark trend mock data (number of bookmarks over time)
  const bookmarkTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Bookmarks',
        data: [5, 10, 7, bookmarks.length], // last week = current bookmarks count
        fill: false,
        borderColor: 'rgb(34,197,94)', // green-500 tailwind
        tension: 0.3,
      },
    ],
  };

  const deptChartData = {
    labels: departments,
    datasets: [
      {
        label: 'Avg Rating',
        data: avgRatings,
        backgroundColor: 'rgba(37, 99, 235, 0.7)', // blue-600 tailwind
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h1>

      <section className="mb-12 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Department-wise Average Ratings</h2>
        <Bar data={deptChartData} />
      </section>

      <section className="max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Bookmark Trends</h2>
        <Line data={bookmarkTrendData} />
      </section>
    </div>
  );
}
