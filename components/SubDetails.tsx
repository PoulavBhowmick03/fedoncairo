"use client"
import React from 'react';


interface SubDetailsProps {
  planType: string;
  cost: string;
  description: string;
  isActive: boolean;
  additionalText: string;
}

const SubDetails: React.FC<SubDetailsProps> = ({ planType, cost, description, isActive, additionalText }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 px-4 sm:px-48 lg:px-28">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
            {planType} Plan
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-4">
            {description}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Cost: {cost}
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-300 mb-4">
              {isActive ? (
                <span className="text-green-500">Current Active Plan</span>
              ) : (
                <button className="rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  Upgrade to this Plan
                </button>
              )}
            </p>
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            <p>{additionalText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDetails;
