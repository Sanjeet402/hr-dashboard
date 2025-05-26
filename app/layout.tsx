import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HR Dashboard",
  description: "Track employee performance and insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <AuthProvider>
          {/* Global Header */}
          <header className="bg-white dark:bg-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold">💼 HR Dashboard</h1>
            <nav className="flex gap-6">
              <Link href="/" className="hover:underline text-blue-600">
                Home
              </Link>
              <Link href="/bookmarks" className="hover:underline text-blue-600">
                Bookmarks
              </Link>
              <Link href="/analytics" className="hover:underline text-blue-600">
                Analytics
              </Link>
            </nav>
          </header>

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
