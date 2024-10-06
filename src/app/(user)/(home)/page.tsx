import Image from "next/image";
import Link from "next/link";
import {Montserrat} from "next/font/google";
import ModalHomeWithButton from "@/components/layout/home-modal";
import HomeSlider from "@/components/layout/slider";


const montesserat = Montserrat({
    weight: '400',
    subsets: ['cyrillic']
});
export default function Home() {
    
    return (
        <>
            <div className="flex flex-col ">
                <div className="min-h-[100vh] relative">
                    <Image
                        loading="lazy"
                        className="absolute top-0 h-full w-full object-cover"
                        style={{opacity: "0.1"}}
                        src={"/images/layout/image 9.svg"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div
                        className="pt-[16rem] sm:pt-72 md:pt-56  z-[999] relative relative flex md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 justify-center">
                        <div className="flex flex-col gap-4 w-full md:w-1/2 justify-center">
                            <p className="Voigante sm:text-start text-center text-5xl">
                                Treasure Hunt through Nashville Breweries
                            </p>
                            <p className={`${montesserat.className} text-sm font-extralight sm:text-start text-center`}>
                                That is the inspiration for my Treasure Hunts. I want to bring
                                joy to others while experiencing joy myself. I trust your
                                experience is everything you hoped it would be, and then some.
                            </p>
                            <Link href={`${process.env.NEXT_PUBLIC_BASEURL}/#packages`}
                                  className="relative h-[3rem] sm:self-start  flex justify-center items-center p-8 ">
                                <Image
                                    loading="lazy"
                                    className="w-full h-full absolute top-0 w-full h-full z-[-1]"
                                    src={"/images/button/Frame.svg"}
                                    alt="button Frame 1"
                                    width={50}
                                    height={50}
                                />
                                <p>Explore Packages</p>
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="sm:h-[28rem]  w-full">
                                <Image
                                    loading="lazy"
                                    className="w-full h-full"
                                    src={"/images/home/home-img1.svg"}
                                    alt="home img1"
                                    width={150}
                                    height={150}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <Image
                        loading="lazy"
                        className="absolute w-full object-cover h-full z-[0]"
                        style={{opacity: "0.1"}}
                        src={"/images/home/featured-package.png"}
                        alt="featured package"
                        width={400}
                        height={500}
                    />
                    <div className="pt-8">
                        <div className="flex items-center gap-4 ">
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                            <p style={{fontFamily: "VoiganteDisplay"}}>Packages</p>
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        </div>
                    </div>
                    <div className="z-[999]">
                        <p className="text-5xl Voigante text-center" id="packages">
                            Featured Packages
                        </p>
                        <p className="font-semibold Voigante sm:text-start text-center">
                            If purchasing a 3-Day Pass in Nashville please take a look at <a
                            href="https://www.musiccitybrewhop.com/" target="_blank" rel="noopener noreferrer"
                            className="text-blue-500">Music City Brew Hop</a>.
                            Their West Route stops by 4 of our participating breweries.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        <div
                            className="h-[25rem] Voigante relative min-w-[22rem] flex flex-col gap-4 items-center pt-16"
                        >
                            <Image loading="lazy" className="w-full object-contain h-full absolute z-[0]"
                                   src={'/images/home/featured-frame-box.png'} alt="frame box" width={300}
                                   height={300}/>
                            <div className="bg-[#1413135e] z-[1] min-w-[50%] p-4 mt-16">
                                <p className="w-full text-center text-xl">3 Day Pass</p>
                            </div>
                            <div className="flex z-[1] flex-col gap-4 ">
                                <div>
                                    <p className="text-center text-lg">$29 per person</p>
                                </div>
                                <div>
                                    <p className="text-center text-lg">72 hours of Hunts from the time</p>
                                </div>
                                <div>
                                    <p className="text-center text-lg"> of purchase</p>
                                </div>
                                <div>
                                    <p className="text-center text-lg">
                                        Unlimited Brewery Visits
                                    </p>
                                </div>
                                <div className="absolute top-[105%] sm:left-[15%] left-[30%]">
                                    <ModalHomeWithButton/>
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-[25rem] Voigante relative gap-4 min-w-[22rem] flex flex-col items-center pt-16"

                        >
                            <Image loading="lazy" className="w-full object-contain h-full absolute z-[0]"
                                   src={'/images/home/featured-frame-box.png'} alt="frame box" width={300}
                                   height={300}/>
                            <div className="bg-[#1413135e] z-[1] min-w-[50%] p-4 mt-16">
                                <p className="w-full text-center text-xl">
                                    Single Brewery Pass
                                </p>
                            </div>
                            <div className="flex flex-col z-[1] gap-4 ">
                                <div>
                                    <p className="text-center text-lg">$10 per person</p>
                                </div>
                                <div>
                                    <p className="text-center text-lg">Good for any brewery </p>
                                </div>
                                <div>
                                    <p className="text-center text-lg">on our list</p>
                                </div>
                            </div>
                            <div className="absolute top-[105%] sm:left-[15%] left-[30%]">
                                <ModalHomeWithButton/>
                            </div>
                        </div>
                        <div
                            className="h-[25rem] Voigante relative min-w-[22rem] gap-4 flex flex-col items-center pt-16"
                        >
                            <Image loading="lazy" className="w-full object-contain h-full absolute z-[0]"
                                   src={'/images/home/featured-frame-box.png'} alt="frame box" width={300}
                                   height={300}/>
                            <div className="bg-[#1413135e] z-[1] min-w-[50%] p-4 mt-16">
                                <p className="w-full text-center text-xl">
                                    Single Person Membership
                                </p>
                            </div>
                            <div className="flex flex-col z-[1] gap-4 ">
                                <div>
                                    <p className="text-center text-lg">$79 per year</p>
                                </div>
                                <div>
                                    <p className="text-center text-lg">Unlimited Hunts for</p>
                                </div>
                                <div>
                                    <p className="text-center text-lg">One Person</p>
                                </div>
                            </div>
                            <div className="absolute top-[105%] sm:left-[16.5%] left-[30%]">
                                <ModalHomeWithButton/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between flex-wrap gap-8 px-8 sm:px-28 mt-16">
                    <div className="w-full lg:w-[40%]  flex flex-col gap-4 items-center justify-center">
                        <div className="flex items-center gap-4 sm:self-start">
                            <div className="h-[0.5rem]  rounded-full w-[5rem] bg-orange-400"></div>
                            <p id="about" >About Us</p>
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        </div>
                        <div className="flex flex-col gap-4 sm:text-start text-center">
                            <p className="text-6xl Voigante ">
                                Riddle the City
                            </p>
                            <p className="text-sm">
                                I remember having treasure hunts as a child and how much fun it
                                was to figure out all of the clues. Some were simple, while
                                others took a bit to puzzle out. I can honestly say I don't
                                remember any prizes. The journey on the way was the real
                                adventure.
                            </p>
                            <p className="text-sm">
                                That is the inspiration for my Treasure Hunts. I want to bring
                                joy to others while experiencing joy myself. I trust your
                                experience is everything you hoped it would be, and then some. And don’t worry, our
                                treasures are all pretty cool.
                            </p>
                            <Link href={`${process.env.NEXT_PUBLIC_BASEURL}/#packages`}
                                  className="relative z-[1] h-[3rem] sm:self-start flex justify-center items-center mt-4 p-8">
                                <Image
                                    loading="lazy"
                                    className="w-full h-full absolute top-0 w-full h-full z-[-1]"
                                    src={"/images/button/Frame.svg"}
                                    alt="button Frame 1"
                                    width={50}
                                    height={50}
                                />
                                <p>Explore Packages</p>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full lg:w-[40%] ">
                        <div className="sm:h-[25rem]">
                            <Image
                                loading="lazy"
                                className="w-full  h-full"
                                src={"/images/home/aboutus.svg"}
                                alt="about us"
                                width={200}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col relative  mt-16">
                    <Image
                    loading="lazy"
                         className="w-full object-cover h-full absolute" style={{opacity: '0.1'}}
                        src={'/images/layout/clientBanner.svg'} alt="mystery" width={500} height={700}/>
                    <div className="flex flex-col relative z-[2] sm:pt-36 gap-8">
                        <div className="px-8 sm:px-28 flex items-center gap-4 self-start  justify-center sm:w-auto w-full">
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                            <p>Testimonials</p>
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        </div>
                        
                        <HomeSlider >
                            <div className=" h-auto max-h-[55rem] !w-[80%] sm:!w-[100%] relative">
                                <Image
                                    loading="lazy"
                                    className="w-full h-full absolute  top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div
                                    className="flex flex-col relative z-[1] w-full p-8     mb-[1.5rem] sm:mt-0 sm:px-[3rem] sm:py-[2rem]">
                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p className="Voigante">Customer</p>
                                        </div>
                                        <div className="w-[8.5rem] h-[4rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/stars.svg"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full text-sm">I remember having treasure hunts as a child and
                                        how much fun it was to figure out all of the clues. Some were simple, while
                                        others took a bit to puzzle out. I can honestly say I don't remember any
                                        prizes. The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                            <div className=" h-auto max-h-[55rem] !w-[80%] sm:!w-[100%] relative">
                                <Image
                                    loading="lazy"
                                    className="w-full h-full absolute top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div
                                    className="flex flex-col relative z-[1] w-full p-8     mb-[1.5rem] sm:mt-0 sm:px-[3rem] sm:py-[2rem]">
                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p className="Voigante">Customer</p>
                                        </div>
                                        <div className="w-[8.5rem] h-[4rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/stars.svg"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full text-sm">I remember having treasure hunts as a child and
                                        how much fun it was to figure out all of the clues. Some were simple, while
                                        others took a bit to puzzle out. I can honestly say I don't remember any
                                        prizes. The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                            <div className=" h-auto max-h-[55rem] !w-[80%] sm:!w-[100%] relative">
                                <Image
                                    loading="lazy"
                                    className="w-full h-full absolute top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div
                                    className="flex flex-col relative z-[1] w-full p-8     mb-[1.5rem] sm:mt-0 sm:px-[3rem] sm:py-[2rem]">
                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p className="Voigante">Customer</p>
                                        </div>
                                        <div className="w-[8.5rem] h-[4rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/stars.svg"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full text-sm">I remember having treasure hunts as a child and
                                        how much fun it was to figure out all of the clues. Some were simple, while
                                        others took a bit to puzzle out. I can honestly say I don't remember any
                                        prizes. The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                            <div className=" h-auto max-h-[55rem] !w-[80%] sm:!w-[100%] relative">
                                <Image
                                    loading="lazy"
                                    className="w-full h-full absolute top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div
                                    className="flex flex-col relative z-[1] w-full p-8     mb-[1.5rem] sm:mt-0 sm:px-[3rem] sm:py-[2rem]">
                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p className="Voigante">Customer</p>
                                        </div>
                                        <div className="w-[8.5rem] h-[4rem]">
                                            <Image
                                                loading="lazy"
                                                className="w-full h-full"
                                                src={"/images/layout/stars.svg"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full text-sm">I remember having treasure hunts as a child and
                                        how much fun it was to figure out all of the clues. Some were simple, while
                                        others took a bit to puzzle out. I can honestly say I don't remember any
                                        prizes. The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                        </HomeSlider>
                    </div>
                </div>
            </div>
           
        </>
    );
}
