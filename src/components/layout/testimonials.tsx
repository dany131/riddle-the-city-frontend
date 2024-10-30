// 'use client'
import Image from "next/image";
import HomeSlider from "./slider";
import { useQuery } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
// import StarRatings from 'react-star-ratings';
// import ReactStars from 'react-stars'
export default async function TestimonialSlider(){
    // const getTestimonialsQuery=useQuery(['testimonials'],()=>axiosInstance.get('/platform/feedback?page=1&limit=100000000000'))
    const getTestimonialsQuery=await fetch(`${process.env.NEXT_PUBLIC_API}/platform/feedback?page=1&limit=100000000000`,{cache:'no-cache'})
    const data=await getTestimonialsQuery.json()

    return(
        <>
        <HomeSlider data={data.data} />
        </>
    )
}