"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { sha256 } from "js-sha256";
import {
  useAccount,
  useNetwork,
  useContractWrite,
  useContract,
} from "@starknet-react/core";
import { StakeAbi } from "@/utils/stake";
import RewardButton from "@/app/user/components/ClaimButton";
const CID = "Qma3k61CcvxEZAL8ENVQmMfihnPeEbh7K35fzfaKM45tko";

// Dynamically import the SendSolButton component
const SendSolButton = dynamic(
  () => import("@/components/wallet/connect").then((mod) => mod.SendSolButton),
  { ssr: false }
);

const DownloadPage = () => {
  const [downloaded, setDownloaded] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const { chain } = useNetwork();
  const { account, address, status } = useAccount();

  const { contract } = useContract({
    abi: StakeAbi,
    address:
      "0x0594831cfd1bce409c8c1c9154052de49b69a51bbbace4283afd9a7a6de7f39d",
  });
  
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${CID}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "client.py");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloaded(true);
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  const openRewardsModal = async () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const response = await axios.get("/api/receive-list");
      const storedValue = response.data.value;

      const walletAddressHash = sha256(address);

      if (storedValue === walletAddressHash) {
        setIsEligible(true);
      } else {
        alert("You are not eligible for rewards at this time.");
      }
    } catch (error) {
      console.error("Error checking eligibility:", error);
      alert("Error checking eligibility. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-48 lg:px-28 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Download client.py</h1>
        <p className="text-lg mb-10">
          Download the client side of the program to train with your own data
          and automatically update the parameters
          <br />
          earning your incentive on the way
        </p>
        <button
          onClick={handleDownload}
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 mr-10"
        >
          Download
        </button>
        <RewardButton
          disabled={!downloaded}
          onClick={openRewardsModal}
          className={`bg-purple-500 text-white py-2 px-4 rounded mr-10 ${
            !downloaded
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-700"
          }`}
        />
      </div>
    </div>
  );
};

export default DownloadPage;