import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="bg-[#160704] text-white overflow-x-hidden">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    )
}