import React, { useState, useEffect } from 'react';
import DepositSolModal from "@/components/DepositSol"; // We'll create this component next

interface Model {
  name: string;
  description: string;
  versions: string[];
  dateCreated: string;
  link: string;
}

interface Category {
  name: string;
  models: Model[];
}

const ModelSelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Healthcare');
  const [categories, setCategories] = useState<Category[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/models.json');
      const data = await response.json();
      setCategories(data.categories);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const category = categories.find(cat => cat.name === selectedCategory);
    setModels(category ? category.models : []);
  }, [selectedCategory, categories]);

  const handleModelClick = (model: Model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  return (
    <div className='flex flex-col' onClick={()=>setIsModalOpen(!isModalOpen)}>
      <h2 className="text-2xl font-bold mb-4">Select a Model Category</h2>
      <div className="flex space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded ${selectedCategory === category.name ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Models in {selectedCategory}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model, index) => (
            <li key={index} className="border rounded p-4 hover:shadow-lg cursor-pointer" onClick={() => handleModelClick(model)}>
              <h4 className="font-bold">{model.name}</h4>
              <p className="text-sm text-gray-600">{model.description}</p>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && selectedModel && (
        <DepositSolModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modelName={selectedModel.name}
        />
      )}
    </div>
  );
};

export default ModelSelector;