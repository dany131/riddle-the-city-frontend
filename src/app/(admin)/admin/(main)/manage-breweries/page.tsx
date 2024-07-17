'use client';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";

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
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Manage Breweries</p>
                <button  className="px-16 py-2 bg-[#A92223] rounded text-white">Add Brewery</button>
            </div>
            <table className="p-4 mt-4">
                <tr className="bg-gray-200">
                    <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                    <th className="p-2 text-sm text-left">Brewery Name</th>
                    <th className="p-2 text-sm text-left">Location</th>
                    <th className="p-2 text-sm text-left">Date Of Creation</th>
                    <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                </tr>        
                {data.map((e) => <tr>
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
                </tr>)}
            </table>
            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
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
        </>
    )
}