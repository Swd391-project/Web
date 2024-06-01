import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex h-screen w-full font-inter">
            <Sidebar />
            <Navbar />
            <Header />
            <div className="flex flex-col">
                <div className="flex-1">{children}</div>
                <div className="">
                    <Footer />
                </div>
            </div>
        </main>
    );
}
