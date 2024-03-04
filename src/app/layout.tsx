import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";
import MainLayout from "@/components/MainLayout/MainLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AntdRegistry>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
