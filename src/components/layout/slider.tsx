'use client'

import { useRef } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function HomeSlider({children}:{children:React.ReactNode}){
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
    const sliderRef = useRef(null);

    
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
            <div className="px-8 sm:px-28 flex gap-8 sm:justify-between sm:flex-nowrap flex-wrap justify-center">
                <h1 className={`text-4xl Voigante text-center`}>What Clients Say About Us</h1>
                <div className="flex gap-4">
                    <button onClick={prevSlide} className="min-h-[3rem] w-[3rem]">
                        <Image loading="lazy"
                                className="w-full h-full" src={'/images/layout/forwardButton.svg'}
                            alt="back button" width={100} height={100}/>
                    </button>
                    <button onClick={nextSlide} className="min-h-[3rem] w-[3rem]">
                        <Image loading="lazy"
                                className="w-full h-full" src={'/images/layout/backButton.svg'}
                            alt="back button" width={100} height={100}/>
                    </button>
                </div>
            </div>
            <div className="slider-container">
                <Slider className="px-4 " ref={sliderRef} {...settings}>
                    {children}
                </Slider>
            </div>
        </>
    )
}