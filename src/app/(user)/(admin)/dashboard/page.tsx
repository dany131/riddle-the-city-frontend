'use client';

import Image from "next/image";
import {useState} from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure
} from "@nextui-org/react";
import Link from "next/link";
import {CiEdit} from "react-icons/ci";
import {useQuery} from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {useRouter} from "next/navigation";


export default function Dashboard() {
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2} = useDisclosure();
    const {isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3} = useDisclosure();
    const [nextRiddle, setNextRiddle] = useState(false);
    const [page,setPage]=useState(1)
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useRouter();
    const breweryQuery = useQuery(['breweries', searchQuery,page], ({queryKey}) => {
        return axiosInstance.get(`/riddle/api/brewery/all?page=${queryKey[2]}&limit=10&searchQuery=${queryKey[1]}`);
    }, {
        onSuccess(data) {
            console.log(data);
        },
        onError(err) {
            console.log(err);
        }
    });
    const userStatsQuery = useQuery(['stats'], () => axiosInstance.get('/riddle/api/user/stats'));

    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Dashboard</p>
                <div className="flex flex-wrap gap-4">
                    {/* Statistic Cards */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        {[
                            {
                                label: "Current Package",
                                value: userStatsQuery.data?.data.data.currentPackage.name || "None"
                            },
                            {label: "Riddles Completed", value: userStatsQuery.data?.data.data.riddlesCompleted},
                            {label: "Hunts Completed", value: userStatsQuery.data?.data.data.huntsCompleted},
                            {
                                label: "Active Hunt",
                                value: userStatsQuery.data?.data.data.activeHunt.name ? (
                                    <Link href={"/startRiddle"} className="text-[#A92223] cursor-pointer underline">
                                        {userStatsQuery.data?.data.data.activeHunt.name}
                                    </Link>
                                ) : "None"
                            }
                        ].map((stat, index) => (
                            <div key={index}
                                 className="flex gap-4 p-4 w-full sm:w-1/2 lg:w-1/4 justify-between items-center border-[0.15rem] rounded-lg">
                                <div className="flex flex-col gap-2">
                                    <p className="font-bold">{stat.label}</p>
                                    <p className="text-lg">{stat.value}</p>
                                </div>
                                <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                                    <Image className="w-full h-full object-contain"
                                           src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100}
                                           height={100}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Input
                        label="Available Breweries"
                        placeholder="Search Breweries"
                        onChange={(e) => {
                            setSearchQuery(e.target.value) 
                            setPage(1)
                        }}
                        labelPlacement="outside"
                        classNames={{label: "font-semibold text-lg"}}
                        className="!mt-8 w-full sm:w-1/2"
                    />
                    <table className="p-4 w-full block sm:table overflow-auto mt-4">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Brewery Name</th>
                            <th className="p-2 text-sm text-left">Location</th>
                            <th className="p-2 text-sm text-left rounded-r-md">Date Of Creation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {breweryQuery.data?.data.data.map((e: any, index: number) => (
                            <tr
                                onClick={() => navigate.push(`/brewery?id=${e._id}`)}
                                className="border-b-2 hover:bg-gray-100 cursor-pointer border-solid border-gray-200"
                                key={index + 1}
                            >
                                <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                                <td className="p-2 text-sm">{e.name}</td>
                                <td className="p-2 text-sm">{e.address.text}</td>
                                <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {<div className="flex flex-wrap py-4 justify-center gap-4">
                        {!!breweryQuery.data?.data.lastPage && breweryQuery.data?.data.lastPage != page && <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max " type="button" onClick={() => {
                            setPage((prev) => prev + 1)
                        }}>Next Page</button>}

                        {
                            page != 1 && <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max " type="button" onClick={() => {
                                setPage((prev) => prev - 1)
                            }}>Previous Page</button>
                        }
                    </div>}
                </div>
            </div>

            {/* Hint Modal */}
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
                                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit
                                    commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit
                                    ame</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Reward Modal */}
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
                                <p className="text-sm">Congratulations! You successfully solved the riddle. You got
                                    Reward: 30% discount on a drink.</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Claim Reward
                                    </button>
                                    <button className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Next Riddle
                                    </button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}