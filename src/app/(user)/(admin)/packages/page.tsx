'use client';

import axiosInstance from "@/app/utils/axiosInstance";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { useQuery } from "react-query";

export default function Packages() {
    const packagesQuery = useQuery(['packages'], () => axiosInstance.get('/riddle/api/package/all?page=1&limit=20'));

    return (
        <div className="flex flex-col gap-4 px-4 h-full">
            <p className="font-semibold text-xl">Packages</p>
            <div className="flex flex-col border-1 rounded-lg gap-8 p-4">
                {packagesQuery.isFetching && (
                    <div className="flex justify-center h-full items-center">
                        <ImSpinner2 className="text-4xl animate-spin" />
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!packagesQuery.isFetching && packagesQuery.data?.data.data.map((e: any) => (
                        <div key={e._id} className="flex flex-col shadow-2xl rounded-lg gap-4 p-4 min-w-full sm:min-w-[18rem]">
                            <div className="pb-2 text-center text-lg font-semibold border-b-2 border-solid border-red-600">
                                <p>{e.name}</p>
                            </div>
                            <div className="flex justify-center">
                                <p>{e.price}$</p>
                            </div>
                            <div className="text-center">
                                <p>{e.description}</p>
                            </div>
                            <Link className="bg-[#A92223] rounded-lg px-16 py-2 text-white w-full text-center" href={`/checkout?id=${e._id}`}>
                                Get This Package
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}