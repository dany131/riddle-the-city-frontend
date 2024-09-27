"use client";

import {Vujahday_Script} from "next/font/google";
import Image from "next/image";
import {SiGooglemaps} from "react-icons/si";
import {IoTime} from "react-icons/io5";


const Vujahday = Vujahday_Script(
    {
        weight: "400",
        subsets: ['latin']
    }
);

import {Montserrat} from "next/font/google";


const montesserat = Montserrat({
    weight: '400',
    subsets: ['cyrillic']
});
const googleMapUrl: string = "https://www.google.com/maps/place";

export default function Listings() {
    return (
        <>
            <div className="flex flex-col Voigante">
                <div className="min-h-[70vh] relative">
                    <Image
                        priority
                        className="absolute top-0 h-full w-full object-cover"
                        style={{opacity: "1"}}
                        src={"/images/listings/image 15.png"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div
                        className="pt-[16rem] sm:pt-72 md:pt-56 z-[999] relative flex flex-col md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 ">
                        <p>Home <span className="mx-2">/</span> Listings</p>
                        <h1 className="text-[4rem]">Listings</h1>
                    </div>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="sm:w-[70%] flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className=" w-full max-h-[20rem] p-2 sm:w-[40%]">
                            <Image className="w-full h-full object-contain" src={'/images/listings/brewery_new_heights.png'} width={200}
                                   height={300} alt="store-1"/>
                        </div>
                        <div className="w-full px-4 sm:w-[60%] sm:px-16 py-8 gap-4 flex flex-col">
                            <h1 className="text-2xl">New Heights Brewing Company</h1>
                            <p className={`${montesserat.className}`}>They create ales that they are passionate about
                                and crave.</p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>928 Rep. John Lewis Way S,</p><p>Nashville, TN 37203</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div>
                                    <p>Monday–Wednesday: 2:00 PM – 9:00 PM </p>
                                    <p>Thursday: 2:00 PM – 10:00 PM</p>
                                    <p>Friday - Saturday: 12:00 PM – 10:00 PM</p>
                                    <p>Sunday: 12:00 PM – 7:00 PM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    onClick={() => window.open(`${googleMapUrl}/${encodeURIComponent("928 Rep. John Lewis Way S, Nashville, TN 37203")}`, '_blank')}>
                                    View Location
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="sm:w-[70%] flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className="w-full sm:w-[60%] px-4 sm:px-16 py-8 gap-4 flex flex-col ">
                            <h1 className="text-2xl">Fait La Force Brewing Company</h1>
                            <p className={`${montesserat.className}`}>Their aim is to create a space and experience that
                                is inclusive and appeals to all drinkers on the craft beer spectrum.</p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>1414 3rd Ave S St101,</p><p>Nashville, TN 37210</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div>
                                    <p>Monday Closed</p>
                                    <p>Tuesday - Wednesday: 4:00 PM – 9:00 PM</p>
                                    <p>Thursday - Saturday: 11:00 AM – 9:00 PM</p>
                                    <p>Sunday: 11:00 AM – 7:00 PM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    onClick={() => window.open(`${googleMapUrl}/${encodeURIComponent("1414 3rd Ave S, Nashville, TN 37210, USA")}`, '_blank')}>
                                    View Location
                                </button>
                            </div>
                        </div>
                        <div className="w-full max-h-[20rem] p-2 sm:w-[40%]">
                            <Image className="w-full h-full object-contain" src={'/images/listings/brewery_fait.png'} width={200}
                                   height={300} alt="store-1"/>
                        </div>
                    </div>
                    <div className="sm:w-[70%] flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className="w-full max-h-[20rem] p-2 sm:w-[40%]">
                            <Image className="w-full h-full object-contain" src={'/images/listings/brewery_fox.png'} width={200}
                                   height={300} alt="store-1"/>
                        </div>
                        <div className="w-full px-4 sm:w-[60%] sm:px-16 py-8 gap-4 flex flex-col ">
                            <h1 className="text-2xl">Marble Fox Brewing Company</h1>
                            <p className={`${montesserat.className}`}>They believe in elevating the taste and experience
                                of their beer through their
                                commitment to quality and craftsmanship.</p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>701 8th Ave S,</p><p>Nashville, TN 37203</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div>
                                    <p>Monday Closed</p>
                                    <p>Tuesday - Thursday: 2:00 PM – 10:00 PM</p>
                                    <p>Friday - Saturday: 12:00 PM – 11:00 PM</p>
                                    <p>Sunday: 12:00 PM – 8:00 PM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    onClick={() => window.open(`${googleMapUrl}/${encodeURIComponent("701 8th Ave S, Nashville, TN 37203")}`, '_blank')}>
                                    View Location
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="sm:w-[70%] flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className=" w-full max-h-[20rem] p-2 sm:w-[40%]">
                            <Image className="w-full h-full object-contain" src={'/images/listings/brewery_hiwire.png'} width={200}
                                   height={300} alt="store-1"/>
                        </div>
                        <div className="w-full px-4 sm:w-[60%] sm:px-16 py-8 gap-4 flex flex-col">
                            <h1 className="text-2xl">Hi-Wire Brewing Nashville</h1>
                            <p className={`${montesserat.className}`}>A community focused and fun-forward taproom.</p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>820 Division St, </p><p>Nashville, TN 37203</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div>
                                    <p>Monday – Tuesday: Closed </p>
                                    <p>Wednesday - Thursday: 2:00 PM – 9:00 PM</p>
                                    <p>Friday - Saturday: 11:00 AM – 11:00 PM</p>
                                    <p>Sunday: 11:00 AM – 9:00 PM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    onClick={() => window.open(`${googleMapUrl}/${encodeURIComponent("820 Division St, Nashville, TN 37203")}`, '_blank')}>
                                    View Location
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="sm:w-[70%] flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className="w-full sm:w-[60%] px-4 sm:px-16 py-8 gap-4 flex flex-col ">
                            <h1 className="text-2xl">Czann’s Brewing Company</h1>
                            <p className={`${montesserat.className}`}>Their Brew Master's goal is to bring high quality
                                traditional styles to market for their
                                customers to enjoy.</p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>4909 Indiana Ave, </p><p>Nashville, TN 37209</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div>
                                    <p>Monday - Tuesday: Closed</p>
                                    <p>Wednesday - Thursday: 4:00 PM – 9:00 PM</p>
                                    <p>Friday - Saturday: 12:00 PM – 10:00 PM</p>
                                    <p>Sunday: 1:00 PM – 8:00 PM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    onClick={() => window.open(`${googleMapUrl}/${encodeURIComponent("4909 Indiana Ave, Nashville, TN 37209")}`, '_blank')}>
                                    View Location
                                </button>
                            </div>
                        </div>
                        <div className="w-full max-h-[20rem] p-2 sm:w-[40%]">
                            <Image className="w-full h-full object-contain" src={'/images/listings/brewery_czanns.png'} width={200}
                                   height={300} alt="store-1"/>
                        </div>
                    </div>
                    <div className="sm:w-[70%] flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className="w-full max-h-[20rem] p-2 sm:w-[40%]">
                            <Image className="w-full h-full object-contain" src={'/images/listings/brewery_yazoo.png'} width={200}
                                   height={300} alt="store-1"/>
                        </div>
                        <div className="w-full px-4 sm:w-[60%] sm:px-16 py-8 gap-4 flex flex-col ">
                            <h1 className="text-2xl">Yazoo Brewing Company</h1>
                            <p className={`${montesserat.className}`}>Nashville’s first production brewery since
                                prohibition.</p>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>900 River Bluff Dr, </p><p>Madison, TN 37115</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div>
                                    <p>Sunday - Thursday: 11:00 AM – 09:00 PM</p>
                                    <p>Friday - Saturday: 11:00 AM – 10:00 PM</p>
                                </div>
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    onClick={() => window.open(`${googleMapUrl}/${encodeURIComponent("900 River Bluff Dr, Madison, TN 37115")}`, '_blank')}>
                                    View Location
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}