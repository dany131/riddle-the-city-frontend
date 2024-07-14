import { Vujahday_Script } from "next/font/google"
import Image from "next/image"
const Vujahday = Vujahday_Script(
    {
        weight: "400",
        subsets:['latin']
    }
)
export default function AboutUs() {
    return (
        <>
            <div className="flex flex-col" style={{ fontFamily: "VoiganteDisplay" }}>
                <div className="min-h-[70vh] relative">
                    <Image
                        priority
                        className="absolute top-0 h-full w-full"
                        style={{ opacity: "1" }}
                        src={"/images/aboutus/about-us-banner.png"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div className="pt-[23rem] sm:pt-72 md:pt-56 z-[9999999] relative flex flex-col md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 ">
                        <p>Home <span className="mx-2">/</span> About Us</p>
                        <h1  className="text-[4rem]">About Us</h1>
                    </div>
                </div>
                <div className="flex justify-between flex-wrap gap-4 px-8 sm:px-28 mt-16">
                    <div className="w-full lg:w-[40%] ">
                        <div className="h-[25rem]">
                            <Image
                                priority
                                className="w-full h-full"
                                src={"/images/home/aboutus.svg"}
                                alt="about us"
                                width={200}
                                height={300}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-[40%]  flex flex-col gap-4 items-center justify-center">
                        <div className="flex items-center gap-4 self-start">
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                            <p>About Us</p>
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-6xl" style={{ fontFamily: "VoiganteDisplay" }}>
                                Riddle the City
                            </p>
                            <p className="text-sm">
                                I remember having treasure hunts as a child and how much fun it
                                was to figure out all of the clues.  Some were simple, while
                                others took a bit to puzzle out.  I can honestly say I don't
                                remember any prizes.  The journey on the way was the real
                                adventure.
                            </p>
                            <p className="text-sm">
                                That is the inspiration for my Treasure Hunts.  I want to bring
                                joy to others while experiencing joy myself.  I trust your
                                experience is everything you hoped it would be, and then some.
                            </p>
                            <button className="relative h-[3rem] self-start flex justify-center items-center mt-4 p-8">
                                <Image
                                    priority
                                    className="w-full h-full absolute top-0 w-full h-full z-[-1]"
                                    src={"/images/button/Frame.svg"}
                                    alt="button Frame 1"
                                    width={50}
                                    height={50}
                                />
                                <p>Explore Packages</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between flex-wrap gap-4 px-8 sm:px-28 mt-16">
                    <p>I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                    <p>That is the inspiration for my Treasure Hunts.  I want to bring joy to others while experiencing joy myself.  I trust your experience is everything you hoped it would be, and then some.</p>
                    <p>I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure. That is the inspiration for my Treasure Hunts.  I want to bring joy to others while experiencing joy myself.  I trust your experience is everything you hoped it would be, and then some.</p>
                    <p>I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure. That is the inspiration for my Treasure Hunts.  I want to bring joy to others while experiencing joy myself.  I trust your experience is everything you hoped it would be, and then some.</p>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        <p style={{ fontFamily: "VoiganteDisplay" }}>Our Stats</p>
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                    </div>
                    <h1 style={{ fontWeight: 400 }} className="text-[3rem]">Achievements</h1>
                    <div className="flex flex-wrap justify-center gap-24">
                        <div className="flex flex-col gap-[1.4rem]">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >beer products</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/world.svg'} width={80} height={80} alt="strawberry icon"/>
                            </div>
                            <p className="text-center">47</p>
                        </div>
                        <div className="flex flex-col gap-[1.4rem]">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >happy clients</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/mic.svg'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <p className="text-center">80</p>
                        </div>
                        <div className="flex flex-col gap-[1.4rem]">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >music gigs</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/coffee.svg'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <p className="text-center">67</p>
                        </div>
                        <div className="flex flex-col gap-[1.4rem]">
                            <div className="relative">
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >sports events</p>
                                <Image className="absolute top-0 left-[40%] h-[3rem] w-[3rem]" src={'/images/aboutus/strawberry.svg'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <p className="text-center">46</p>
                        </div>
                        
                    </div>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        <p style={{ fontFamily: "VoiganteDisplay" }}>Meet Our Team</p>
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                    </div>
                    <h1 style={{ fontWeight: 400 }} className="text-[3rem]">Our Team</h1>
                    <div className="flex gap-8 justify-center flex-wrap">
                        <div className="flex flex-col gap-[1.4rem]">
                            <div className="relative h-[15rem] w-[18rem]">
                                <Image className=" h-full w-full" src={'/images/aboutus/team1.png'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <div className="flex flex-col items-center bg-[#E2CEAB1A] p-4 border-2 border-[#E2CEAB80] rounded-lg">
                                <p>William Webster</p>
                                <p>Receptionist</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[1.4rem]">
                            <div className="relative h-[15rem] w-[18rem]">
                                <Image className=" h-full w-full" src={'/images/aboutus/team2.png'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <div className="flex flex-col items-center bg-[#E2CEAB1A] p-4 border-2 border-[#E2CEAB80] rounded-lg">
                                <p>Walter Dean</p>
                                <p>Manager</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[1.4rem]">
                            <div className="relative h-[15rem] w-[18rem]">
                                <Image className=" h-full w-full" src={'/images/aboutus/team3.png'} width={80} height={80} alt="strawberry icon" />
                            </div>
                            <div className="flex flex-col items-center bg-[#E2CEAB1A] p-4 border-2 border-[#E2CEAB80] rounded-lg">
                                <p>Harry Gaines</p>
                                <p>Receptionist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}