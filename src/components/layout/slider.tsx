'use client'

import { useRef } from "react";

import Image from "next/image";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import NextSlide from "./button-test";
import PreviousSlide from "./previousButton";

export default function HomeSlider({children,length}:{children:React.ReactNode,length:number}){
    return (
        <>
            <div className="px-8 sm:px-28 flex gap-8 sm:justify-between sm:flex-nowrap flex-wrap justify-center">
                <h1 className={`text-4xl Voigante text-center`}>What Clients Say About Us</h1>
                {/* {length >0 && } */}
                <div className="flex gap-4">
                    <button onClick={()=>document.getElementById('previous')?.click()} className="min-h-[3rem] w-[3rem]">
                        <Image
                                className="w-full h-full" src={'/images/layout/forwardButton.svg'}
                            alt="back button" width={100} height={100}/>
                    </button>
                    <button onClick={()=>document.getElementById('next')?.click()} className="min-h-[3rem] w-[3rem]">
                        <Image
                                className="w-full h-full" src={'/images/layout/backButton.svg'}
                            alt="back button" width={100} height={100}/>
                    </button>
                </div>
            </div>
            <div className="slider-container">
            <Swiper
      spaceBetween={50}
      className="!p-8"
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1050: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
    }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        <NextSlide/>
        <PreviousSlide/>
        {children}
    </Swiper>
            </div>
        </>
    )
}