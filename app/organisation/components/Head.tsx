/* eslint-disable react/no-unescaped-entities */
'use client';
import RegisterOrgButton from "@/app/organisation/components/RegisterOrg"; // Update this import path as necessary
import { useAccount } from "@starknet-react/core";
import { useState } from 'react';
import { toast } from 'react-toastify';

const Head = () => {
  const { address } = useAccount();

  const handleRegisterOrgSuccess = (address: string) => {
    console.log("Organization registered with address:", address);
    toast.success(`Organization registered successfully for address: ${address}`);
  };

  const handleRegisterOrgError = (error: any) => {
    console.error("Error registering organization:", error);
    toast.error("Error registering organization. Please try again.");
  };

  return (
    <header className="dark:bg-gray-900 sm:ml-24">
      <div className="max-w-screen-xl mx-40 py-8 sm:px-2 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-300 sm:text-3xl">
              Welcome Back, {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect your wallet'}
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">Let's train the model you want! 🎉</p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <RegisterOrgButton
              onSuccess={handleRegisterOrgSuccess}
              onError={handleRegisterOrgError} isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.");
              } }            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Head;