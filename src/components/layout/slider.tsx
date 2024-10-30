'use client'

import { useRef } from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import NextSlide from "./button-test";
import PreviousSlide from "./previousButton";
import ReactStars from "react-stars";

export default function HomeSlider({data}:{data:any}){
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
        {data.map((e:any,i:number)=>        
            <SwiperSlide><div key={i} className=" h-auto max-h-[55rem] w-full relative">
                <Image
                    
                    className="w-full h-full absolute  top-0 z-[0]"
                    src={"/images/layout/testimonialBox.png"}
                    alt="about us"
                    width={200}
                    height={300}
                />
                <div
                    className="flex flex-col relative z-[1] w-full p-8     mb-[1.5rem] sm:mt-0 sm:px-[3rem] sm:py-[2rem]">
                    <div className="flex justify-between items-center gap-4 mb-4">
                        <div style={{flex:"0.2"}} className="h-[3rem]">
                            <Image
                                
                                className="w-full h-full"
                                src={e.user.profilePicture.url.includes('placeholder')?'/images/user/profile/profile.png':e.user.profilePicture.isCompleteUrl?e.user.profilePicture.url:`${process.env.NEXT_PUBLIC_MEDIA_URL}/${e.user.profilePicture.url}`}
                                alt="client"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div style={{flex:"0.8"}}>
                            <p>{e.user.name}</p>
                            <p className="Voigante">Customer</p>
                        </div>
                    </div>
                    <p className="w-full text-sm min-h-[5rem]">{e.description}</p>
                        <div style={{flex:"0.5"}}>
                        <ReactStars
count={5}
value={e.rating}
edit={false}
size={24}
color2={'orange'} />
                        </div>
                </div>
            </div>
            </SwiperSlide>
            )
            }
    </Swiper>
            </div>
        </>
    )
}