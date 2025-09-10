'use client'
import axiosInstance from "@/app/utils/axiosInstance";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Switch, Textarea, useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
// import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";
import EditRiddle from "@/components/admin/layout/edit-riddle";
import EditNewRiddle from "@/components/admin/layout/edit-new-riddle";
const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];  
export default function EditHunts(data: any) {
    // console.log(data.searchParams.id)
    const [isActive,setIsActive]=useState(true)
    const [message,setMessage]=useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [huntToAdd, setHuntToAdd] = useState<any>()
    const [newRiddless, setNewRiddles]=useState<any>(null)
    const queryClient = useQueryClient()
    const [error,setError]=useState(false)
    // const[newRiddles,setNewRiddles]=useState<any>()
    const updateHunts = useMutation((datas: any) => axiosInstance.put(`/hunt?huntId=${data.searchParams.id}`, datas), {
        onSuccess(data) {
            // console.log('checkkkk')
            console.log('update hunts', data.data)
            // setEditRiddle(!editRiddle)
            // setNewRiddles(null)
            // const huntsData = {
            //     name: data.data.data.name,
            //     description: data.data.data.description,
            //     brewery:data.data.data.brewery._id,
            //     // brewery: data.data.data.brewery._id,
            //     riddles:[]
            // }
            const riddlesToAdd = data.data.data.riddles.map((e:any) => {
                return (
                    {
                        riddleId:e._id,
                        title: e.title,
                        description: e.description,
                        reward: e.reward,
                        hint:e.hint,
                        hasReward:e.hasReward
                    }
                )
            })
            const huntData=riddlesToAdd.map((e:any)=>{
                const found=huntToAdd.riddles.find((j:any)=>j.riddleId==e.riddleId)
                if(!found){
                    return e
                }
                return found
            })
            const newHuntData={
                ...huntToAdd,
                riddles:huntData
            }
            // huntsData.riddles=riddlesToAdd
            setHuntToAdd(newHuntData)
            // setIsActive(data.data.data.isActive)
            queryClient.invalidateQueries('hunts')
            // queryClient.invalidateQueries('individualhunts')
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
                toast.error(error.response.data.message[0], {
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
        return axiosInstance.get(`/hunt?huntId=${queryKey[1]}`)
    }, {
        refetchOnWindowFocus:false,
        onSuccess(data) {
            console.log(data)
            const huntsData = {
                name: data.data.data.name,
                description: data.data.data.description,
                brewery:data.data.data.brewery._id,
                // brewery: data.data.data.brewery._id,
                riddles:[]
            }
            const riddlesToAdd = data.data.data.riddles.map((e:any) => {
                return (
                    {
                        riddleId:e._id,
                        title: e.title,
                        description: e.description,
                        reward: e.reward,
                        hint:e.hint,
                        hasReward:e.hasReward
                    }
                )
            })
            huntsData.riddles=riddlesToAdd
            setHuntToAdd(huntsData)
            setIsActive(data.data.data.isActive)
        },
        onError(err) {
            console.log(err)
        },
    })

    const breweryQuery = useQuery(['breweries', page], ({ queryKey }) => {
        return axiosInstance.get(`/brewery/all?page=${queryKey[1]}&limit=20`)
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
        const filterRiddlesOld = huntToAdd.riddles?.filter((e:any) => {
            if (e.description || e.hint || e.reward || e.title) {
                return e
            }
        })
        const filterRiddlesNew = newRiddless?.filter((e: any) => {
            if (e.description || e.hint || e.reward || e.title) {
                return e
            }
        })
        const findRiddlesOld = huntToAdd.riddles?.filter((e:any) => {
            if (e.description == '' || e.hint == '' || e.reward == '' || e.title == '') {
                return e
            }
        })
        const findRiddlesNew = newRiddless?.filter((e: any) => {
            if (e.description == '' || e.hint == '' || e.reward == '' || e.title == '') {
                return e
            }
        })

        // console.log('findnew f')
        // if (!findRiddlesOld && !findRiddlesNew) {

        // }
        // else {
        //     setMessage('Please Fill All The Info To Add A New Hunt')
        // }
        console.log(findRiddlesNew, findRiddlesOld)
        if ((findRiddlesNew?findRiddlesNew.length!= 0:false || findRiddlesOld?.length != 0) || huntToAdd.name == '' || huntToAdd.description == '') {
            setError(true)
        }
        else {
            console.log('im here')
            setError(false)
            if (!newRiddless) {
                // setMessage('')
                const addHuntData = {
                    ...huntToAdd,
                    isActive,
                    riddles: [
                        ...filterRiddlesOld.map((e:any)=>{
                            return {
                                description:e.description,
                                hint:e.hint,
                                hasReward:e.hasReward,
                                reward:e.reward,
                                title:e.title
                            }
                        }),
                    ]
                }
                console.log('dataaaa1',addHuntData)

                updateHunts.mutate(addHuntData)
            }
            else {
                // setMessage('')
                const addHuntData = {
                    ...huntToAdd,
                    isActive,
                    riddles: [
                        ...filterRiddlesOld.map((e:any)=>{
                            return {
                                description:e.description,
                                hint:e.hint,
                                hasReward:e.hasReward,
                                reward:e.reward,
                                title:e.title
                            }
                        }),
                        ...filterRiddlesNew.map((e:any)=>{
                            return {
                                description:e.description,
                                hint:e.hint,
                                hasReward:e.hasReward,
                                reward:e.reward,
                                title:e.title
                            }
                        })
                    ]
                }

                console.log('dataaaa2',addHuntData)
                updateHunts.mutate(addHuntData)
            }
        }
    }

    return (
        <>
            
            {message && <p className="text-red-600 text-center">{message}</p>}
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">Hunt Details</p>
                        <div className="flex flex-col gap-4 rounded-lg sm:w-[70%] w-full border-[0.1rem] p-4">
                            <Input
                                value={huntToAdd?.name}
                                className="sm:w-[70%] w-full"
                                type="text"
                                isInvalid={huntToAdd?.name == '' && error}
                                errorMessage="Please Enter Hunt Name"
                                label="Hunt Name"
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
                            <Textarea
                                value={huntToAdd?.description}
                                label="Hunt Description"
                                isInvalid={huntToAdd?.description == '' && error}
                                errorMessage="Please Enter Hunt Description"
                                placeholder="Write description..."
                                onChange={(e) => {
                                    setHuntToAdd((prev: any) => {
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
                                label="Location Name"
                                placeholder="Enter Location Name"
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
                            <div className="flex flex-col gap-2">
                            <p className="font-semibold text-sm">Is Hunt Active</p>
                            <Switch isSelected={isActive} onValueChange={(value)=>setIsActive(value)} defaultSelected/>
                        </div>
                        <button onClick={()=>{
                            const data={
                                name:huntToAdd.name,
                                brewery:huntToAdd.brewery,
                                description:huntToAdd.description,
                                isActive
                            }
                            updateHunts.mutate(data)
                        }} className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{updateHunts.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Update Hunt"}</button>

                        </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-4">
                        <h1 className="font-semibold">Edit Riddles</h1>
                        {huntToAdd?.riddles.map((e: any, index: number) =>
                        <>
                        <EditRiddle  index={index}  item={e} setHuntToAdd={setHuntToAdd} huntToAdd={huntToAdd} huntId={data.searchParams.id} />
                        </>
                        )}
                        {newRiddless?.map((e: any, index: number) =>
                            <EditNewRiddle  setNewRiddles={setNewRiddles} newRiddless={newRiddless} index={index}  item={e} setHuntToAdd={setHuntToAdd} huntToAdd={huntToAdd} huntId={data.searchParams.id}/>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => {
                            setNewRiddles((prev: any) => {
                                if(prev){
                                    return (
                                        [
                                            ...prev,
                                            {
                                                title: "",
                                                description: [],
                                                reward: "",
                                                hint: "",
                                                hasReward:true
                                            }
                                        ]
                                    )
                                }
                                else {
                                    return (
                                        [
                                            {
                                                title: "",
                                                description: [],
                                                reward: "",
                                                hint: "",
                                                hasReward:true
                                            }
                                        ]
                                    )
                                }

                            })
                        }} className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Add More Riddles</button>
                    </div>
                    
        </>
    )
}