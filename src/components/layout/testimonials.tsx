import HomeSlider from "./slider";
export default async function TestimonialSlider(){
    const getTestimonialsQuery=await fetch(`${process.env.NEXT_PUBLIC_API}/platform/feedback?page=1&limit=100000000000`,{cache:'no-store'})
    const data=await getTestimonialsQuery.json()

    return(
        <>
        <HomeSlider data={data.data} />
        </>
    )
}