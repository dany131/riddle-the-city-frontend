import { Montserrat } from "next/font/google"
import Image from "next/image"
const montesserat = Montserrat({
    weight: "600",
    subsets: ['latin']

})
export default function Verify() {
    return (
        <>
            <div className="h-full w-full items-center  hidden sm:flex flex-col gap-4 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Verification</h1>
                <p className="text-center">We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity</p>
                <div className="flex flex-wrap gap-4">
                    <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-red-600 text-center font-semibold text-xl rounded-xl`}>4</div>
                    <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-red-600 text-center font-semibold text-xl rounded-xl`}>8</div>
                    <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-red-600 text-center font-semibold text-xl rounded-xl`}>3</div>
                    <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] min-h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}></div>
                    <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}></div>
                    <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}></div>
                </div>
                <Image className="mt-8" src={'/images/admin/Group 11431.png'} alt='spin' width={200} height={300} />
            </div>


            <div className="h-full w-full bg-[#160704] sm:hidden relative">
                <Image
                    priority
                    className="absolute top-0 h-full w-full"
                    style={{ opacity: "0.5" }}
                    src={"/images/home/home-banner.png"}
                    alt="home-banner"
                    width={1000}
                    height={500}
                />
                <div className="flex flex-col relative z-[1] h-[100vh] text-white gap-4 p-8 sm:p-24 items-center">
                    <h1 className="text-2xl font-bold">Verification</h1>
                    <p className="text-center">We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity</p>
                    <div className="flex flex-wrap gap-4">
                        <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-red-600 text-center font-semibold text-xl rounded-xl`}>4</div>
                        <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-red-600 text-center font-semibold text-xl rounded-xl`}>8</div>
                        <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-red-600 text-center font-semibold text-xl rounded-xl`}>3</div>
                        <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] min-h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}></div>
                        <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}></div>
                        <div className={`p-4 ${montesserat.className} min-w-[4rem] min-h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}></div>
                    </div>
                    <Image className="mt-8" src={'/images/admin/Group 11431.png'} alt='spin' width={200} height={300} />
                </div>
            </div>
        </>
    )
}