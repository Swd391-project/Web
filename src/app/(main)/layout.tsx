"use client"

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { QueryProvider } from "@/provider/query-provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <QueryProvider>
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
