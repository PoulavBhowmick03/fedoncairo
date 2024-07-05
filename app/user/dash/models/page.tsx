"use client"
import Head from "@/app/user/components/Head";
import Sidebar from "@/app/user/components/Sidebar";
import Train from "@/app/user/components/Train";
import WalletNotConnected from "@/components/WalletNotConnected";
import { useAccount } from "@starknet-react/core";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TrainModel = () => {
  const { account, address, status } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (status === 'disconnected') {
      // Optional: Redirect to a login page or show a modal
      // router.push('/login');
    }
  }, [status, router]);

  if (status === 'connecting') {
    return <div>Connecting...</div>; // Or a loading spinner
  }

  if (status === 'disconnected') {
    return <div className="flex">
      <Sidebar />
      <WalletNotConnected />
    </div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Head />
        <Train />
        {/* Other content for the main section */}
      </div>
    </div>
  );
}

export default TrainModel;