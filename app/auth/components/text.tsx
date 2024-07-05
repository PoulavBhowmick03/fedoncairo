"use client";
import { TypewriterEffectSmooth } from "./ui";
export function TypeWriter() {
  const words = [
    {
      text: "Get",
    },
    {
      text: "Started",
    },
    {
      text: "Model Training",
    },
    {
      text: "With",
    },
    {
      text: "FedChain.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 sm:text-2xl  ">
        The truly decentralised Federated Learning Platform
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
  <button className="w-60 h-20 rounded-2xl bg-black border dark:border-white border-transparent hover:bg-gray-600 hover:text-black text-white text-xl transition-colors duration-300 ease-in-out">
    <a href="/user/dash">Join as a User</a>
  </button>
  <button className="w-60 h-20 rounded-2xl bg-white text-black border hover:bg-gray-500 hover:text-white border-black text-xl transition-colors duration-300 ease-in-out">
    <a href="/organisation/dash/models">Join as an Organisation</a>
  </button>
</div>
    </div>
  );
}
