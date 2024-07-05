/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Body = () => {
  interface Model {
    date: string;
    modelName: string;
    modelLink: string;
  }

  const modelData: Model[] = [
    {
      date: 'June 28, 2023',
      modelName: 'COVID-19 X-Ray Model',
      modelLink: '/dashboard/trained',
    },
    {
      date: 'June 29, 2023',
      modelName: 'Lung Cancer detection Model',
      modelLink: '#',
    },
    {
      date: 'June 30, 2023',
      modelName: 'Pneumonia detection Model',
      modelLink: '#',
    },
  ];

  const blogData = [
    {
      thumbnail: 'https://via.placeholder.com/150',
      title: '10 Tips for Effective Machine Learning',
      link: '#',
    },
    {
      thumbnail: 'https://via.placeholder.com/150',
      title: "Understanding Neural Networks: A Beginner's Guide",
      link: '#',
    },
    {
      thumbnail: 'https://via.placeholder.com/150',
      title: 'The Future of Artificial Intelligence in Healthcare',
      link: '#',
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16 px-4 sm:px-48 lg:px-28">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Your Models
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Manage the models you have trained
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button className="block rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Use our AI service
            </button>
          </div>
        </div>
        <div className="mt-8">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-left text-black dark:text-white">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Model Name</th>
                <th className="px-4 py-3 font-medium">Model Link</th>
              </tr>
            </thead>
            <tbody>
              {modelData.map((model, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                  }`}
                >
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{model.date}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{model.modelName}</td>
                  <td className="px-4 py-3">
                    <a
                      href={model.modelLink}
                      className="text-purple-500 hover:underline"
                    >
                      View Model
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-10">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Latest Blog Posts
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Check out our latest articles and insights
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-3 text-gray-500 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span className="text-base font-medium">View All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {blog.title}
                </h3>
                <a
                  href={blog.link}
                  className="text-purple-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
