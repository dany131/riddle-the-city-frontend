'use client';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";




const data = [
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 }
]


const selections = [
    { label: 'Open', key: 1 }
]



export default function ManageRiddles() {
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const [editRiddle,setEditRiddle]=useState(false)
    const [createRiddle, setCreateRiddle] = useState(false)
    return (
        <>
            {createRiddle &&
                <>
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Create New Riddles</p>
                </div>
                
                <div className=" border-[0.1rem] p-4 flex flex-col gap-2 rounded-lg">
                    <h1 className="font-semibold">Create Riddle</h1>
                    <div className="w-[70%] flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                        <div className="flex gap-4">
                            <Select
                                size={'md'}
                                className="w-full"
                                labelPlacement={"outside"}
                                label="Select Brewery"
                                placeholder="Brewery 01"

                                classNames={{
                                    label: "!font-semibold"
                                }}

                            >
                                {selections.map((animal) => (
                                    <SelectItem key={animal.key}>
                                        {animal.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                className="w-full"
                                type="text"
                                label="Riddle Title "
                                placeholder="Brewery 01"
                                labelPlacement="outside"
                                classNames={{ label: "!font-semibold" }}
                            />
                        </div>
                        <Textarea
                            label="Riddle Description"
                            placeholder="Write description..."
                            className="w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={10}
                            classNames={{ description: "!h-[15rem]" ,label:"!font-semibold"}}
                        />
                        <div className="flex gap-4">
                            <Textarea
                                label="Riddle Description"
                                placeholder="Write description..."
                                className="w-full"
                                labelPlacement="outside"
                                size="lg"
                                minRows={5}
                                classNames={{ description: "!h-[5rem]", label: "!font-semibold" }}
                            /> <Textarea
                                label="Riddle Description"
                                placeholder="Write description..."
                                className="w-full"
                                labelPlacement="outside"
                                size="lg"
                                minRows={5}
                                classNames={{ description: "!h-[5rem]", label: "!font-semibold" }}
                            />
                        </div>
                        <button onClick={() => {
                            setCreateRiddle(!createRiddle)
                            onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max">Save</button>
                    </div>
                </div>
                
                </>
            }
            
            {!createRiddle &&
                <>
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Manage Riddles</p>
                    {!editRiddle && <button onClick={()=>{setCreateRiddle(!createRiddle)}} className="px-16 py-2 bg-[#A92223] rounded text-white">Create New Riddles</button>}
                </div>
                {!editRiddle && <table className="p-4 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Brewery Name</th>
                            <th className="p-2 text-sm text-left">Riddle Description</th>
                            <th className="p-2 text-sm text-left">Hint</th>
                            <th className="p-2 text-sm text-left ">QR Code Link</th>
                            <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e) => <tr>
                            <td className="p-2 text-sm">01</td>
                            <td className="p-2 text-sm">Brewery A</td>
                            <td className="p-2 text-sm">Lorem Ipsum Dolor Erum</td>
                            <td className="p-2 text-sm">12-02-2024</td>
                            <td className="p-2 text-sm underline text-blue-400">Lorem Ipsum Odor Erum</td>
                            <td className="p-2 text-sm">
                                <div className="flex gap-2">
                                    <CiEdit onClick={() => { setEditRiddle(!editRiddle) }} className="cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600" />
                                    <AiOutlineDelete onClick={onOpen2} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " />
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>}

                {editRiddle &&
                    <>
                        <div className=" border-[0.1rem] rounded-lg">
                            <div className="w-[70%] flex flex-col gap-4 p-4">
                                <h1 className="font-semibold">Edit Riddle</h1>
                                <Select
                                    size={'md'}
                                    className="w-full"
                                    labelPlacement={"outside"}
                                    label="Select Brewery"
                                    placeholder="Brewery 01"

                                    classNames={{
                                        label: "!font-semibold"
                                    }}

                                >
                                    {selections.map((animal) => (
                                        <SelectItem key={animal.key}>
                                            {animal.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <div className="flex w-full gap-4">
                                    <div className="flex flex-col justify-between w-full ">
                                        <Input
                                            className="w-full"
                                            type="text"
                                            label="Riddle Name"
                                            placeholder="Brewery 01"
                                            labelPlacement="outside"
                                            classNames={{ label: "!font-semibold" }}
                                        />
                                        <Input
                                            className="w-full"
                                            type="text"
                                            label="Hint"
                                            placeholder="Write Hint"
                                            labelPlacement="outside"
                                            classNames={{ label: "!font-semibold" }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 w-full ">
                                        <Textarea
                                            label="Description"
                                            placeholder="Write your description..."
                                            className="w-full"
                                            labelPlacement="outside"
                                            size="lg"
                                            minRows={10}
                                            classNames={{ description: "!h-[15rem]" }}
                                        />
                                        <Input
                                            className="w-full "
                                            type="text"
                                            label="Reward"
                                            placeholder="Write Reward"
                                            labelPlacement="outside"
                                            classNames={{ label: "!font-semibold" }}
                                        />
                                    </div>
                                </div>
                                <button onClick={() => { setEditRiddle(!editRiddle) }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Update Riddle</button>
                            </div>
                        </div>
                    </>
                }
                </>
            }
            <Modal
                size={"xl"}
                isOpen={isOpen2}
                backdrop="blur"
                onOpenChange={onOpenChange2}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Delete Entry</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Are you sure you want to delete this entry?</p>
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
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Riddles Created Successfully</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">New Riddle has been created successfully & QR Code is generated</p>
                                <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}