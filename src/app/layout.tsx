import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "./providers/QueryProvider";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-multi-carousel/lib/styles.css";
import ComingSoon from "@/components/ComingSoon";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Riddle The City",
  description: "Riddle The City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const show=cookies().get('comingSoon')?.value
  // console.log('show',show)
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* {!show && <ComingSoon/>}
        {show && <QueryProvider>
          {children}
          <ToastContainer/>
        </QueryProvider>} */}
        <QueryProvider>
          {children}
          <ToastContainer/>
        </QueryProvider>
      </body>
    </html>
  );
}
