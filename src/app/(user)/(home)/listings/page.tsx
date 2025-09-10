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
import { useInfiniteQuery, useQuery } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { Button } from "@nextui-org/react";


const montesserat = Montserrat({
    weight: '400',
    subsets: ['cyrillic']
});
const googleMapUrl: string = "https://www.google.com/maps/place";

export default function Listings() {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ['allBrwery'],
        queryFn:({pageParam=1})=>axiosInstance.get(`/brewery/all?page=${pageParam}&limit=5`),
        getNextPageParam: (lastPage:any, pages) => lastPage.data.page!=lastPage.data.lastPage?lastPage.data.page+1:null,
      })
    return (
        <>
            <div className="flex flex-col Voigante">
                <div className="min-h-[70vh] relative">
                    <Image
                        
                        className="absolute top-0 h-full w-full object-cover"
                        style={{opacity: "1"}}
                        src={"/images/layout/image 15.svg"}
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
                    {data?.pages.map((e)=>
                    e.data.data.map((j:any)=><>
                    <div className="sm:w-[70%] flex flex-wrap border-1 border-[#E2CEAB] sm:flex-nowrap bg-[#2A1B15] rounded-lg">
                        <div className=" w-full max-h-[20rem] p-2 sm:w-[40%]">
                            <Image className="w-full h-full object-contain" src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${j.media}`} width={200}
                                   height={300} alt="store-1"/>
                        </div>
                        <div className="w-full px-4 sm:w-[60%] sm:px-16 py-8 gap-4 flex flex-col">
                            <h1 className="text-2xl">{j.name}</h1>
                            {/* <p className={`${montesserat.className}`}>They create ales that they are passionate about
                                and crave.</p> */}
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <SiGooglemaps className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div><p>{j.address.text}</p></div>
                            </div>
                            <div className={`flex items-center gap-8 ${montesserat.className}`}>
                                <IoTime className="text-4xl text-black bg-white p-2 rounded-full "/>
                                <div className="flex flex-col gap-2">

                                {j.schedule.map((p:any)=>
                                <>
                                <div className="flex gap-2 flex-wrap">
                                <p className="font-semibold">{p.day}</p>
                                     <p className="font-semibold">
                                         {`${parseInt(p.time.start.split(':')[0]) % 12 || 12}:${p.time.start.split(':')[1]}${parseInt(p.time.start.split(':')[0]) < 12 ? "AM" : "PM"} - 
                           ${parseInt(p.time.end.split(':')[0]) % 12 || 12}:${p.time.end.split(':')[1]}${parseInt(p.time.end.split(':')[0]) < 12 ? "AM" : "PM"}`}
                                     </p>
                                </div>
                                </>
                                     
                                 
                                )}
                                </div>
                            
                            </div>
                            <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    onClick={() => window.open(`${googleMapUrl}/${encodeURIComponent(j.address.text)}`, '_blank')}>
                                    View Location
                                </button>
                            </div>
                        </div>

                    </div>
                    </>)
                    )}

{hasNextPage &&  <div className="w-max h-max relative">
                                <Image src={'/images/layout/Group 10.svg'}
                                       className="w-full h-full object-contain absolute z-[4]" alt="link" width={100}
                                       height={100}/>
                                <button
                                onClick={()=>fetchNextPage()}
                                    className="relative h-max w-max flex justify-center items-center sm:px-8 z-[8] p-4 box-border"
                                    >
                                    Load More
                                </button>
                            </div>}

                    
                </div>
            </div>
        </>
    );
}