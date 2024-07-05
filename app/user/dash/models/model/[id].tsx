// pages/models/[id].tsx
import { useRouter } from 'next/router';
import React from 'react';
import modelsData from '@/public/models.json';

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
    return <div>Model not found</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{model.name}</h1>
        <p className="text-xl mb-6">{model.description}</p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Model Details</h2>
          <p><strong>Version:</strong> {model.version}</p>
          <p><strong>Date Created:</strong> {model.dateCreated}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Functionalities</h2>
          <div className="flex space-x-4">
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Train Model
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Test Model
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Download Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;