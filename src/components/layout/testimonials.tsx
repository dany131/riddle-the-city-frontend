// 'use client'
import Image from "next/image";
import HomeSlider from "./slider";
import { useQuery } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
// import StarRatings from 'react-star-ratings';
import ReactStars from 'react-stars'
import { SwiperSlide } from "swiper/react";
export default async function TestimonialSlider(){
    // const getTestimonialsQuery=useQuery(['testimonials'],()=>axiosInstance.get('/platform/feedback?page=1&limit=100000000000'))
    const getTestimonialsQuery=await fetch(`${process.env.NEXT_PUBLIC_API}/platform/feedback?page=1&limit=100000000000`,{cache:'no-cache'})
    const data=await getTestimonialsQuery.json()

    return(
        <>
        <HomeSlider>
        
            {data.data.map((e:any,i:number)=>        
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
                        <div style={{flex:"0.5"}}>
                        <ReactStars
count={5}
value={e.rating}
edit={false}
size={24}
color2={'orange'} />
                        </div>
                    </div>
                    <p className="w-full text-sm">{e.description}</p>
                </div>
            </div>
            </SwiperSlide>
            )
            }
        </HomeSlider>
        </>
    )
}