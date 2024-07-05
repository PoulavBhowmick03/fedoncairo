"use client";
import React, { useState } from 'react';
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { StakeAbi } from '@/utils/stake';
import { toast } from 'react-toastify';

export interface RegisterOrgButtonProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (publicKey: string) => void;
    onError: (error: any) => void;
}
const RegisterOrgButton = ({ onSuccess, onError }: RegisterOrgButtonProps) => {
    const { address } = useAccount();
    const { chain } = useNetwork();
    const { contract } = useContract({
        abi: StakeAbi,
        address: "0x0594831cfd1bce409c8c1c9154052de49b69a51bbbace4283afd9a7a6de7f39d",
    });

    const [orgName, setOrgName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { writeAsync, isPending } = useContractWrite({
        calls: contract?.populateTransaction["register_organization"]!(),
    });

    const handleRegister = async () => {
        if (!address || !contract) {
            toast.error("Wallet not connected or contract not loaded");
            return;
        }

        try {
            const result = await writeAsync();
            console.log("Transaction submitted:", result);
            toast.success("Organization registration initiated. Please wait for confirmation.");
            if (onSuccess) onSuccess(address);
            setIsModalOpen(false);

        } catch (error) {
            console.error("Error registering organization:", error);
            toast.error("Error registering organization. Please try again.");
            if (onError) onError(error);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-500 hover:bg-purple-700 text-white p-4 rounded-lg transition duration-300"
            >
                Register Organization
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 p-20 flex justify-center items-center">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-white">Register Organization</h2>
                        <input
                            className='text-black border rounded p-2 mb-4 w-full'
                            type="text"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="Organization Name"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleRegister}
                                disabled={isPending}
                                className={`${
                                    isPending ? 'bg-gray-400' : 'bg-white hover:bg-gray-200'
                                } text-purple-700 px-4 py-2 rounded shadow transition-all`}
                            >
                                {isPending ? 'Registering...' : 'Register'}
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400 transition-all"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterOrgButton;