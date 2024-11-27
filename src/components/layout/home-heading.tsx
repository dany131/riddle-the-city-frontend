// 'use client'

import axiosInstance from "@/app/utils/axiosInstance";
import axios from "axios";
import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query";

const montesserat = Montserrat({
    weight: '400',
    subsets: ['cyrillic']
});

export default async function HomeHeading() {
    const getContentQuery = await fetch(`${process.env.NEXT_PUBLIC_API}/cms?page=1`, { cache: 'no-cache' })
    const data = await getContentQuery.json()
// sss/

    return (
        <>
            <div
                className="pt-[16rem] sm:pt-72 md:pt-56  z-[999] relative  flex md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 justify-center">
                <div className="flex flex-col gap-4 w-full md:w-1/2 justify-center">
                    <p className="Voigante sm:text-start text-center text-5xl">
                        {data.data?.heading}
                    </p>
                    <p className={`${montesserat.className} text-sm font-extralight sm:text-start text-center`}>
                        {data.data?.description}
                    </p>
                    <Link href={`${process.env.NEXT_PUBLIC_BASEURL}/#packages`}
                        className="relative h-[3rem] sm:self-start  flex justify-center items-center p-8 ">
                        <Image

                            className="w-full h-full absolute top-0  z-[-1]"
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

                            className="w-full h-full"
                            src={"/images/home/home-img1.svg"}
                            alt="home img1"
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}