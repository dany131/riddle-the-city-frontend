'use client';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { GrView } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";



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
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [editRiddle,setEditRiddle]=useState(false)
    const [createRiddle, setCreateRiddle] = useState(false)
    const [page, setPage] = useState(1)
    const [riddleToView, setRiddleToView] = useState<any>()
    const [riddleToEdit, setRiddleToEdit] = useState<any>()
    const queryClient=useQueryClient()
    const huntsQuery = useQuery(['hunts', page], ({ queryKey }) => {
        return axiosInstance.get(`/riddle/api/hunt/all?page=${queryKey[1]}&limit=20`)
    }, {
        onSuccess(data) {
            console.log(data)
        },
        onError(err) {
            console.log(err)
        },
    })

    const updateHunts = useMutation((data: any) => axiosInstance.put(`/riddle/api/hunt?huntId=${riddleToEdit._id}`, data), {
        onSuccess(data) {
            console.log('update hunts', data.data)
            setEditRiddle(!editRiddle)
            queryClient.invalidateQueries('hunts')
        },
    })

    const deleteRiddle = useMutation((data: any) => axiosInstance.delete(`/riddle/api/hunt/riddle?huntId=${riddleToEdit._id}&riddleId=${data}`, data), {
        onSuccess(data) {
            console.log('delete hunts', data.data)
            setEditRiddle(!editRiddle)
            queryClient.invalidateQueries('hunts')
        },
    })

    const downloadPdf = useMutation((data: any) => axiosInstance({ url: `${`/riddle/api/hunt/pdf?huntId=${data}`}`, method: "GET", responseType: 'blob' }), {
        onSuccess(data) {
            const url = window.URL.createObjectURL(new Blob([data.data], { type: 'application/pdf' }));
            window.open(url);
        },
    })

    console.log(riddleToEdit)
    return (
        <>
            
            
            <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Manage Hunts</p>
                <Link href={'/admin/manage-hunts/create'} className="px-16 py-2 bg-[#A92223] rounded text-white">Create New Hunt</Link>
            </div>
            {!editRiddle &&
                <>
                {huntsQuery.isFetching && <p className="text-center">Fetching Data</p>}
                {huntsQuery.data?.data.data.length == 0 && !huntsQuery.isFetching && <p className="text-center">No Data Exists</p>}
                {huntsQuery.data?.data.data.length != 0 && !huntsQuery.isFetching &&
                    <>
                    <table className="p-4 mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                                <th className="p-2 text-sm text-left">Brewery Name</th>
                                <th className="p-2 text-sm text-left">Riddle Description</th>
                                <th className="p-2 text-sm text-left">Creation Date</th>
                                {/* <th className="p-2 text-sm text-left ">QR Code Link</th> */}
                                <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {huntsQuery.data?.data.data.map((e: any, index: number) => <tr key={index + 1} >
                                <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                                <td className="p-2 text-sm">{e.name}</td>
                                <td className="p-2 text-sm">{e.description}</td>
                                <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 text-sm">
                                    <div className="flex gap-2">
                                        {/* {downloadPdf.data?.data && 
                                            <a className="underline text-red-600" href={`${downloadPdf.data?.data}`}>Download PDF</a>
                                        } */}
                                        
                                        {/* <button onClick={() => {
                                            downloadPdf.mutate(e._id)
                                        }} className="underline text-red-600">Download PDF</button> */}
                                        <GrView onClick={() => {
                                            downloadPdf.mutate(e._id)
                                            // setRiddleToView(e)
                                            // onOpen3()
                                        }} className="cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600" />
                                        <CiEdit onClick={() => {
                                            setEditRiddle(!editRiddle)
                                            setRiddleToEdit(e)
                                        }} className="cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600" />
                                        {/* <AiOutlineDelete onClick={onOpen2} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " /> */}
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    {huntsQuery.data?.data.lastPage != page && <button className="px-16 py-2 bg-[#A92223] w-max rounded text-white m-auto" type="button" onClick={() => {
                    setPage((prev) => prev + 1)
                }}>Next Page</button>}
                </> 
                }
                </>
            }

            {editRiddle &&
                <>
                <div className=" flex flex-col items-start gap-4 pb-4 border-[0.1rem] rounded-lg">
                    {riddleToEdit.riddles.map((e:any) => {
                        return (<div className="w-[70%] self-start flex flex-col gap-4 p-4">
                            <h1 className="font-semibold">Edit Riddle</h1>
                            {/* <Input
                                className="w-full"
                                type="text"
                                label="Select Brewery"
                                // placeholder="Brewery 01"
                                labelPlacement="outside"
                                defaultValue={`${e.title}`}
                                classNames={{ label: "!font-semibold" }}
                            /> */}
                            {/* <Select
                                size={'md'}
                                className="w-full"
                                labelPlacement={"outside"}
                                label="Select Brewery"
                                placeholder="Brewery 01"
                                defaultSelectedKeys={}
                                classNames={{
                                    label: "!font-semibold"
                                }}

                            >
                                {selections.map((animal) => (
                                    <SelectItem key={animal.key}>
                                        {animal.label}
                                    </SelectItem>
                                ))}
                            </Select> */}
                            <div className="flex w-full gap-4">
                                <div className="flex flex-col justify-between w-full ">
                                    <Input
                                        className="w-full"
                                        type="text"
                                        onChange={(f) => {
                                            const title = f.target.value
                                            const find = riddleToEdit.riddles.find((k: any) => k._id == e._id)
                                            find.title=title
                                            const newRiddles = riddleToEdit.riddles.map((k:any) => {
                                                if (k._id == find._id) {
                                                    return find
                                                }
                                                return k
                                            })
                                            setRiddleToEdit((prev:any) => {
                                                return (
                                                    {
                                                        ...prev,
                                                        riddles:newRiddles
                                                    }
                                                )
                                            })
                                            console.log(find)
                                        }}
                                        label="Riddle Name"
                                        defaultValue={`${e.title}`}
                                        placeholder="Brewery 01"
                                        labelPlacement="outside"
                                        classNames={{ label: "!font-semibold" }}
                                    />
                                    <Input
                                        className="w-full"
                                        type="text"
                                        onChange={(f) => {
                                            const title = f.target.value
                                            const find = riddleToEdit.riddles.find((k: any) => k._id == e._id)
                                            find.hint = title
                                            const newRiddles = riddleToEdit.riddles.map((k: any) => {
                                                if (k._id == find._id) {
                                                    return find
                                                }
                                                return k
                                            })
                                            setRiddleToEdit((prev: any) => {
                                                return (
                                                    {
                                                        ...prev,
                                                        riddles: newRiddles
                                                    }
                                                )
                                            })
                                            console.log(find)
                                        }}
                                        label="Hint"
                                        defaultValue={`${e.hint}`}
                                        placeholder="Write Hint"
                                        labelPlacement="outside"
                                        classNames={{ label: "!font-semibold" }}
                                    />
                                </div>

                                <div className="flex flex-col gap-4 w-full ">
                                    <Textarea
                                        label="Description"
                                        placeholder="Write your description..."
                                        onChange={(f) => {
                                            const title = f.target.value
                                            const find = riddleToEdit.riddles.find((k: any) => k._id == e._id)
                                            find.description = title
                                            const newRiddles = riddleToEdit.riddles.map((k: any) => {
                                                if (k._id == find._id) {
                                                    return find
                                                }
                                                return k
                                            })
                                            setRiddleToEdit((prev: any) => {
                                                return (
                                                    {
                                                        ...prev,
                                                        riddles: newRiddles
                                                    }
                                                )
                                            })
                                            console.log(find)
                                        }}
                                        className="w-full"
                                        labelPlacement="outside"
                                        defaultValue={`${e.description}`}
                                        size="lg"
                                        minRows={10}
                                        classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                                    />
                                    <Input
                                        className="w-full "
                                        type="text"
                                        onChange={(f) => {
                                            const title = f.target.value
                                            const find = riddleToEdit.riddles.find((k: any) => k._id == e._id)
                                            find.reward = title
                                            const newRiddles = riddleToEdit.riddles.map((k: any) => {
                                                if (k._id == find._id) {
                                                    return find
                                                }
                                                return k
                                            })
                                            setRiddleToEdit((prev: any) => {
                                                return (
                                                    {
                                                        ...prev,
                                                        riddles: newRiddles
                                                    }
                                                )
                                            })
                                            console.log(find)
                                        }}
                                        defaultValue={`${e.reward}`}
                                        label="Reward"
                                        placeholder="Write Reward"
                                        labelPlacement="outside"
                                        classNames={{ label: "!font-semibold" }}
                                    />
                                </div>
                            </div>
                            <button onClick={() => {
                                deleteRiddle.mutate(e._id)
                            }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Delete Riddle</button>
                        </div>)
                    })}
                    <button onClick={() => {
                        updateHunts.mutate(riddleToEdit)
                    }} className="px-16  w-full py-2 bg-[#A92223]  rounded text-white">Update Riddles</button>
                    </div>
                </>
            }
            </>
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
                placement="center"
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Riddles</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <div className="flex flex-col h-[15rem] gap-4  overflow-auto">
                                    {riddleToView.riddles.map((e:any) =>
                                        <div className="flex gap-4 bg-gray-400 p-4 flex-wrap rounded-lg">
                                            <div className="flex items-center flex-col bg-white text-black rounded-lg p-4 gap-2">
                                                <p>Title</p>
                                                <p>{e.title}</p>
                                            </div>
                                            <div className="flex items-center flex-col bg-white text-black rounded-lg p-4 gap-2">
                                                <p>Hint</p>
                                                <p>{e.hint}</p>
                                            </div>
                                            <div className="flex items-center flex-col bg-white text-black rounded-lg p-4 gap-2">
                                                <p>Reward</p>
                                                <p>{e.reward}</p>
                                            </div>
                                            <div className="flex items-center flex-col bg-white text-black rounded-lg p-4 gap-2">
                                                <p>Description</p>
                                                <p>{e.description}</p>
                                            </div>
                                            <div className="flex items-center flex-col bg-white text-black rounded-lg p-4 gap-2">
                                                <p>QR Code</p>
                                                <div>
                                                    <Image src={`${e.qrCode}`} alt="qr code" width={100} height={100}/>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}













