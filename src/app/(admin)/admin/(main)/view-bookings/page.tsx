'use client';
import { IoEyeOutline } from "react-icons/io5";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
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
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">View Bookings</p>
            </div>
            <table className="p-4 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                        <th className="p-2 text-sm text-left">User Name</th>
                        <th className="p-2 text-sm text-left">Brewery Booked</th>
                        <th className="p-2 text-sm text-left">Date Of Booking</th>
                        <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e) => <tr>
                        <td className="p-2 text-sm">01</td>
                        <td className="p-2 text-sm">Brewery A</td>
                        <td className="p-2 text-sm">Lorem Ipsum Dolor Erum</td>
                        <td className="p-2 text-sm">12-02-2024</td>
                        <td className="p-2 text-sm">
                            <div className="flex gap-2">
                                <IoEyeOutline onClick={onOpen2} className=" cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " />
                            </div>
                        </td>
                    </tr>)}
                </tbody>
            </table>

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