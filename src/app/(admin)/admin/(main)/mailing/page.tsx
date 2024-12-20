'use client'
import axiosInstance from "@/app/utils/axiosInstance"
import Link from "next/link"
import { useState } from "react"
import { ImSpinner2 } from "react-icons/im"
import { useQuery } from "react-query"

export default function Mailing(){
    const [page, setPage] = useState(1)
    const bookingsQuery = useQuery(['mailings', page], ({ queryKey }) => {
        return axiosInstance.get(`/mailing/all?page=${queryKey[1]}&limit=10`)
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
                <p className="text-xl font-semibold">Mailing</p>
            </div>
            <div className="flex justify-end gap-4">
            <Link href={'/admin/mailing/single'}
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Create Single Mail</Link>
                        <Link href={'/admin/mailing/announcement'}
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Create Announcements</Link>
            </div>
            {bookingsQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>    }
            {/* {bookingsQuery.data?.data.data.length == 0 && !bookingsQuery.isFetching && <p className="text-center">No Data Exists</p>} */}
            {!bookingsQuery.isFetching&&
                <>
                <table className="p-4 mt-4 w-full block sm:table overflow-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Subject</th>
                            <th className="p-2 text-sm text-left">Body</th>
                            <th className="p-2 text-sm text-left">Created At</th>
                            {/* <th className="p-2 text-sm text-left">Is Active</th> */}
                            {/* <th className="p-2 text-sm text-left rounded-r-md">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsQuery.data?.data.data.map((e: any, index: number) => <tr className="border-b-2 border-solid border-gray-200" key={index + 1}>
                            <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                            <td className="p-2 text-sm">{e.subject}</td>
                            <td className="p-2 text-sm" dangerouslySetInnerHTML={{__html:e.body}}></td>
                            <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                            {/* <td className="p-2 text-sm">{`${e.active?"Active":"Not Active"}` }</td> */}
                            {/* <td className="p-2 text-sm">
                                <div className="flex gap-2">
                                    <IoEyeOutline onClick={onOpen2} className=" cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " />
                                </div>
                            </td> */}
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