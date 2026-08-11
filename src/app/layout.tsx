import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptBase | AI Prompt Marketplace",
  description: "Discover, share, and monetize high-quality AI prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </body>
    </html>
  );
}

