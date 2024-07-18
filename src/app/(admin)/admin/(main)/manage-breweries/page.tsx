'use client';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { SiGooglemaps } from "react-icons/si";
const selections = [
    {label:'Open',key:1}
]

const data = [
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 }
]
export default function ManageBreweries() {
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [addBrewery, setAddBrewery] = useState(false)
    return (
        <>
            {!addBrewery &&
                <>
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Manage Breweries</p>
                    <button onClick={()=>{setAddBrewery(!addBrewery)}} className="px-16 py-2 bg-[#A92223] rounded text-white">Add Brewery</button>
                </div>
                <table className="p-4 mt-4">
                    <thead><tr className="bg-gray-200">
                        <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                        <th className="p-2 text-sm text-left">Brewery Name</th>
                        <th className="p-2 text-sm text-left">Location</th>
                        <th className="p-2 text-sm text-left">Date Of Creation</th>
                        <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                    </tr>    </thead>
                    <tbody>{data.map((e) => <tr >
                        <td className="p-2 text-sm">01</td>
                        <td className="p-2 text-sm">Brewery A</td>
                        <td className="p-2 text-sm">Lorem Ipsum Dolor Erum</td>
                        <td className="p-2 text-sm">12-02-2024</td>
                        <td className="p-2 text-sm">
                            <div className="flex gap-2">
                                <CiEdit onClick={onOpen1} className=" cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600" />
                                <AiOutlineDelete onClick={onOpen2} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " />
                            </div>
                        </td>
                    </tr>)}</tbody>
                </table>
                </>
            }
            {addBrewery &&
                <>
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Add Brewery</p>
                </div>
                <div className="mt-4 p-4">
                    <div className="sm:w-[80%] flex flex-col gap-4 w-full">
                        <div className="flex gap-4">
                            <Input
                                className="w-full"
                                type="text"
                                label="Brewery Name"
                                placeholder="Enter Brewery Name"
                                labelPlacement="outside"
                            />
                            <Input
                                className="w-full"
                                type="text"
                                label="Location"
                                placeholder="Enter Location"
                                labelPlacement="outside"
                                endContent={
                                    <>
                                        <SiGooglemaps/>
                                    </>
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="font-semibold">Schedule Hours</p>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <td className="font-semibold">Day</td>
                                        <td className="font-semibold">From</td>
                                        <td className="font-semibold"></td>
                                        <td className="font-semibold">To</td>
                                    </tr>
                                </thead>
                                <tbody className="gap-4">
                                    <tr>
                                        <td ><p className="pt-4 pr-4 font-semibold flex items-center">Sunday</p></td>
                                        <td className="rounded-lg">
                                            <div className="pt-4 pr-4">
                                                <p className="pr-16 pl-4 py-2 pt-4 bg-[#f8f8f8] flex text-gray-400  items-center">06:00 pm</p>
                                            </div>
                                        </td>
                                        <td ><div className="pt-4 pr-4 flex items-center justify-center">
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                        </div></td>
                                        <td ><div className="pt-4 pr-4">
                                            <p className="pr-16 pl-4 py-2 pt-4 bg-[#f8f8f8] flex text-gray-400  items-center">09:00 am</p>
                                        </div></td>
                                    </tr>
                                    <tr>
                                        <td ><p className="pt-4 flex font-semibold items-center">Sunday</p></td>
                                        <td className="rounded-lg">
                                            <div className="pt-4 pr-4">
                                                <p className="pr-16 pl-4 py-2 pt-4 bg-[#f8f8f8] flex text-gray-400  items-center">06:00 pm</p>
                                            </div>
                                        </td>
                                        <td ><div className="pt-4 pr-4 flex items-center justify-center">
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                        </div></td>
                                        <td ><div className="pt-4 pr-4">
                                            <p className="pr-16 pl-4 py-2 pt-4 bg-[#f8f8f8] flex text-gray-400  items-center">09:00 am</p>
                                        </div></td>
                                        <td><div className="pt-4 pr-4">
                                            <p className=" min-w-[7rem]  pb-2 px-16 pt-4 bg-red-200 flex text-red-600 rounded-lg items-center justify-center text-center">Closed</p>
                                        </div></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>   

                        <button onClick={() => {
                            setAddBrewery(!addBrewery)
                            onOpen3()
                        }} className="px-16 py-2 bg-[#A92223] w-max rounded text-white">Add Brewery</button>
                    </div>
                </div>
                </>
            }
            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Edit Brewery Status</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <Input
                                    className="w-full"
                                    type="text"
                                    label="Brewery Name"
                                    placeholder="Enter Brewery Name"
                                    labelPlacement="outside"
                                />
                                <Select
                                    size={'md'}
                                    className="w-full"
                                    labelPlacement={"outside"}
                                    label="Select Status"
                                    placeholder="Open"
                                    
                                >
                                    {selections.map((animal) => (
                                        <SelectItem key={animal.key}>
                                            {animal.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <button className="px-16 py-2 bg-[#A92223] w-max rounded text-white">Save Changes</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Delete Brewery</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Are you sure you want to delete this Brewery?</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-full py-2 bg-[#A92223]  rounded text-white">No</button>
                                    <button className="px-16 w-full py-2 border-2 border-[#A92223] text-[#A92223]  rounded ">Delete</button>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Brewery Added Successfuly</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">New Brewery has been added successfully</p>
                                <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}