"use client"
import React, { useState } from 'react';
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { StakeAbi } from '@/utils/stake';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { uint256 } from 'starknet';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: string;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, modelName }) => {
  const [amount, setAmount] = useState<string>('');
  const [orgAddress, setOrgAddress] = useState<string>('');
  const router = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { contract } = useContract({
    abi: StakeAbi,
    address: "0x0594831cfd1bce409c8c1c9154052de49b69a51bbbace4283afd9a7a6de7f39d",
  });
  const { writeAsync: depositAsync, isPending: isDepositPending } = useContractWrite({
    calls: [
      {
        contractAddress: contract?.address ?? "",
        entrypoint: "deposit",
        calldata: [], // This will be populated when calling the function
      },
    ],
  });
  const handleDeposit = async () => {
    if (!address || !contract || !amount || !orgAddress) {
      toast.error("Please fill in all fields and connect your wallet.");
      return;
    }

    try {
      // Check if user is registered
      const isEligible = await contract.call("is_eligible", [address]);
      if (!isEligible) {
        toast.error("You are not registered. Please register first.");
        return;
      }

      // Convert amount to uint256
      const amountInWei = BigInt(Math.floor(parseFloat(amount) * 10**18));
      const amountBN = uint256.bnToUint256(amountInWei);

      // Proceed with deposit
      const result = await depositAsync({
        calls: [
          {
            contractAddress: contract.address,
            entrypoint: "deposit",
            calldata: [address, orgAddress, amountBN.low, amountBN.high],
          },
        ],
      });

      console.log("Deposit transaction submitted:", result);
      toast.success("Deposit initiated. Please wait for confirmation.");

      // You might want to add a way to check the transaction status here

      setTimeout(() => {
        router.push('/user/download');
      }, 3000);

    } catch (error) {
      console.error("Error during deposit:", error);
      toast.error("Error during deposit. Please try again.");
    }
  }; if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Deposit for {modelName}</h2>
        <p className="mb-6 flex flex-wrap text-purple-200">Your wallet: {address}</p>
        <input
          className='w-full p-3 mb-6 bg-purple-800 border border-purple-600 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500'
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to deposit"
        />
        <input
          className='w-full p-3 mb-6 bg-purple-800 border border-purple-600 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500'
          type="text"
          value={orgAddress}
          onChange={(e) => setOrgAddress(e.target.value)}
          placeholder="Organization Address"
        />
        <div className="flex justify-between">
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDeposit}
            disabled={isDepositPending || !address || !amount || !orgAddress}
          >
            {isDepositPending ? 'Processing...' : 'Stake'}
          </button>          <button
            className="bg-purple-800 text-purple-200 px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;