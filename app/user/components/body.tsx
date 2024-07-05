/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
interface Model {
  date: string;
  modelName: string;
  modelLink: string;
}

interface Blog {
  thumbnail: string;
  title: string;
  link: string;
}

const Body: React.FC = () => {
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
      <Section title="Your Models" subtitle="Manage the models you have trained">
        <button className="block rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-3 text-base font-medium text-white shadow-lg transition hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Use our AI service
        </button>
      </Section>
      <div className='mb-10'>
      <Table data={modelData} />
      </div>
      <Section title="Available models" subtitle="Check out our latest articles and insights">
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-gray-500 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
      </Section>
      <BlogGrid data={blogData} />
    </div>
  );
};

interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => (
  <div className="max-w-7xl mx-auto mb-12">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center sm:text-left mb-4 sm:mb-0">
        <h2 className="text-4xl font-bold text-black dark:text-white mb-2">{title}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-300">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">{children}</div>
    </div>
  </div>
);

interface TableProps {
  data: Model[];
}

const Table: React.FC<TableProps> = ({ data }) => (
  <div className="overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mx-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Date
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Model Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Model Link
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((model, index) => (
          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{model.date}</td>
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{model.modelName}</td>
            <td className="px-6 py-4 text-sm">
              <a href={model.modelLink} className="text-purple-500 dark:text-purple-400 hover:underline">
                View Model
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface BlogGridProps {
  data: Blog[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {data.map((blog, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{blog.title}</h3>
          <a href={blog.link} className="text-purple-500 dark:text-purple-400 hover:underline">
            Read more
          </a>
        </div>
      </div>
    ))}
  </div>
);

export default Body;
