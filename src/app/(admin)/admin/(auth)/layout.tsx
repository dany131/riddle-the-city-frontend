import { Montserrat } from "next/font/google"
import Image from "next/image"
const montesserat = Montserrat({
    weight: "100",
    subsets:['latin']
    
})
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`min-h-[100vh] flex sm:flex-row flex-col `}>
                <div className="h-[20rem] sm:h-auto flex items-center w-full sm:w-[50%]">
                    <Image className="w-full h-full object-cover" src={'/images/admin/auth/left-image.png'} alt="auth" width={400} height={1000} />
                </div>
                <div className="h-full w-full sm:w-[50%]">
                {children}

                </div>
            </div>
        </>
    )
}