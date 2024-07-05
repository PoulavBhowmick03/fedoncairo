"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useAccount } from "@starknet-react/core";

import Sidebar from "@/app/organisation/components/Sidebar";
import { cn } from "@/utils/cn";
import Head from "@/app/user/components/Head";
import WalletNotConnected from "@/components/WalletNotConnected";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

const plans = [
    {
        title: "Basic",
        price: "Free",
        current: true,
        description: "Access to basic features with limited functionality."
    },
    {
        title: "Premium",
        price: "$20",
        current: false,
        description: "Unlock premium features and enhanced support."
    },
    {
        title: "Pro",
        price: "$50",
        current: false,
        description: "Full access to all features with priority support and customization options."
    },
];

const Subscription: NextPage = () => {
    const [activePlan, setActivePlan] = useState<string>("Basic");
    const { account, address, status } = useAccount();

    return (
            <div className="h-screen">
                <Sidebar />
                {account ? (
                    <div>
                        <Head />
                        <div className="min-h-auto bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center sm:py-52 px-24">
                            <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
                                Choose Your Plan
                            </h1>
                            <div className="flex space-x-12 sm:px-48">
                                {plans.map((plan) => (
                                    <motion.div
                                        key={plan.title}
                                        onMouseEnter={() => setActivePlan(plan.title)}
                                        className={cn(
                                            "relative p-8 rounded-2xl shadow-xl cursor-pointer transition-all duration-300",
                                            plan.current
                                                ? "border-4 border-purple-500"
                                                : "border border-transparent",
                                            activePlan === plan.title && "glow-purple"
                                        )}
                                        initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={transition}
                                    >
                                        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
                                            {plan.title}
                                        </h2>
                                        <p className="text-xl text-gray-700 dark:text-gray-300">
                                            {plan.price}
                                        </p>
                                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                                            {plan.description}
                                        </p>
                                        {plan.current && (
                                            <p className="mt-2 text-sm text-green-500">Current Plan</p>
                                        )}
                                        <button
                                            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                        >
                                            Upgrade
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div></div>
                ) : (
                    <WalletNotConnected />
                )
                }

            </div>
    );
};

export default Subscription;
