/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';

interface CardData {
  name: string;
  description: string;
}

const cardData: CardData[] = [
  { name: 'Model 1', description: 'Description for model 1' },
  { name: 'Model 2', description: 'Description for model 2' },
  { name: 'Model 3', description: 'Description for model 3' },
  { name: 'Model 4', description: 'Description for model 4' },
  { name: 'Model 5', description: 'Description for model 5' },
  { name: 'Model 6', description: 'Description for model 6' },
];

const ChatComponent: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const generatedImage = 'https://via.placeholder.com/300'; // Replace this with the actual image URL
    setImage(generatedImage);
  };

  const handleNewPrompt = () => {
    setPrompt('');
    setImage(null);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col justify-between py-4 px-4 sm:px-48 lg:px-28">
      <div className="max-w-7xl mx-auto flex-grow mb-10">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Generate an Image
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Enter a prompt to generate an image
            </p>
          </div>
        </div>

        <div className="flex-grow">
          {image ? (
            <div className="mt-8 text-center">
              <img src={image} alt="Generated" className="mx-auto" />
              <button
                onClick={handleNewPrompt}
                className="mt-4 rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Generate New Image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cardData.map((model, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 transition-transform transform hover:scale-105"
                >
                  <div className="flex flex-col h-full justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                    <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
                      {model.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                      {model.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
          placeholder="Enter your prompt here..."
        />
        <button
          type="submit"
          className="ml-4 rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Generate Image
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
