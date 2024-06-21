"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { QueryProvider } from "@/provider/query-provider";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import ModalProvider from "@/provider/modal-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useAuth()

  // if (!user) {
  //   router.push('/login-in')
  // }
  return (
    <div>
      <QueryProvider>
        <ModalProvider />
        <Sidebar />
        <Navbar />
        <Header />
        <div className="flex flex-col">
          <div className="flex-1">{children}</div>
          <div className="">
            <Footer />
          </div>
        </div>
      </QueryProvider>
    </div>
  );
}
