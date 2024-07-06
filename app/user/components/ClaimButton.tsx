"use client"
import React, { useState, useEffect } from 'react';
import { useContract, useContractWrite, useContractRead, useAccount } from "@starknet-react/core";
import { StakeAbi } from '@/utils/stake';
import { CallData } from "starknet";

const RewardButton: React.FC = () => {
  const { contract } = useContract({
    abi: StakeAbi,
    address: "0x0594831cfd1bce409c8c1c9154052de49b69a51bbbace4283afd9a7a6de7f39d",
  });

  const { address } = useAccount();
  const [isEligible, setIsEligible] = useState<boolean | null>(true);
  const [depositAmount, setDepositAmount] = useState<bigint | null>(null);

  // const { data: eligibilityData } = useContractRead({
  //   functionName: "is_eligible",
  //   args: address ? [address] : undefined,
  //   watch: true,
  // });

  const { data: depositData } = useContractRead({
    functionName: "deposits",
    args: address ? [address] : undefined,
    watch: true,
  });

  // useEffect(() => {
  //   if (eligibilityData !== undefined) {
  //     setIsEligible(true);
  //   }
  //   if (depositData !== undefined) {
  //     setDepositAmount(BigInt(depositData.toString()));
  //   }
  // }, [eligibilityData, depositData]);

  const { writeAsync: claimAsync, isPending } = useContractWrite({
    calls: address
      ? [
          {
            contractAddress: contract?.address ?? "",
            entrypoint: "claim",
            calldata: CallData.compile({ user: address }),
          },
        ]
      : [],
  });

  const handleClaim = async () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!isEligible) {
      alert("You are not eligible to claim rewards at this time.");
      return;
    }

    try {
      const result = await claimAsync();
      console.log("Claim transaction submitted:", result);
      alert("Rewards claimed successfully! Your deposit has been reset.");
    } catch (error: any) {
      console.error("Error claiming rewards:", error);
      if (error.message.includes("User not eligible to claim")) {
        alert("You are not eligible to claim rewards at this time.");
      } else if (error.message.includes("User not registered")) {
        alert("You are not registered in the system. Please register first.");
      } else {
        alert("Failed to claim rewards. Please try again later.");
      }
    }
  };

  const claimAmount = depositAmount ? depositAmount * BigInt(3) / BigInt(2) : null;

  return (
    <div>
      <button
        onClick={handleClaim}
        disabled={isPending || !address || !isEligible}
        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Claiming...' : isEligible ? 'Claim Rewards' : 'Not Eligible'}
      </button>
      {depositAmount !== null && (
        <p>Your current deposit: {depositAmount.toString()}</p>
      )}
      {claimAmount !== null && (
        <p>Potential claim amount: {claimAmount.toString()}</p>
      )}
      {isEligible && (
        <p>Note: Claiming will reset your deposit and eligibility.</p>
      )}
    </div>
  );
};

export default RewardButton;