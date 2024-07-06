"use client"
import React, { useMemo, useState, useEffect } from 'react';
import RegisterButton from './RegisterUserButton';
import 'react-toastify/dist/ReactToastify.css';
import { useAccount, useContract } from "@starknet-react/core";
import { toast } from 'react-toastify';
import { StakeAbi } from '@/utils/stake'; // Make sure to import your ABI

const UserRegistrationPage = () => {
  const { account, address, status } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);
  
  const { contract } = useContract({
    abi: StakeAbi,
    address: "0x0594831cfd1bce409c8c1c9154052de49b69a51bbbace4283afd9a7a6de7f39d", // Replace with your contract address
  });

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  useEffect(() => {
    const checkRegistration = async () => {
      if (contract && address) {
        try {
          setIsRegistered(true);
        } catch (error) {
          console.error("Error checking registration status:", error);
        }
      }
    };

    checkRegistration();
  }, [contract, address]);

  const handleSuccess = (walletAddress: any) => {
    toast.success(`User registered with wallet address: ${walletAddress}`);
    setIsRegistered(true);
  };

  const handleError = (error: any) => {
    console.error("Registration error:", error);
    toast.error("An error occurred while registering the user. Please try again.");
  };

  return (
    <header className="dark:bg-gray-900 sm:ml-24">
      <div className="max-w-screen-xl mx-40 py-8 sm:px-2 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-300 sm:text-3xl">
              Welcome Back, {shortenedAddress}
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">Lets train the model you want! 🎉</p>
          </div>

          {isRegistered ? (
            <button 
              className="inline-block rounded bg-purple-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              disabled
            >
              Registered
            </button>
          ) : (
            <RegisterButton onSuccess={handleSuccess} onError={handleError} />
          )}
        </div>
      </div>
    </header>
  );
};

export default UserRegistrationPage;