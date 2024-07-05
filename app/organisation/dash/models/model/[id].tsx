// app/organisation/dash/models/model/[id].tsx

import React from 'react';
import { useRouter } from 'next/router';
import modelsData from '../../../../../public/models.json';

interface Model {
  id: number;
  name: string;
  description: string;
  version: string;
  dateCreated: string;
}

const ModelPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const model = Object.values(modelsData)
    .flat()
    .find((m: Model) => m.id === Number(id));

  if (!model) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl text-gray-600 dark:text-gray-400">Model not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{model.name}</h1>
        <p className="text-xl mb-6">{model.description}</p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Model Details</h2>
          <p className="mb-2"><strong>Version:</strong> {model.version}</p>
          <p><strong>Date Created:</strong> {model.dateCreated}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Functionalities</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300">
              Train Model
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Test Model
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
              Download Model
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="mb-2"><strong>Accuracy:</strong> 95.5%</p>
            <p className="mb-2"><strong>F1 Score:</strong> 0.93</p>
            <p><strong>Training Time:</strong> 2.5 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;