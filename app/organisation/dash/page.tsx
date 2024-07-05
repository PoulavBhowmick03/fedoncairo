"use client"
import Head from "@/app/organisation/components/Head";
import Sidebar from "@/app/organisation/components/Sidebar";
import { OrgDashBody } from "@/components/orgbody";
import RegisterOrgModal from "@/app/organisation/components/RegisterOrg"; // Import the modal component
import { useState } from 'react'; // Import useState

const OrgDash = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="dark:bg-gray-900">
            <div className="h-screen fixed">
                <Sidebar />
            </div>
            <div className="sm:px-8">
                <Head />
            </div>
            <div className="relative">
                <OrgDashBody />
                <RegisterOrgModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={(publicKey) => {
                        console.log("Registration successful:", publicKey);
                        handleCloseModal();
                    }}
                    onError={(error) => {
                        console.error("Registration error:", error);
                        handleCloseModal();
                    }}
                />
            </div>
        </div>
    );
}

export default OrgDash;