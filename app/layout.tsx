import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components";
import { ToastProvider } from "@/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Favorite Pokemons Picker",
  description: "See all the pokemons ahd choose your favorites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider />
        <div className="bg-slate-100 h-screen flex antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
          <Sidebar />
          <div className="flex-1 p-4 xl:ml-72 overflow-y-auto text-slate-900">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
