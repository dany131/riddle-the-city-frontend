'use client'

import axiosInstance from "@/app/utils/axiosInstance"
import { DiscountTypes } from "@/app/utils/constant"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CiEdit } from "react-icons/ci"
import { ImSpinner2 } from "react-icons/im"
import { IoEyeOutline } from "react-icons/io5"
import { useQuery } from "react-query"
export default function CMS(){
    const [page, setPage] = useState(1)
    const bookingsQuery = useQuery(['cms', page], ({ queryKey }) => {
        return axiosInstance.get(`/cms/all?page=${queryKey[1]}&limit=10`)
    }, {
        onSuccess(data) {
            console.log(data)
        },
        onError(err) {
            console.log(err)
        },
    })
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">CMS</p>
            </div>
            <div className="flex justify-end gap-4">
            <Link href={'/admin/cms/create'}
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Create</Link>
                        {/* <Link href={'/admin/mailing/announcement'}
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Create Announcements</Link> */}
            </div>
            {bookingsQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>    }
            {/* {bookingsQuery.data?.data.data.length == 0 && !bookingsQuery.isFetching && <p className="text-center">No Data Exists</p>} */}
            {!bookingsQuery.isFetching&&
                <>
                <table className="p-4 mt-4 w-full block sm:table overflow-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Name</th>
                            <th className="p-2 text-sm text-left">Description</th>
                            {/* <th className="p-2 text-sm text-left">Hunts Required</th> */}
                            {/* <th className="p-2 text-sm text-left">Logo</th> */}
                            <th className="p-2 text-sm text-left">Created At</th>
                            {/* <th className="p-2 text-sm text-left">Is Active</th> */}
                            <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsQuery.data?.data.data.map((e: any, index: number) => <tr className="border-b-2 border-solid border-gray-200" key={index + 1}>
                            <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                            <td className="p-2 text-sm">{e.heading}</td>
                            <td className="p-2 text-sm">{e.description}</td>
                            {/* <td className="p-2 text-sm">{e.huntsRequired}</td> */}
                            {/* <td className="p-2 text-sm"><Image className="w-[3rem] h-[3rem] object-contain" src={e.media?e.media.includes('placeholder')?'/images/user/profile/profile.png':`${process.env.NEXT_PUBLIC_MEDIA_URL}/${e.media}`:'/images/user/profile/profile.png'} alt="brewery Logo" width={100} height={100}/></td> */}
                            <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                            {/* <td className="p-2 text-sm">{`${e.active?"Active":"Not Active"}` }</td> */}
                            <td className="p-2 text-sm">
                                <div className="flex gap-2">
                                <Link href={`/admin/cms/update?id=${e._id}`}>
                                                <CiEdit
                                                    // onClick={() => {
                                                    // setEditRiddle(!editRiddle)
                                                    // setRiddleToEdit(e)
                                                    // }}
                                                    className="cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600"/>
                                            </Link>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                
                <div className="flex gap-4 flex-wrap">
                    {!!bookingsQuery.data?.data.lastPage && bookingsQuery.data?.data.lastPage != page && <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max " type="button" onClick={() => {
                        setPage((prev) => prev + 1)
                    }}>Next Page</button>}

                    {
                        page != 1 && <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max " type="button" onClick={() => {
                            setPage((prev) => prev - 1)
                        }}>Previous Page</button>
                    }
                </div>
                </>
             }
        </>
    )
}