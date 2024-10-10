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
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import { IoText } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
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
            console.log('checkkkk')
            console.log('update hunts', data.data)
            // setEditRiddle(!editRiddle)
            setNewRiddles(null)
            queryClient.invalidateQueries('hunts')
            queryClient.invalidateQueries('individualhunts')
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

    const deleteFileMutation=useMutation((file:string)=>axiosInstance.delete(`/file?fileName=${file}`))

    return (
        <>
            {/*<div className="flex justify-between">*/}
            {/*    <p className="text-xl font-semibold">Edit Hunt</p>*/}
            {/*</div>*/}
            {message && <p className="text-red-600 text-center">{message}</p>}
            {/*<div className=" flex flex-col items-start gap-4 pb-4 border-[0.1rem] rounded-lg">*/}
            {/*    <div className=" border-[0.1rem] p-4 flex w-full flex-col gap-[3rem] rounded-lg">*/}
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
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-4">
                        <h1 className="font-semibold">Edit Riddles</h1>
                        {huntToAdd?.riddles.map((e: any, index: number) =>
                        <>
                        <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                                <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Title</p>
                            <ReactQuill  placeholder="Enter Riddle Title" value={e.title} onChange={(j) => {
                                            const value = j;
                                            const find = huntToAdd.riddles.find((e: any, index1: number) => index1 == index)
                                            find!.title = value
                                            const newRiddles = huntToAdd.riddles.map((k: any, index1: number) => {
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
                                        }} theme="snow" />

                            </div>
                            {/* <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Description</p>
                            <ReactQuill placeholder="Write description..." value={e.description} onChange={(j) => {
                                        const value = j
                                        const find = huntToAdd.riddles.find((e: any, index1: number) => index1 == index)
                                        find!.description = value
                                        const newRiddles = huntToAdd.riddles.map((k: any, index1: number) => {
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
                                    }} theme="snow" />
                                
                            </div> */}
                            <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Description</p>
                            <div className="flex flex-col gap-2 min-h-[10rem] bg-[#f4f4f5] rounded-lg gap-4 p-4">
                            {
                                    e.description.map((k:any,inde:number)=>{
                                        console.log('index',index)
                                        if(k.type==1){
                                            return <div className="flex gap-4 justify-between">
                                                <Input value={k.text} onChange={(l)=>{
                                                        const findRiddle=huntToAdd.riddles.find((e:any,ind:number)=>ind==index)
                                                        const findDescription=findRiddle?.description.find((k:any,ind:number)=>ind==inde) as any
                                                        findDescription!.text=l.target.value
                                                        const newDescription=findRiddle?.description.map((k:any,ind:number)=>{
                                                            if(ind==inde){
                                                                return findDescription
                                                            }
                                                            return k
                                                        })
                                                        const newRiddles=huntToAdd.riddles.map((j:any,ind:number)=>{
                                                            if(ind==index){
                                                                return {
                                                                    ...findRiddle,
                                                                    description:newDescription
                                                                }
                                                            }
                                                            return j
                                                        })
                                                        setHuntToAdd((prev:any)=>{
                                                            return {
                                                                ...prev,
                                                                riddles:newRiddles
                                                            }
                                                        })


                                            }}/>
                                            <AiOutlineDelete onClick={()=>{
                                                const findRiddle=huntToAdd.riddles.find((e:any,ind:number)=>ind==index)
                                                const findDescription=findRiddle?.description.filter((k:any,ind:number)=>ind!=inde) as any
                                                const newRiddles=huntToAdd.riddles.map((j:any,ind:number)=>{
                                                    if(ind==index){
                                                        return {
                                                            ...findRiddle,
                                                            description:findDescription
                                                        }
                                                    }
                                                    return j
                                                })
                                                setHuntToAdd((prev:any)=>{
                                                    return {
                                                        ...prev,
                                                        riddles:newRiddles
                                                    }
                                                })
                                            }} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 "/>
                                            </div>
                                        }
                                        return <div className="flex gap-4 justify-between items-center">
                                            <Image src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${k.media}`} alt="riddleImage" width={200} height={200}/>
                                            <AiOutlineDelete onClick={()=>{
                                                const findRiddle=huntToAdd.riddles.find((e:any,ind:number)=>ind==index)
                                                const findDescriptionToRemoveFromFiles=findRiddle?.description.find((k:any,ind:number)=>ind==inde) as any
                                                deleteFileMutation.mutate(k.media)
                                                // console.log(findDescriptionToRemoveFromFiles)
                                                // setAllImageFiles(allImageFiles.filter((l:any)=>l.blob!=findDescriptionToRemoveFromFiles.text))
                                                const findDescription=findRiddle?.description.filter((k:any,ind:number)=>ind!=inde) as any
                                                const newRiddles=huntToAdd.riddles.map((j:any,ind:number)=>{
                                                    if(ind==index){
                                                        return {
                                                            ...findRiddle,
                                                            description:findDescription
                                                        }
                                                    }
                                                    return j
                                                })
                                                setHuntToAdd((prev:any)=>{
                                                    return {
                                                        ...prev,
                                                        riddles:newRiddles
                                                    }
                                                })
                                            }} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 "/>
                                        </div>
                                    })
                                }
                                {e.description.length<5 && <div className="flex gap-2 items-center">
                                <Button onClick={()=>{
                                    const findRiddle=huntToAdd.riddles.find((e:any,ind:number)=>ind==index)
                                    const newRiddles=huntToAdd.riddles.map((j:any,ind:number)=>{
                                        if(ind==index){
                                            return {
                                                ...findRiddle,
                                                isOpen:!(findRiddle!.isOpen)
                                                // description:newDescription
                                            }
                                        }
                                        return j
                                    })
                                    setHuntToAdd((prev:any)=>{
                                        return {
                                            ...prev,
                                            riddles:newRiddles
                                        }
                                    })
                                }} className="bg-[#A92223] w-max min-w-max h-max px-2 py-1 rounded-full text-white">+</Button>
                                <div className={`${e.isOpen?"flex":"hidden"} gap-4 bg-white p-2 rounded-full`}>
                                    <Button onClick={()=>{
                                        const findRiddle=huntToAdd.riddles.find((e:any,ind:number)=>ind==index)
                                        // console.log('text index',index)
                                        const newDescription=[
                                            ...findRiddle!.description,
                                            {type:1,text:""}
                                        ]
                                        const newRiddles=huntToAdd.riddles.map((j:any,ind:number)=>{
                                            if(ind==index){
                                                return {
                                                    ...findRiddle,
                                                    description:newDescription
                                                }
                                            }
                                            return j
                                        })
                                        setHuntToAdd((prev:any)=>{
                                            return {
                                                ...prev,
                                                riddles:newRiddles
                                            }
                                        })
                                    }} className=" bg-gray-100 w-max min-w-max h-max px-2 py-1 text-[#A92223]"><IoText /></Button>
                                    <Button key={index} className="bg-gray-100 w-max min-w-max h-max px-2 py-1 text-[#A92223] relative">
                                    <label htmlFor={`images${index}`} ><FaImage /></label>
                                    <input accept=".jpeg,.png,.jpg" type="file" onChange={async (p)=>{
                                        if (p.target.files && p.target.files.length > 0) {
                                            const file = p.target.files[0];
                                            const formData=new FormData()
                                            formData.append('file',file)
                                            // const blob=URL.createObjectURL(file)
                                            // setAllImageFiles((prev:any)=>[...prev,{file:file,blob}]);
                                            const findRiddlee=huntToAdd.riddles.find((g:any,ind:number)=>ind==index)
                                            const uploadFile=await axiosInstance.postForm('/file',formData)
                                            // console.log('uploadddd',)
                                            // console.log(huntToAdd.riddles,'found riddle',findRiddlee,`index is ${index}`)
                                        const newDescriptionn=[
                                            ...findRiddlee!.description,
                                            {type:2,media:uploadFile.data.data.file}
                                        ]
                                        const newRiddless=huntToAdd.riddles.map((j:any,ind:number)=>{
                                            if(ind==index){
                                                return {
                                                    ...findRiddlee,
                                                    description:newDescriptionn
                                                }
                                            }
                                            return j
                                        })
                                        setHuntToAdd((prev:any)=>{
                                            return {
                                                ...prev,
                                                riddles:newRiddless
                                            }
                                        })
                                        }
                                    }} className="absolute invisible" id={`images${index}`} />
                                    </Button>
                                </div>
                                </div>}
                                
                            </div>
                            {!e.description.length && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter Description</p>}

                          
                                
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 h-auto">
                                                        <p className="font-semibold text-sm">{e.hasReward?"Reward":"Text"}</p>
                                                        <ReactQuill placeholder="Write Reward..." value={e.reward} onChange={(j) => {
                                            const value = j
                                            const find = huntToAdd.riddles.find((e: any, index1: number) => index1 == index)
                                            find!.reward = value
                                            const newRiddles = huntToAdd.riddles.map((k: any, index1: number) => {
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
                                        }} theme="snow" />
                                                            
                                </div>
                                <div className="flex flex-col gap-2 h-auto">
                                <p className="font-semibold text-sm">Hint</p>
                                <ReactQuill placeholder="Write Hint..." value={e.hint}  onChange={(j) => {
                                            const value = j
                                            const find = huntToAdd.riddles.find((e: any, index1: number) => index1 == index)
                                            find!.hint = value
                                            const newRiddles = huntToAdd.riddles.map((k: any, index1: number) => {
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
                                        }} theme="snow" />
                                    
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                            <p className="font-semibold text-sm">Is Hunt Active</p>
                            <Switch isSelected={e.hasReward} onValueChange={(j) => {
                                        const value = j
                                        const find = huntToAdd.riddles.find((e: any, index1: number) => index1 == index)
                                        find!.hasReward = value
                                        const newRiddles = huntToAdd.riddles.map((k: any, index1: number) => {
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
                                    }} value={e.hasReward}/>
                        </div>
                                
                                {<button onClick={() => {
                                    const oldRiddles = huntToAdd.riddles.filter((j: any, index1: number) => index1 != index)
                                    setHuntToAdd((prev: any) => {
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
                        </>
                        )}
                        {newRiddless?.map((e: any, index: number) =>
                            <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                                <div className="flex gap-4">

                                    <Input
                                        value={e.title}
                                        isInvalid={e.title == '' && error}
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
                                    isInvalid={e.description == '' && error}
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
                                        isInvalid={e.reward == '' && error}
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
                                        isInvalid={e.hint == '' && error}
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
                    </div>
                    {/* <h1 className="font-semibold">Create Riddles</h1> */}


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
                {/*</div>*/}
                {/* <button onClick={() => {
                    updateHunts.mutate(riddleToEdit)
                }} className="px-16  w-full py-2 bg-[#A92223]  rounded text-white">{updateHunts.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Update Riddles"}</button> */}
            {/*</div>*/}
        </>
    )
}