'use client';

import axiosInstance from "@/app/utils/axiosInstance";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { useQuery } from "react-query";

export default function Packages() {
    const packagesQuery = useQuery(['packages'], () => axiosInstance.get('/riddle/api/package/all?page=1&limit=20'))
    return (
        <div className="flex flex-col gap-4 px-4 h-full">
            <p className="font-semibold text-xl">Packages</p>
            <div className="flex flex-col border-1 rounded-lg gap-8 p-4">
                {packagesQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>}
                <div className="flex gap-4">
                    {!packagesQuery.isFetching && packagesQuery.data?.data.data.map((e:any) =>
                        <div className="flex min-w-[18rem] flex-col shadow-2xl rounded-lg gap-4 p-4">
                            <div className="pb-2 text-center text-lg font-semibold border-b-2 border-solid border-red-600">
                                <p>{e.name}</p>
                            </div>
                            <div className="flex  justify-center">
                                <p>{e.price }$</p>
                            </div>
                            <div className="text-center">
                                <p>{e.description}</p>
                            </div>
                            <Link className="bg-[#A92223] rounded-lg px-16 py-2 text-white w-full" href={`/checkout?id=${e._id}`}>Get This Package</Link>
                        </div>
                    )}
                </div>

                {/* <div className="flex flex-col ">
                    <p className="font-semibold">Provide Descriptive Comment</p>
                    <Textarea
                        // label="Riddle Description"
                        placeholder="Write Comment..."
                        className="sm:w-1/2 w-full"
                        // labelPlacement="outside"
                        size="lg"
                        minRows={10}
                        classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                    />
                </div> */}
                {/* <div className="flex flex-col gap-4 ">
                        <p className="font-semibold">Location</p>
                        <div className="h-[20rem] w-[60%]">
                            <Image className="h-full w-full" src={'/images/user/dashboard/maps.png'} width={200} height={200} alt="google maps" />
                        </div>
                    </div> */}
                {/* <button onClick={() => { onOpen2() }} className="px-32 w-max py-2 bg-[#A92223]  rounded text-white">Submit Feedback</button> */}
            </div>
        </div>
    )
}