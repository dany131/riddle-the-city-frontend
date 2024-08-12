'use client';
import { IoEyeOutline } from "react-icons/io5";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useQuery } from "react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "@/app/utils/axiosInstance";
import { ImSpinner2 } from "react-icons/im";
const data = [
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 }
]
export default function Bookings() {
    const [page, setPage] = useState(1)
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const bookingsQuery = useQuery(['bookings', page], ({ queryKey }) => {
        const userData = JSON.parse(Cookies.get('userData')!)
        return axiosInstance.get(`/riddle/api/booking/all?page=${queryKey[1]}&limit=10`)
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
                <p className="text-xl font-semibold">View Bookings</p>
            </div>
            
            {bookingsQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>    }
            {/* {bookingsQuery.data?.data.data.length == 0 && !bookingsQuery.isFetching && <p className="text-center">No Data Exists</p>} */}
            {!bookingsQuery.isFetching&&
                <>
                <table className="p-4 mt-4 w-full block sm:table overflow-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">User Name</th>
                            <th className="p-2 text-sm text-left">Package Booked</th>
                            <th className="p-2 text-sm text-left">Date Of Booking</th>
                            <th className="p-2 text-sm text-left">Is Active</th>
                            {/* <th className="p-2 text-sm text-left rounded-r-md">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsQuery.data?.data.data.map((e: any, index: number) => <tr className="border-b-2 border-solid border-gray-200" key={index + 1}>
                            <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                            <td className="p-2 text-sm">{e.user.name}</td>
                            <td className="p-2 text-sm">{e.package.name}</td>
                            <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 text-sm">{`${e.active?"Active":"Not Active"}` }</td>
                            {/* <td className="p-2 text-sm">
                                <div className="flex gap-2">
                                    <IoEyeOutline onClick={onOpen2} className=" cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " />
                                </div>
                            </td> */}
                        </tr>)}
                    </tbody>
                </table>
                <div className="flex gap-4 flex-wrap">
                    {bookingsQuery.data?.data.lastPage != page && <button className="px-16 py-2 bg-[#A92223] sm:w-max rounded text-white m-auto" type="button" onClick={() => {
                        setPage((prev) => prev + 1)
                    }}>Next Page</button>}

                    {
                        page != 1 && <button className="px-16 py-2 bg-[#A92223] sm:w-max w-full rounded text-white m-auto" type="button" onClick={() => {
                            setPage((prev) => prev - 1)
                        }}>Previous Page</button>
                    }
                </div>
                </>
             }

            <Modal
                size={"xl"}
                isOpen={isOpen2}
                backdrop="blur"
                onOpenChange={onOpenChange2}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Booking Details</ModalHeader>
                            <ModalBody className="flex flex-col gap-8 pb-8">
                                <div className="flex justify-between w-full gap-4">
                                    <div className="flex w-1/2 flex-col gap-2">
                                        <p>User Name</p>
                                        <p className="font-bold text-sm">John Doe</p>
                                    </div>
                                    <div className="flex w-1/2 flex-col gap-2">
                                        <p>Brewery Booked</p>
                                        <p className="font-bold text-sm">Brewery 01</p>
                                    </div>
                                    <div className="flex w-1/2 flex-col gap-2">
                                        <p>Date Of Booking</p>
                                        <p className="font-bold text-sm">12/03/2024</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between gap-4">
                                    <div className="flex w-1/2 flex-col gap-2">
                                        <p>Email</p>
                                        <p className="font-bold text-sm">johndoe@gmail.com</p>
                                    </div>
                                    <div className="flex w-1/2 flex-col gap-2">
                                        <p>Phone</p>
                                        <p className="font-bold text-sm">+123456789</p>
                                    </div>
                                    <div className="flex w-1/2 flex-col gap-2">
                                        <p>Status</p>
                                        <p className="font-bold text-sm">Confirmed</p>
                                    </div>
                                </div>
                                
                                <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}