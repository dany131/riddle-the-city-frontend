import { Vujahday_Script } from "next/font/google"
import Image from "next/image"
const Vujahday = Vujahday_Script(
    {
        weight: "400",
        subsets: ['latin']
    }
)
export default function Contact() {
    return (
        <>
            <div className="flex flex-col" style={{ fontFamily: "VoiganteDisplay" }}>
                <div className="min-h-[70vh] relative">
                    <Image
                        priority
                        className="absolute top-0 h-full w-full"
                        style={{ opacity: "1" }}
                        src={"/images/contact/image 14.png"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div className="pt-[23rem] sm:pt-72 md:pt-56 z-[9999999] relative flex flex-col md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 ">
                        <p>Home <span className="mx-2">/</span> Contact</p>
                        <h1 className="text-[4rem]">Contact</h1>
                    </div>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex flex-wrap w-full gap-4 justify-center">
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%] min-w-[100%]  items-center bg-[#2A1B15] p-8">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >beer products</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/world.svg'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <h1>ADDRESS</h1>
                            <div>
                                <p>8500, Lorem Street,</p>
                                <p>Chicago,IL, 55030</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%]  min-w-[100%]  items-center bg-[#2A1B15] p-8">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >phone</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/world.svg'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <h1>PHONE</h1>
                            <div>
                                <p>1 (200) 123-4567</p>
                                <p>1 (200) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%]  min-w-[100%] items-center bg-[#2A1B15] p-8">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >mail</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/world.svg'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <h1>MAIL</h1>
                            <div>
                                <p>info@yoursite.com,</p>
                                <p>hr@yoursite.com</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%]  min-w-[100%] items-center bg-[#2A1B15] p-8">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >hours</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/world.svg'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <h1>HOURS</h1>
                            <div className="flex flex-col items-center">
                                <p>Mon - Fri: 8 AM - 6 PM</p>
                                <p>Sat: 9 AM - 4 PM,</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        <p style={{ fontFamily: "VoiganteDisplay" }}>Contact Us</p>
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                    </div>
                    <h1 style={{ fontWeight: 400 }} className="text-[3rem]">Get in Touch</h1>
                    <div className="w-[70%] flex flex-wrap  gap-2">
                        <div className="flex w-full gap-4">
                            <input className="w-full p-2 bg-[#2A1B15] rounded" type="text" name="" id="" placeholder="Name"/>
                            <input className="w-full p-2 bg-[#2A1B15] rounded" type="text" name="" id="" placeholder="Email"/>
                        </div>
                        <input type="text" name="message" id="" className=" w-full h-[10rem] rounded bg-[#2A1B15]" placeholder="message" />
                        <div className="flex gap-4 items-center ">
                            <div className="p-[0.3rem] border-[#867460] max-h-[0.3rem] border-2"></div>
                            <p>I agree that my submitted data is being collected and stored.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}