import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { getUser } from '@/auth/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes",
  description: "A simple notes application with tags and archiving",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased`}
      >
        <div className="flex h-screen bg-white">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
