import { Vujahday_Script } from "next/font/google"
import Image from "next/image"
import { SiGooglemaps } from "react-icons/si";
import { IoTime } from "react-icons/io5";
const Vujahday = Vujahday_Script(
    {
        weight: "400",
        subsets: ['latin']
    }
)

import { Montserrat } from "next/font/google";
const montesserat = Montserrat({
    weight: '400',
    subsets: ['cyrillic']
})
export default function Listings() {
    return (
        <>
            <div className="flex flex-col Voigante" >
                <div className="min-h-[70vh] relative">
                    <Image
                        priority
                        className="absolute top-0 h-full w-full"
                        style={{ opacity: "1" }}
                        src={"/images/listings/image 15.png"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div className="pt-[23rem] sm:pt-72 md:pt-56 z-[9999999] relative flex flex-col md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 ">
                        <p>Home <span className="mx-2">/</span> Listings</p>
                        <h1 className="text-[4rem]">Listings</h1>
                    </div>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className=" w-full sm:w-[40%]">
                            <Image className="w-full h-full" src={'/images/listings/store-1.png'} width={200} height={300} alt="store-1"/>
                        </div>
                        <div className="w-full px-4 sm:w-[60%] sm:px-16 py-8 gap-4 flex flex-col">
                            <h1 className="text-2xl">Brewery Store 1</h1>
                            <p className={`${montesserat.className}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>8500, Lorem Dummy Street,</p><p>Chicago,IL, 55030</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full " />
                                <div>
                                    <p>Monday – Thursday: 6:00 PM – 1:00 AM </p>
                                    <p>Friday: 6:00 PM – 2:00 AM</p>
                                    <p>Saturday & Sunday: 9:00 PM – 3:00 AM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'} className="w-full h-full object-contain absolute z-[4]" alt="link" width={100} height={100} />
                                <button  className="relative h-max w-max flex justify-center items-center  sm:px-8 z-[8] p-4 box-border">
                                    View Location
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className="w-full sm:w-[60%] px-4 sm:px-16 py-8 gap-4 flex flex-col ">
                            <h1 className="text-2xl">Brewery Store 2</h1>
                            <p className={`${montesserat.className}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full " />
                                <div><p>8500, Lorem Dummy Street,</p><p>Chicago,IL, 55030</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}` }>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full " />
                                <div>
                                    <p>Monday – Thursday: 6:00 PM – 1:00 AM </p>
                                    <p>Friday: 6:00 PM – 2:00 AM</p>
                                    <p>Saturday & Sunday: 9:00 PM – 3:00 AM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'} className="w-full h-full object-contain absolute z-[4]" alt="link" width={100} height={100} />
                                <button className="relative h-max w-max flex justify-center items-center  sm:px-8 z-[8] p-4 box-border">
                                    View Location
                                </button>
                            </div>
                        </div>
                        <div className="w-full sm:w-[40%]">
                            <Image className="w-full h-full" src={'/images/listings/store-2.png'} width={200} height={300} alt="store-1" />
                        </div>
                    </div>
                    <div className="flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className="w-full sm:w-[40%]">
                            <Image className="w-full h-full" src={'/images/listings/store-3.png'} width={200} height={300} alt="store-1" />
                        </div>
                        <div className="w-full px-4 sm:w-[60%] sm:px-16 py-8 gap-4 flex flex-col ">
                            <h1 className="text-2xl">Brewery Store 3</h1>
                            <p className={`${montesserat.className}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full " />
                                <div><p>8500, Lorem Dummy Street,</p><p>Chicago,IL, 55030</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full " />
                                <div>
                                    <p>Monday – Thursday: 6:00 PM – 1:00 AM </p>
                                    <p>Friday: 6:00 PM – 2:00 AM</p>
                                    <p>Saturday & Sunday: 9:00 PM – 3:00 AM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'} className="w-full h-full object-contain absolute z-[4]" alt="link" width={100} height={100} />
                                <button className="relative h-max w-max flex justify-center items-center  sm:px-8 z-[8] p-4 box-border">
                                    View Location
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}