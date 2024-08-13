'use client';

import axiosInstance from "@/app/utils/axiosInstance";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Completion(datas: any) {
    console.log(datas)
    const queryClient=useQueryClient()
    const scanMutation = useQuery(['scan'], () => axiosInstance.post(`/riddle/api/hunt/scan?riddleId=${datas.params.ids[1]}&huntId=${datas.params.ids[0]}`), {
        onSuccess(data) {
            queryClient.invalidateQueries('getRiddle')
        },
    })
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <div className="flex items-center flex-col gap-4">
                    <div className="w-1/2 h-[15rem]">
                        <Image className="w-full h-full" src={`/images/user/congratulations.gif`} alt="congrats" width={100} height={100}/>
                    </div> 
                    <button className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Next Riddle</button>
                </div>
                {/* <p>Scan Start</p> */}

            </div>
        </>
    )
}