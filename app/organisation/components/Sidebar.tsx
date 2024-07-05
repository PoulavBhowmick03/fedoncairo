'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaHome, FaHistory, FaMoneyBill, FaRobot, FaUser, FaBars } from "react-icons/fa";
import WalletBar from '@/components/wallet/connect';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isMenuOpen: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text, isMenuOpen }) => (
  <a
    href={href}
    className="flex items-center py-3 px-4 text-gray-400 hover:text-gray-200 transition-colors duration-200"
  >
    <span className="mr-3">{icon}</span>
    {isMenuOpen && <span className="font-medium">{text}</span>}
  </a>
);

const Sidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#1a1b26] h-screen fixed top-0 left-0 flex flex-col transition-all duration-300 ease-in-out" style={{ width: isMenuOpen ? '12rem' : '4rem' }}>
      <div className="p-4">
        <button
          className="text-gray-400 focus:outline-none"
          onClick={toggleMenu}
        >
          <FaBars className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-grow">
        <SidebarLink href="/" icon={<FaHome className="h-5 w-5" />} text="General" isMenuOpen={isMenuOpen} />
        <SidebarLink href="/organisation/dash/generate" icon={<FaHistory className="h-5 w-5" />} text="Generate" isMenuOpen={isMenuOpen} />
        <SidebarLink href="/organisation/dash/subscription" icon={<FaMoneyBill className="h-5 w-5" />} text="Premium" isMenuOpen={isMenuOpen} />
        <SidebarLink href="/organisation/dash/upload" icon={<FaRobot className="h-5 w-5" />} text="Upload" isMenuOpen={isMenuOpen} />
        <SidebarLink href="/organisation/dash" icon={<FaUser className="h-5 w-5" />} text="Account" isMenuOpen={isMenuOpen} />
      </nav>
      <div className="p-4">
        <WalletBar />
      </div>
    </div>
  );
};

export default Sidebar;
