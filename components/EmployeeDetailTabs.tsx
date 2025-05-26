'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FeedbackForm from './FeedbackForm';

type Tab = 'Overview' | 'Projects' | 'Feedback';

type EmployeeDetailTabsProps = {
  user: any; // Ideally define a proper User type
};

export default function EmployeeDetailTabs({ user }: EmployeeDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  return (
    <div className="mt-6">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-300 dark:border-gray-600">
        {(['Overview', 'Projects', 'Feedback'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px border-b-2 font-medium ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Animated Tab Content */}
      <div className="mt-4 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {activeTab === 'Overview' && (
              <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p className="mt-2"><strong>Bio:</strong> {user.bio}</p>

                <div className="mt-3 flex items-center">
                  <span className="mr-2 font-semibold">Performance Rating:</span>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < user.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.067 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.282-3.957z" />
                    </svg>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Projects' && (
              <div>
                <h3 className="font-semibold mb-2">Projects</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(user.projects || []).map((project: string, i: number) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'Feedback' && (
              <div>
                <h3 className="font-semibold mb-2">Submit Feedback</h3>
                <FeedbackForm />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
