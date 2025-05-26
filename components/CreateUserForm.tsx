'use client';

import React, { useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
};

const departments = ['Sales', 'Engineering', 'HR', 'Marketing', 'Finance'];

export default function CreateUserForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.department) newErrors.department = 'Select a department';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('New user created:', form);
    alert('User created successfully!');

    onSuccess();
  };

  const inputBaseClasses =
    'w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        className={`${inputBaseClasses} ${
          errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
      />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        className={`${inputBaseClasses} ${
          errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
      />
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={`${inputBaseClasses} ${
          errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        className={`${inputBaseClasses} ${
          errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <option value="">Select Department</option>
        {departments.map(dep => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
      {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Create User
      </button>
    </form>
  );
}
