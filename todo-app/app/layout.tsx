import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Todo App",
  description: "A sleek, functional todo app with a professional look.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#001f3f] text-white min-h-screen`}>
        {/* Navy Blue background with white text */}
        <div className="flex flex-col items-center justify-start pt-10 px-4">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Todo App</h1>
            <p className="text-gray-300 mt-2">Manage your tasks like a pro.</p>
          </header>
          <main className="w-full max-w-5xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}