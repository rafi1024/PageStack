import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloProvider from "./ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Catalogue",
  description: "A simple book catalogue application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#111] min-h-screen`}>
        {/* Navigation Bar */}
        <nav className="container mx-auto flex items-center justify-between py-4 px-6 mt-4 border border-gray-700 bg-[#18181b] shadow-lg">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-4xl font-bold text-white flex items-center space-x-2">📚 PageStack</Link>
          </div>
        </nav>
        <ApolloProvider>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
