"use client"
import Head from "../../components/Head";
import Sidebar from "../../components/Sidebar";
import Train from "../../components/Train";
import WalletNotConnected from "../../../../components/WalletNotConnected";
import { useAccount } from "@starknet-react/core";

const TrainModel = () => {
  const { account, address, status } = useAccount();

  return (

    <div className="">
                <Sidebar />

      {account ? (
        <div>
          {/* Sidebar */}

          {/* Main Content */}
          <div className="flex-grow">
            {/* Head component */}
            <Head />
            <Train />
            {/* Other content for the main section */}
            {/* Add your content here */}
          </div>
        </div>

      ) : (
        <WalletNotConnected />
      )}
    </div>
  );
}

export default TrainModel;