'use client';
import Image from "next/image";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import {useRef} from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import {Montserrat} from "next/font/google";
import {useRouter} from "next/navigation";


const montesserat = Montserrat({
    weight: '400',
    subsets: ['cyrillic']
});
export default function Home() {
    const router = useRouter(); // Initialize the router
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1} = useDisclosure();
    const sliderRef = useRef(null);

    const handleLoginClick = () => {
        router.push('/auth/login'); // Navigate to the login page
    };
    const nextSlide = () => {
        const sliderr: any = sliderRef.current!;
        sliderr.slickNext();
    };

    const prevSlide = () => {
        const sliderr: any = sliderRef.current!;
        sliderr.slickPrev();
    };
    return (
        <>
            <div className="flex flex-col ">
                <div className="min-h-[100vh] relative">
                    <Image
                        priority
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
                            <p className="Voigante text-5xl">
                                Treasure Hunt through Nashville Breweries
                            </p>
                            <p className={`${montesserat.className} text-sm font-extralight`}>
                                That is the inspiration for my Treasure Hunts. I want to bring
                                joy to others while experiencing joy myself. I trust your
                                experience is everything you hoped it would be, and then some.
                            </p>
                            <Link href={`${process.env.NEXT_PUBLIC_BASEURL}/#packages`}
                                  className="relative h-[3rem] self-start flex justify-center items-center p-8">
                                <Image
                                    priority
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
                            <div className="h-[28rem] w-full">
                                <Image
                                    priority
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
                        priority
                        className="absolute w-full h-full z-[0]"
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
                        <p className="font-semibold Voigante">
                            If purchasing a 3-Day Pass in Nashville please take a look at <a
                            href="https://www.musiccitybrewhop.com/" target="_blank" rel="noopener noreferrer"
                            className="text-blue-500">Music City Brew Hop</a>.
                            Their West Route stops by 4 of our participating breweries.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        <div
                            className="h-[25rem] Voigante relative min-w-[22rem] flex flex-col items-center pt-16"
                        >
                            <Image className="w-full object-contain h-full absolute z-[0]"
                                   src={'/images/home/featured-frame-box.png'} alt="frame box" width={300}
                                   height={300}/>
                            <div className="bg-[#1413135e] z-[1] min-w-[50%] p-4 mt-16">
                                <p className="w-full text-center text-xl">3 Day Pass</p>
                            </div>
                            <div className="flex z-[1] flex-col gap-4 mt-16">
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
                                    <button onClick={() => {
                                        onOpen1();
                                    }}
                                            className="relative h-[3rem]  flex justify-center items-center px-8 py-4 sm:px-20 sm:py-2 box-border">
                                        <Image
                                            priority
                                            className="w-full h-full absolute top-0 w-full h-full z-[-1] sm:object-contain object-cover"
                                            src={"/images/button/Frame.svg"}
                                            alt="button Frame 1"
                                            width={50}
                                            height={50}
                                        />
                                        <p className="w-max">Book Now</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-[25rem] Voigante relative min-w-[22rem] flex flex-col items-center pt-16"

                        >
                            <Image className="w-full object-contain h-full absolute z-[0]"
                                   src={'/images/home/featured-frame-box.png'} alt="frame box" width={300}
                                   height={300}/>
                            <div className="bg-[#1413135e] z-[1] min-w-[50%] p-4 mt-16">
                                <p className="w-full text-center text-xl">
                                    Single Brewery Pass
                                </p>
                            </div>
                            <div className="flex flex-col z-[1] gap-4 mt-16">
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
                                <button onClick={() => {
                                    onOpen1();
                                }}
                                        className="relative h-[3rem]  flex justify-center items-center px-8 py-4 sm:px-20 sm:py-2 box-border">
                                    <Image
                                        priority
                                        className="w-full h-full absolute top-0 w-full h-full z-[1] sm:object-contain object-cover"
                                        src={"/images/button/Frame.svg"}
                                        alt="button Frame 1"
                                        width={50}
                                        height={50}
                                    />
                                    <p className="w-max relative z-[2]">Book Now</p>
                                </button>
                            </div>
                        </div>
                        <div
                            className="h-[25rem] Voigante relative min-w-[22rem] flex flex-col items-center pt-16"
                        >
                            <Image className="w-full object-contain h-full absolute z-[0]"
                                   src={'/images/home/featured-frame-box.png'} alt="frame box" width={300}
                                   height={300}/>
                            <div className="bg-[#1413135e] z-[1] min-w-[50%] p-4 mt-16">
                                <p className="w-full text-center text-xl">
                                    Single Person Membership
                                </p>
                            </div>
                            <div className="flex flex-col z-[1] gap-4 mt-16">
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
                                <button onClick={() => {
                                    onOpen1();
                                }}
                                        className="relative h-[3rem]  flex justify-center items-center px-8 py-4 sm:px-20 sm:py-2 box-border">
                                    <Image
                                        priority
                                        className="w-full h-full absolute top-0 w-full h-full z-[1] sm:object-contain object-cover"
                                        src={"/images/button/Frame.svg"}
                                        alt="button Frame 1"
                                        width={50}
                                        height={50}
                                    />
                                    <p className="w-max relative z-[2]">Book Now</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between flex-wrap gap-4 px-8 sm:px-28 mt-16">
                    <div className="w-full lg:w-[40%]  flex flex-col gap-4 items-center justify-center">
                        <div className="flex items-center gap-4 self-start">
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                            <p id="about">About Us</p>
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-6xl Voigante">
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
                                  className="relative z-[1] h-[3rem] self-start flex justify-center items-center mt-4 p-8">
                                <Image
                                    priority
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
                        <div className="h-[25rem]">
                            <Image
                                priority
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
                        priority className="w-full h-full absolute" style={{opacity: '0.1'}}
                        src={'/images/layout/clientBanner.svg'} alt="mystery" width={500} height={700}/>
                    <div className="flex flex-col relative z-[2] sm:pt-36 gap-8">
                        <div className="px-8 sm:px-28 flex items-center gap-4 self-start">
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                            <p>Testimonials</p>
                            <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        </div>
                        <div className="px-8 sm:px-28 flex gap-8 justify-between">
                            <h1 className={`text-4xl Voigante`}>What Clients Say About Us</h1>
                            <div className="flex gap-4">
                                <button onClick={prevSlide} className="min-h-[3rem] w-[3rem]">
                                    <Image
                                        priority className="w-full h-full" src={'/images/layout/forwardButton.svg'}
                                        alt="back button" width={100} height={100}/>
                                </button>
                                <button onClick={nextSlide} className="min-h-[3rem] w-[3rem]">
                                    <Image
                                        priority className="w-full h-full" src={'/images/layout/backButton.svg'}
                                        alt="back button" width={100} height={100}/>
                                </button>
                            </div>
                        </div>
                        <div className="slider-container">
                            <Slider className="px-4 " ref={sliderRef} {...settings}>
                                <div className=" h-auto max-h-[55rem] relative">
                                    <Image
                                        priority
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
                                                    priority
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
                                                    priority
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
                                <div className=" h-auto max-h-[55rem] relative">
                                    <Image
                                        priority
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
                                                    priority
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
                                                    priority
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
                                <div className=" h-auto max-h-[55rem] relative">
                                    <Image
                                        priority
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
                                                    priority
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
                                                    priority
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
                                <div className=" h-auto max-h-[55rem] relative">
                                    <Image
                                        priority
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
                                                    priority
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
                                                    priority
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
                            </Slider>
                        </div>
                        {/* <Slider ref={sliderRef} {...settings}>
                            <div>
                                <h3>1</h3>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                            <div>
                                <h3>3</h3>
                            </div>
                            <div>
                                <h3>4</h3>
                            </div>
                            <div>
                                <h3>5</h3>
                            </div>
                            <div>
                                <h3>6</h3>
                            </div>
                            <div>
                                <h3>7</h3>
                            </div>
                            <div>
                                <h3>8</h3>
                            </div>
                        </Slider> */}
                        {/* <div className="flex  overflow-x-hidden gap-16 ">
                            <div className="w-[81%] min-h-[20rem] max-h-[55rem] relative" >
                                <Image
                                    priority
                                    className="w-full h-full absolute top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div className="flex flex-col relative z-[1] w-full p-8 mt-[0.5rem] mb-[1.5rem] sm:mt-0 sm:p-16">
                                    <div className="flex  justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p>Customer</p>
                                        </div>
                                        <div className="w-[9rem] h-[4rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/stars.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                            <div className="w-[81%] min-h-[20rem] max-h-[55rem] relative" >
                                <Image
                                    priority
                                    className="w-full h-full absolute top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div className="flex relative z-[1] flex-col w-full p-8 mt-[0.5rem] mb-[1.5rem] sm:mt-0 sm:p-16">
                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p>Customer</p>
                                        </div>
                                        <div className="w-[9rem] h-[4rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/stars.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                            <div className="w-[81%] min-h-[20rem] max-h-[55rem] relative" >
                                <Image
                                    priority
                                    className="w-full h-full absolute top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div className="flex relative z-[1] flex-col w-full p-8 mt-[0.5rem] mb-[1.5rem] sm:mt-0 sm:p-16">
                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p>Customer</p>
                                        </div>
                                        <div className="w-[9rem] h-[4rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/stars.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                            <div className="w-[81%] min-h-[20rem] max-h-[55rem] relative" >
                                <Image
                                    priority
                                    className="w-full h-full absolute top-0 z-[0]"
                                    src={"/images/layout/testimonialBox.png"}
                                    alt="about us"
                                    width={200}
                                    height={300}
                                />
                                <div className="flex relative z-[1] flex-col w-full p-8 mt-[0.5rem] mb-[1.5rem] sm:mt-0 sm:p-16">
                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <div className="w-[5rem] h-[3rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/person.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p>Sarah Thompson</p>
                                            <p>Customer</p>
                                        </div>
                                        <div className="w-[9rem] h-[4rem]">
                                            <Image
                                                priority
                                                className="w-full h-full"
                                                src={"/images/layout/stars.png"}
                                                alt="client"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Register Yourself!</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Please register yourself before booking.</p>
                                <button onClick={handleLoginClick}
                                        className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay
                                </button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
