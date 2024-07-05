"use client"
import Link from "next/link";
import { GetServerSideProps } from "next";
// import SolDeposit from "./DepositSol";
import { useState } from "react";

type ModelDetails = {
  description: string;
  steps: string[];
};

type TrainedProps = {
  modelDetails: ModelDetails | null;
};

const Trained: React.FC<TrainedProps> = ({ modelDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDownload = async () => {
    const response = await fetch("/api/download");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "client.py";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-screen sm:ml-48">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Your Models
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Manage the models you have trained
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
              className="block rounded-lg bg-red-400 px-6 py-3 text-base font-medium text-white transition hover:bg-red-500 focus:outline-none focus:ring"
            >
              Use our AI service
            </button>
          </div>
        </div>
        <div className="mt-8"></div>
      </div>
      <Link href="https://drive.google.com/file/d/1f8oQ03vDLCyZkcCrpi6wGGp9FzsT7YqR/view">
        <div className="max-w-7xl mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between sm:ml-24">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Model 1</h2>
            </div>
          </div>
        </div>
      </Link>
      <div className="pt-5 pl-24 pr-6 grid grid-cols-1 gap-4 transition-[grid-template-columns] lg:grid-cols-[1fr_120px] lg:gap-8 lg:[&:has(>*:last-child:hover)]:grid-cols-[1fr_160px]">
        <div className="ml-4 h-56 rounded-lg bg-gray-200 dark:bg-gray-700">
          <div className="p-4 text-black dark:text-gray-200 text-left">
            <h3 className="font-bold text-lg mb-2">COVID-19 X-ray Tracking Model Details:</h3>
            {modelDetails ? (
              <>
                <p className="text-sm">
                  {modelDetails.description}
                </p>
                <p className="text-sm mt-2">
                  To train this model:
                </p>
                <ul className="list-disc list-inside text-sm">
                  {modelDetails.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm">Loading model details...</p>
            )}
          </div>
        </div>
        {/* <div className="">
          <div className="h-14 rounded-lg bg-gray-200 flex items-center justify-center m-2 text-black cursor-pointer" onClick={handleDownload}>
            <IoMdDownload />
            Download
          </div>
        </div> */}
        <div className="">
          <div className="h-14 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center m-2 text-black dark:text-gray-200 cursor-pointer">
            <button onClick={openModal} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Open Deposit Modal
            </button>
            {/* <SolDeposit isOpen={isModalOpen} onClose={closeModal} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch your model details here, for example from a database or API
  const modelDetails: ModelDetails = {
    description: "This model is trained on X-ray images of COVID-19 patients to track and analyze patterns related to the virus. It utilizes deep learning techniques to identify specific features indicative of COVID-19 infection in X-ray scans.",
    steps: [
      "Collect a dataset of X-ray images from COVID-19 patients.",
      "Preprocess the images to enhance features and remove noise.",
      "Use a deep learning framework such as TensorFlow or PyTorch to train the model.",
      "Optimize the model's parameters and hyperparameters for accuracy and performance.",
      "Evaluate the model's performance using validation datasets and adjust as necessary."
    ]
  };

  return {
    props: {
      modelDetails
    }
  };
};

export default Trained;
