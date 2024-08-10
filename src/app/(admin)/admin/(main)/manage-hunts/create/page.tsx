'use client';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";

const selections = [
    { label: 'Open', key: 1 }
]

export default function CreateRiddle() {
    const navigate=useRouter()
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1,onClose:onClose1 } = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [message,setMessage]=useState('')
    const [huntToAdd, setHuntToAdd] = useState({
        name: "",
        description: "",
        brewery: "",
        riddles: [
            {
                title: "",
                description: "",
                reward: "",
                hint:""
            }
        ]
    })
    
    const breweryQuery = useQuery(['breweries', page], ({ queryKey }) => {
        return axiosInstance.get(`/riddle/api/brewery/all?page=${queryKey[1]}&limit=20`)
    }, {
        onSuccess(data) {
            console.log(data)
            setHasMore(breweryQuery.data?.data.lastPage != page)
        },
        onError(err) {
            console.log(err)
        },
    })

    function onLoadMore(){
        setPage((prev)=>prev+1)
    }
    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
        onLoadMore,
    });

    const queryClient=useQueryClient()

    const huntAddMutation = useMutation((data: any) => axiosInstance.post(`/riddle/api/hunt`, data), {
        onSuccess(data) {
            console.log('post data', data)
            queryClient.invalidateQueries('hunts')
            setMessage('')
            onOpen1()
        },
    })


    function buttonSubmit() {
        const filterRiddles = huntToAdd.riddles.filter((e) => {
            if (e.description && e.hint && e.reward && e.title) {
                return e
            }
        })
        if (filterRiddles) {
            const addHuntData = {
                ...huntToAdd,
                riddles:filterRiddles
            }
            huntAddMutation.mutate(addHuntData)
        }
        else {
            setMessage('Please Fill All The Info To Add A New Hunt')
        }
    }

    console.log('hunt to add' ,huntToAdd)
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Create New Hunt</p>
            </div>
            {message && <p className="text-red-600 text-center">{message}</p>}
            <div className=" border-[0.1rem] p-4 flex flex-col gap-4 rounded-lg">
                <div className="flex flex-col gap-4">
                    <Input
                        value={huntToAdd.name}
                        className="w-[70%]"
                        type="text"
                        label="Hunt Name"
                        placeholder="Enter Hunt Name"
                        onChange={(e) => {
                            setHuntToAdd((prev) => {
                                const find = breweryQuery.data?.data.data.find((j: any) => j.name == e)
                                return ({
                                    ...prev,
                                    name:e.target.value
                                })
                            })
                        }}
                        labelPlacement="outside"
                        classNames={{ label: "!font-semibold" }}
                    />
                    <Textarea
                        value={huntToAdd.description}
                        label="Hunt Description"
                        placeholder="Write description..."
                        onChange={(e) => {
                            setHuntToAdd((prev) => {
                                const find = breweryQuery.data?.data.data.find((j: any) => j.name == e)
                                return ({
                                    ...prev,
                                    description: e.target.value
                                })
                            })
                        }}
                        className="w-[70%]"
                        labelPlacement="outside"
                        size="lg"
                        minRows={5}
                        classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                    />
                    <Autocomplete
                        className="w-[70%] font-semibold"
                        variant="flat"
                        isLoading={breweryQuery.isLoading}
                        defaultItems={(breweryQuery.data?.data.data ? breweryQuery.data?.data.data : [{ name: "",_id:"" }] as any)}
                        label="Brewery Name"
                        labelPlacement="outside"
                        placeholder="Select a Brewery"
                        defaultSelectedKey={huntToAdd.brewery}
                        scrollRef={scrollerRef}
                        onSelectionChange={(e) => {
                            setHuntToAdd((prev:any) => {
                                // const find = breweryQuery.data?.data.data.find((j: any) => j.name == e)
                                return ({
                                    ...prev,
                                    brewery: e
                                })
                            })
                            // console.log(e)
                        }}
                        // selectionMode="single"
                        // classNames={{}}
                        onOpenChange={setIsOpen}
                    >
                        {(item: any) => (
                            <AutocompleteItem key={item._id} className="capitalize">
                                {item.name}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                </div>
                <h1 className="font-semibold">Create Riddles</h1>
                {huntToAdd.riddles.map((e,index:number) =>
                    <div className="w-[70%] flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                        <div className="flex gap-4">
                           
                            <Input
                                value={e.title}
                                onChange={(j) => {
                                    const value = j.target.value
                                    const find = huntToAdd.riddles.find((e, index1) => index1 == index)
                                    find!.title = value
                                    const newRiddles = huntToAdd.riddles.map((k,index1) => {
                                        if (index1 == index) {
                                            return find
                                        }
                                        return k
                                    })
                                    setHuntToAdd((prev:any) => {
                                        return (
                                            {
                                                ...prev,
                                                riddles:newRiddles
                                            }
                                        )
                                    })
                                }}
                                className="w-full"
                                type="text"
                                label="Title "
                                placeholder="Enter Riddle Title"
                                labelPlacement="outside"
                                classNames={{ label: "!font-semibold" }}
                            />
                        </div>
                        <Textarea
                            value={e.description}
                            label="Description"
                            placeholder="Write description..."
                            onChange={(j) => {
                                const value = j.target.value
                                const find = huntToAdd.riddles.find((e, index1) => index1 == index)
                                find!.description = value
                                const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                    if (index1 == index) {
                                        return find
                                    }
                                    return k
                                })
                                setHuntToAdd((prev: any) => {
                                    return (
                                        {
                                            ...prev,
                                            riddles: newRiddles
                                        }
                                    )
                                })
                            }}
                            className="w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={10}
                            classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                        />
                        <div className="flex gap-4">
                            <Textarea
                                onChange={(j) => {
                                    const value = j.target.value
                                    const find = huntToAdd.riddles.find((e, index1) => index1 == index)
                                    find!.reward = value
                                    const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                        if (index1 == index) {
                                            return find
                                        }
                                        return k
                                    })
                                    setHuntToAdd((prev: any) => {
                                        return (
                                            {
                                                ...prev,
                                                riddles: newRiddles
                                            }
                                        )
                                    })
                                }}
                                value={e.reward}
                                label="Reward"
                                placeholder="Write Reward..."
                                className="w-full"
                                labelPlacement="outside"
                                size="lg"
                                minRows={5}
                                classNames={{ description: "!h-[5rem]", label: "!font-semibold" }}
                            /> <Textarea
                                value={e.hint}
                                label="Hint"
                                onChange={(j) => {
                                    const value = j.target.value
                                    const find = huntToAdd.riddles.find((e, index1) => index1 == index)
                                    find!.hint = value
                                    const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                        if (index1 == index) {
                                            return find
                                        }
                                        return k
                                    })
                                    setHuntToAdd((prev: any) => {
                                        return (
                                            {
                                                ...prev,
                                                riddles: newRiddles
                                            }
                                        )
                                    })
                                }}
                                placeholder="Write Hint..."
                                className="w-full"
                                labelPlacement="outside"
                                size="lg"
                                minRows={5}
                                classNames={{ description: "!h-[5rem]", label: "!font-semibold" }}
                            />
                        </div>
                        {index != 0 && <button onClick={() => {
                            const oldRiddles = huntToAdd.riddles.filter((j, index1) => index1 != index)
                            setHuntToAdd((prev) => {
                                return (
                                    {
                                        ...prev,
                                        riddles: oldRiddles
                                    }
                                )
                            })
                            // setCreateRiddle(!createRiddle)
                            // onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Delete Riddle</button>}
                        {/* <button onClick={() => {
                            // setCreateRiddle(!createRiddle)
                            // onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max">Save</button> */}
                    </div>
                )}
                <div className="flex gap-4">
                    <button onClick={() => {
                        const oldRiddles = huntToAdd.riddles
                        setHuntToAdd((prev) => {
                            return (
                                {
                                    ...prev,
                                    riddles: [
                                        ...oldRiddles,
                                        {
                                            title: "",
                                            description: "",
                                            reward: "",
                                            hint: ""
                                        }
                                    ]
                                }
                            )
                        })
                        // setCreateRiddle(!createRiddle)
                        // onOpen1()
                    }} className="px-16 py-2 bg-[#A92223] rounded text-white w-full ">Add More Riddles</button>
                    <button onClick={buttonSubmit} className="px-16 py-2 bg-[#A92223] rounded text-white w-full ">Submit</button>
                </div>
                {/* <button onClick={() => {
                    // setCreateRiddle(!createRiddle)
                    // onOpen1()
                }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Add More Riddles</button>
                <button onClick={() => {
                    // setCreateRiddle(!createRiddle)
                    // onOpen1()
                }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Submit</button> */}
            </div>

            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
                onClose={() => {
                    navigate.push('/admin/manage-hunts')
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Hunt Created Successfully</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Riddles have been created successfully & QR Code is generated</p>
                                {/* <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}