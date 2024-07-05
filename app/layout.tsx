import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "@/components/StarknetProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FedChain",
  description: "Onchain federated learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StarknetProvider>
          <body className={inter.className}>{children}</body>
    </StarknetProvider>
    </html>
  );
}
