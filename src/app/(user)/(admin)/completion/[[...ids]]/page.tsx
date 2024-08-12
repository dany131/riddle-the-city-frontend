'use client';

import axiosInstance from "@/app/utils/axiosInstance";
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
                <p>Scan Start</p>
            </div>
        </>
    )
}