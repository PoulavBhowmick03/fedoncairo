"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

  return (
    <div className='flex'>
      <h2>Select a Model Category</h2>
      <div>
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div>
        <h3>Models in {selectedCategory}</h3>
        <ul>
          {models.map((model, index) => (
            <li key={index}>
              <Link href={model.link}>
                {model.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModelSelector;
