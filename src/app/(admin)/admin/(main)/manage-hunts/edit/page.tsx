'use client'
import axiosInstance from "@/app/utils/axiosInstance";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
export default function EditHunts(data: any) {
    // console.log(data.searchParams.id)
    const [message,setMessage]=useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [huntToAdd, setHuntToAdd] = useState<any>()
    const [newRiddless, setNewRiddles]=useState<any>(null)
    const queryClient = useQueryClient()
    // const[newRiddles,setNewRiddles]=useState<any>()
    const updateHunts = useMutation((datas: any) => axiosInstance.put(`/riddle/api/hunt?huntId=${data.searchParams.id}`, datas), {
        onSuccess(data) {
            console.log('checkkkk')
            console.log('update hunts', data.data)
            // setEditRiddle(!editRiddle)
            queryClient.invalidateQueries('hunts')
        },
        onError(error: any) {
            if (typeof (error.response.data.message) == 'string') {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            else {
                toast.error(error.response.data.message.join(','), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        },
    })

    const huntsQuery = useQuery(['individualhunts', data.searchParams.id], ({ queryKey }) => {
        return axiosInstance.get(`/riddle/api/hunt?huntId=${queryKey[1]}`)
    }, {
        onSuccess(data) {
            console.log(data)
            const huntsData = {
                name: data.data.data.name,
                description: data.data.data.description,
                // brewery: data.data.data.brewery._id,
                riddles:[]
            }
            const riddlesToAdd = data.data.data.riddles.map((e:any) => {
                return (
                    {
                        title: e.title,
                        description: e.description,
                        reward: e.reward,
                        hint:e.hint
                    }
                )
            })
            huntsData.riddles=riddlesToAdd
            setHuntToAdd(huntsData)
        },
        onError(err) {
            console.log(err)
        },
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

    function onLoadMore() {
        setPage((prev) => prev + 1)
    }
    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
        onLoadMore,
    });

    console.log('current', huntToAdd)

    function buttonSubmit() {
        const filterRiddlesOld = huntToAdd.riddles.filter((e:any) => {
            if (e.description && e.hint && e.reward && e.title) {
                return e
            }
        })
        const filterRiddlesNew = newRiddless?.filter((e: any) => {
            if (e.description && e.hint && e.reward && e.title) {
                return e
            }
        })
        const findRiddlesOld = huntToAdd.riddles.find((e:any) => {
            if (e.description == '' || e.hint == '' || e.reward == '' || e.title == '') {
                return e
            }
        })
        const findRiddlesNew = newRiddless?.find((e: any) => {
            if (e.description == '' || e.hint == '' || e.reward == '' || e.title == '') {
                return e
            }
        })

        console.log('findnew f')
        // if (!findRiddlesOld && !findRiddlesNew) {
            
        // }
        // else {
        //     setMessage('Please Fill All The Info To Add A New Hunt')
        // }

        if (!newRiddless) {
            // setMessage('')
            const addHuntData = {
                ...huntToAdd,
                riddles: [
                    ...filterRiddlesOld,
                ]
            }
            updateHunts.mutate(addHuntData)
        }
        else {
            // setMessage('')
            const addHuntData = {
                ...huntToAdd,
                riddles: [
                    ...filterRiddlesOld,
                    ...filterRiddlesNew
                ]
            }
            updateHunts.mutate(addHuntData)
        }
    }
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Edit Hunt</p>
            </div>
            {message && <p className="text-red-600 text-center">{message}</p>}
            <div className=" flex flex-col items-start gap-4 pb-4 border-[0.1rem] rounded-lg">
                <div className=" border-[0.1rem] p-4 flex w-full flex-col gap-4 rounded-lg">
                    <div className="flex flex-col gap-4">
                        <Input
                            value={huntToAdd?.name}
                            className="sm:w-[70%] w-full"
                            type="text"
                            isInvalid={huntToAdd?.name == ''}
                            errorMessage="Please Enter Hunt Name"
                            label="Hunt Name"
                            placeholder="Enter Hunt Name"
                            onChange={(e) => {
                                setHuntToAdd((prev:any) => {
                                    return ({
                                        ...prev,
                                        name: e.target.value
                                    })
                                })
                            }}
                            labelPlacement="outside"
                            classNames={{ label: "!font-semibold" }}
                        />
                        <Textarea
                            value={huntToAdd?.description}
                            label="Hunt Description"
                            isInvalid={huntToAdd?.description == ''}
                            errorMessage="Please Enter Hunt Description"
                            placeholder="Write description..."
                            onChange={(e) => {
                                setHuntToAdd((prev:any) => {
                                    // const find = breweryQuery.data?.data.data.find((j: any) => j.name == e)
                                    return ({
                                        ...prev,
                                        description: e.target.value
                                    })
                                })
                            }}
                            className="sm:w-[70%] w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={5}
                            classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                        />
                        <Input
                            disabled
                            value={huntsQuery.data?.data.data.brewery.name}
                            className="sm:w-[70%] w-full"
                            type="text"
                            label="Brewery Name"
                            placeholder="Enter Hunt Name"
                            onChange={(e) => {
                                setHuntToAdd((prev: any) => {
                                    return ({
                                        ...prev,
                                        name: e.target.value
                                    })
                                })
                            }}
                            labelPlacement="outside"
                            classNames={{ label: "!font-semibold" }}
                        />
                        {/* <Autocomplete
                            className="w-[70%] font-semibold"
                            variant="flat"
                            disabled
                            isLoading={breweryQuery.isLoading}
                            items={(breweryQuery.data?.data.data ? breweryQuery.data?.data.data : [{ name: "", _id: "" }] as any)}
                            label="Brewery Name"
                            labelPlacement="outside"
                            placeholder="Select a Brewery"
                            selectedKey={huntToAdd?.brewery}
                            scrollRef={scrollerRef}
                            onSelectionChange={(e) => {
                                setHuntToAdd((prev: any) => {
                                    // const find = breweryQuery.data?.data.data.find((j: any) => j.name == e)
                                    return ({
                                        ...prev,
                                        brewery: e
                                    })
                                })
                                console.log(e)
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
                        </Autocomplete> */}
                    </div>
                    {/* <h1 className="font-semibold">Create Riddles</h1> */}
                    {huntToAdd?.riddles.map((e:any, index: number) =>
                        <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                            <div className="flex gap-4">

                                <Input
                                    value={e.title}
                                    isInvalid={e.title == ''}
                                    errorMessage="Please Enter Riddle Title"
                                    onChange={(j) => {
                                        const value = j.target.value
                                        const find = huntToAdd.riddles.find((e:any, index1:number) => index1 == index)
                                        find!.title = value
                                        const newRiddles = huntToAdd.riddles.map((k:any, index1:number) => {
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
                                isInvalid={e.description == ''}
                                errorMessage="Please Enter Riddle Description"
                                placeholder="Write description..."
                                onChange={(j) => {
                                    const value = j.target.value
                                    const find = huntToAdd.riddles.find((e:any, index1:number) => index1 == index)
                                    find!.description = value
                                    const newRiddles = huntToAdd.riddles.map((k:any, index1:number) => {
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
                                        const find = huntToAdd.riddles.find((e:any, index1:number) => index1 == index)
                                        find!.reward = value
                                        const newRiddles = huntToAdd.riddles.map((k:any, index1:number) => {
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
                                    isInvalid={e.reward == ''}
                                    errorMessage="Please Enter Riddle Reward"
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
                                    isInvalid={e.hint == ''}
                                    errorMessage="Please Enter Riddle Hint"
                                    onChange={(j) => {
                                        const value = j.target.value
                                        const find = huntToAdd.riddles.find((e:any, index1:number) => index1 == index)
                                        find!.hint = value
                                        const newRiddles = huntToAdd.riddles.map((k:any, index1:number) => {
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
                            {<button onClick={() => {
                                const oldRiddles = huntToAdd.riddles.filter((j:any, index1:number) => index1 != index)
                                setHuntToAdd((prev:any) => {
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
                    {newRiddless?.map((e: any, index: number) =>
                        <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                            <div className="flex gap-4">

                                <Input
                                    value={e.title}
                                    isInvalid={e.title == ''}
                                    errorMessage="Please Enter Riddle Title"
                                    onChange={(j) => {
                                        const value = j.target.value
                                        const find = newRiddless.find((e: any, index1: any) => index1 == index)
                                        find!.title = value
                                        const newRiddles = newRiddless.map((k: any, index1: any) => {
                                            if (index1 == index) {
                                                return find
                                            }
                                            return k
                                        })
                                        setNewRiddles(newRiddles)
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
                                isInvalid={e.description == ''}
                                errorMessage="Please Enter Riddle Description"
                                label="Description"
                                placeholder="Write description..."
                                onChange={(j) => {
                                    const value = j.target.value
                                    const find = newRiddless.find((e: any, index1: any) => index1 == index)
                                    find!.description = value
                                    const newRiddles = newRiddless.map((k: any, index1: any) => {
                                        if (index1 == index) {
                                            return find
                                        }
                                        return k
                                    })
                                    setNewRiddles(newRiddles)
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
                                        const find = newRiddless.find((e: any, index1: any) => index1 == index)
                                        find!.reward = value
                                        const newRiddles = newRiddless.map((k: any, index1: any) => {
                                            if (index1 == index) {
                                                return find
                                            }
                                            return k
                                        })
                                        setNewRiddles(newRiddles)
                                    }}
                                    value={e.reward}
                                    isInvalid={e.reward == ''}
                                    errorMessage="Please Enter Riddle Reward"
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
                                    isInvalid={e.hint == ''}
                                    errorMessage="Please Enter Riddle Hint"
                                    onChange={(j) => {
                                        const value = j.target.value
                                        const find = newRiddless.find((e: any, index1: any) => index1 == index)
                                        find!.hint = value
                                        const newRiddles = newRiddless.map((k: any, index1: any) => {
                                            if (index1 == index) {
                                                return find
                                            }
                                            return k
                                        })
                                        setNewRiddles(newRiddles)
                                    }}
                                    placeholder="Write Hint..."
                                    className="w-full"
                                    labelPlacement="outside"
                                    size="lg"
                                    minRows={5}
                                    classNames={{ description: "!h-[5rem]", label: "!font-semibold" }}
                                />
                            </div>
                            <button onClick={() => {
                                const oldRiddles = newRiddless.filter((j: any, index1: any) => index1 != index)
                                setNewRiddles(oldRiddles)
                                
                                // setCreateRiddle(!createRiddle)
                                // onOpen1()
                            }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Delete Riddle</button>
                            {/* <button onClick={() => {
                            // setCreateRiddle(!createRiddle)
                            // onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max">Save</button> */}
                        </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => {
                            // const oldRiddles = N.riddles
                            setNewRiddles((prev: any) => {
                                if(prev){
                                    return (
                                        [
                                            ...prev,
                                            {
                                                title: "",
                                                description: "",
                                                reward: "",
                                                hint: ""
                                            }
                                        ]
                                    )
                                }
                                else {
                                    return (
                                        [
                                            {
                                                title: "",
                                                description: "",
                                                reward: "",
                                                hint: ""
                                            }
                                        ]
                                    )
                                }
                                
                            })
                            // setCreateRiddle(!createRiddle)
                            // onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Add More Riddles</button>
                        <button onClick={buttonSubmit} className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{updateHunts.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Update Hunt"}</button>
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
                {/* <button onClick={() => {
                    updateHunts.mutate(riddleToEdit)
                }} className="px-16  w-full py-2 bg-[#A92223]  rounded text-white">{updateHunts.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Update Riddles"}</button> */}
            </div>
        </>
    )
}