"use client";
import React from 'react';
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { StakeAbi } from '@/utils/stake';
import { toast } from 'react-toastify';

type RegisterButtonProps = {
  onSuccess: (address: string) => void;
  onError: (error: any) => void;
};

const RegisterButton = ({ onSuccess, onError }: RegisterButtonProps) => {
    const { address } = useAccount();
    const { chain } = useNetwork();
    const { contract } = useContract({
        abi: StakeAbi,
        address: "0x0594831cfd1bce409c8c1c9154052de49b69a51bbbace4283afd9a7a6de7f39d",
    });

    const { writeAsync, isPending } = useContractWrite({
        calls: contract?.populateTransaction["register_user"]!(),
    });

    const handleRegister = async () => {
        if (!address || !contract) {
            toast.error("Wallet not connected or contract not loaded");
            return;
        }

        try {
            const result = await writeAsync();
            console.log("Transaction submitted:", result);
            toast.success("User registration initiated. Please wait for confirmation.");
            if (onSuccess) onSuccess(address);
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Error registering user. Please try again.");
            if (onError) onError(error);
        }
    };

    return (
        <button
            onClick={handleRegister}
            disabled={isPending}
            className={`mt-2 flex flex-col sm:mt-0 sm:flex-row sm:items-center ${
                isPending ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-700'
            } text-white p-4 rounded-lg transition duration-300`}
        >
            {isPending ? 'Registering...' : 'Register'}
        </button>
    );
};

export default RegisterButton;