import Image from "next/image";
import { useSwiper } from "swiper/react";

export default function NextSlide(){
    const swiper = useSwiper();

    return (
        <>
        <button 
        id="next"
                    // onClick={nextSlide} 
                    onClick={()=>swiper.slideNext()}
                    className="min-h-[3rem] w-[3rem] absolute opacity-0">
                        <Image
                                className="w-full h-full" src={'/images/layout/backButton.svg'}
                            alt="back button" width={100} height={100}/>
                    </button>
        </>
    )
}