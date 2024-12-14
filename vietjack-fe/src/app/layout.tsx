import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

import FetchAuth from "@/components/partials/FetchAuth";

import Header from "../components/partials/Header";

const robotoFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Vietjack | Hãng hàng không bỏ con",
  description: "Hãng hàng không bỏ con",
  icons: ["/img/vietjack-logo.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFont.className} `}>
        <div className="max-w-screen">
          <Header />
          {children}
          <Toaster position="top-right" />
          <FetchAuth />
        </div>
      </body>
    </html>
  );
}
