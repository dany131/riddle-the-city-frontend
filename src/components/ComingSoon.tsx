'use client';

import { Courier_Prime } from "next/font/google";
import Image from "next/image";
import { FieldValues, useController, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

const Courier=Courier_Prime({
    weight:'400',
    subsets:['latin']
})

export default function ComingSoon() {
   const{control,handleSubmit,setError}= useForm()
   const router=useRouter()
   const{field,fieldState}=useController({control,name:'key',rules:{required:"Enter Key"}})
   function handleSubmitt(e:FieldValues){
    if(e.key=='Admin@1234'){
        Cookies.set('comingSoon','no')
        router.refresh()
        return
    }
    setError('key',{message:"Invalid Key"})
   }
    return (
        <>
            <div className={`relative w-full min-h-screen bg-[#160704] flex items-center justify-center ${Courier.className} `}>
                <Image src="/images/layout/image 9.svg" className="absolute w-full h-full top-0 left-0 object-cover opacity-20" alt="Background" width={1000} height={1000}/>
                    <div className="text-white relative z-20 flex flex-col items-center gap-2 p-4" >
                        <Image alt="riddle" width={400} height={400} src="/images/layout/image 3.svg" className="h-40"/>
                            <p className="sm:text-6xl text-yellow-500 text-4xl " >Coming Soon</p>
                            <p className="sm:text-lg text-md text-center">We're working hard to bring you something amazing. Stay tuned!</p>
                            <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleSubmitt)}>
                                <Input errorMessage={fieldState.error?.message} isInvalid={!!fieldState.error} type="text" {...field} placeholder="Enter Key"/>
                                <Button type="submit" className="bg-yellow-500 text-white">Submit</Button>
                            </form>
                    </div>
            </div>
        </>
    )
}