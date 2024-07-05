"use client"
import React, { useState } from 'react';
import modelsData from '../../../public/models.json';
import DepositSol from "@/components/DepositSol";

interface Model {
  id: number;
  name: string;
  description: string;
  version: string;
  dateCreated: string;
}

const Train: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const categories = Object.keys(modelsData);

  const getFilteredModels = () => {
    if (selectedCategory) {
      return modelsData[selectedCategory as keyof typeof modelsData];
    }
    return Object.values(modelsData).flat();
  };

  const filteredModels = getFilteredModels();
  const handleModelClick = (model: Model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  return (
    <section  className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 sm:ml-48">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Train the available ML models</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Select a category to view specific models or browse all available models.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 " >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" onClick={() => setIsModalOpen(!isModalOpen)}>
          {filteredModels.map((model: Model) => (
            <div key={model.id}
            onClick={() => handleModelClick(model)}
>
              <div className="block rounded-xl border border-gray-300 dark:border-gray-700 p-8 shadow-xl transition hover:border-purple-500 hover:shadow-purple-500/10 h-60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-10 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">{model.name}</h2>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{model.description}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedModel && (
        <DepositSol
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modelName={selectedModel.name}
        />
      )}
    </section>
  );
}

export default Train;