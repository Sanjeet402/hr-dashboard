'use client';

import React, { useState } from 'react';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <textarea
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        rows={4}
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        aria-label="Feedback"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>

      {submitted && <p className="text-green-600 mt-2">Feedback submitted! Thank you.</p>}
    </form>
  );
}
