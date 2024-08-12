'use client'
import Image from "next/image";
import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { useQuery } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";
export default function Dashboard() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [nextRiddle, setNextRiddle] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate=useRouter()
    const breweryQuery = useQuery(['breweries',searchQuery], ({ queryKey }) => {
        return axiosInstance.get(`/riddle/api/brewery/all?page=1&limit=10&searchQuery=${queryKey[1]}`)
    }, {
        onSuccess(data) {
            console.log(data)
        },
        onError(err) {
            console.log(err)
        },
    })
    const userStatsQuery = useQuery(['stats'], () => axiosInstance.get('/riddle/api/user/stats'))
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Dashboard</p>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <div className="flex gap-4 p-4 w-full sm:w-1/4 justify-between items-center border-[0.15rem] rounded-lg">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Current Package</p>
                            <p className=" text-md">{!!userStatsQuery.data?.data.data.currentPackage.name ? userStatsQuery.data?.data.data.currentPackage.name:"None" }</p>
                            {/* <p className="p-1 w-max bg-green-200 text-green-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p> */}
                        </div>
                        <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                            <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100} />
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 w-full sm:w-1/4 justify-between items-center border-[0.15rem] rounded-lg">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Riddles Completed</p>
                            <p className=" text-lg">{userStatsQuery.data?.data.data.riddlesCompleted}</p>
                            {/* <p className="p-1 w-max bg-green-200 text-green-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p> */}
                        </div>
                        <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                            <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100} />
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 w-full sm:w-1/4 justify-between items-center border-[0.15rem] rounded-lg">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Hunts Completed</p>
                            <p className=" text-lg">{userStatsQuery.data?.data.data.huntsCompleted}</p>
                            {/* <p className="p-1 w-max bg-red-200 text-red-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p> */}
                        </div>
                        <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                            <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100} />
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 w-full sm:w-1/4 justify-between items-center border-[0.15rem] rounded-lg">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Active Hunt</p>
                            <p className=" text-lg">{!!userStatsQuery.data?.data.data.activeHunt.name ? userStatsQuery.data?.data.data.activeHunt.name : "None"}</p>
                            {/* <p className="p-1 w-max bg-red-200 text-red-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p> */}
                        </div>
                        <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                            <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100} />
                        </div>
                    </div>
                </div>
                {/* <p className=" text-lg">Available Breweries</p> */}
                <div>
                    <Input
                        label="Available Breweries"
                        placeholder="Search Breweries"
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }}
                        labelPlacement="outside"
                        classNames={{ label: "font-semibold text-lg" }}
                        className="!mt-8 w-1/2"
                    />
                    <table className="p-4 w-full block sm:table  overflow-auto mt-4">
                        <thead><tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Brewery Name</th>
                            <th className="p-2 text-sm text-left">Location</th>
                            <th className="p-2 text-sm text-left rounded-r-md">Date Of Creation</th>
                            {/* <th className="p-2 text-sm text-left rounded-r-md">Action</th> */}
                        </tr>    </thead>
                        <tbody>{breweryQuery.data?.data.data.map((e: any, index: number) => <tr onClick={() => {
                            navigate.push(`/brewery?id=${e._id}`)
                        }} className="border-b-2 hover:bg-gray-100 cursor-pointer border-solid border-gray-200" key={index + 1}>
                            <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                            <td className="p-2 text-sm">{e.name}</td>
                            <td className="p-2 text-sm">{e.address.text}</td>
                            <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                        </tr>)}</tbody>
                    </table>
                </div>
            </div>

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
                            <ModalHeader className="flex flex-col text-xl gap-1">Hint</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm ">Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit ame</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                size={"xl"}
                isOpen={isOpen3}
                backdrop="blur"
                onOpenChange={onOpenChange3}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Reward</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm ">Congratulations You successfully solved the riddle. You got Reward: 30% discount on a drink</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Claim Reward</button>
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Next Riddle</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}