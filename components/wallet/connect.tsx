"use client";
import { Connector, useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo, useEffect } from "react";
import { Button } from "@/components/ui/Button";

function WalletConnected() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    
    const shortenedAddress = useMemo(() => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }, [address]);

    return (
        <div className="flex flex-wrap">
            <button
                className="bg-purple-300 border border-black hover:bg-purple-500 text-black font-regular py-2 px-4"
                onClick={() => {
                    disconnect();
                    localStorage.removeItem('walletConnected');
                }}
            >
                {shortenedAddress}
            </button>
        </div>
    );
}

function ConnectWallet() {
    const { connectors, connect } = useConnect();

    const handleConnect = async (connector: Connector) => {
        await connect({ connector });
        localStorage.setItem('walletConnected', connector.id);
    };

    return (
        <div>
            {connectors.map((connector) => {
                return (
                    <Button
                        key={connector.id}
                        onClick={() => handleConnect(connector)}
                        className="gap-x-2 mr-2"
                    >
                        Connect
                    </Button>
                );
            })}
        </div>
    );
}

export default function WalletBar() {
    const { address } = useAccount();
    const { connect, connectors } = useConnect();

    useEffect(() => {
        const reconnect = async () => {
            const connectedWallet = localStorage.getItem('walletConnected');
            if (connectedWallet && !address) {
                const connector = connectors.find(c => c.id === connectedWallet);
                if (connector) {
                    await connect({ connector });
                }
            }
        };
        reconnect();
    }, [address, connect, connectors]);

    return address ? <WalletConnected /> : <ConnectWallet />;
}