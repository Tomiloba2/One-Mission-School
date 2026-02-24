import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/tanstack-query/providers";
import { QueryErrorBoundary } from "@/lib/tanstack-query/errorBoundary";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Mission School",
  description: "One mission school nursery, primary and secondary website and Learning Management System",
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
        <Providers>
          <QueryErrorBoundary>
            {children}
            <Toaster position="top-right" richColors closeButton/>
          </QueryErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
