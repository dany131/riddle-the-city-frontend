'use client'

import axiosInstance from "@/app/utils/axiosInstance";
import { Button, Switch } from "@nextui-org/react";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { IoText } from "react-icons/io5";
import { useMutation } from "react-query";
import ReactQuill from "react-quill-new";
import { toast } from "react-toastify";


export default function EditRiddle({setHuntToAdd,huntToAdd,index,error,huntId,item,setError}:{setHuntToAdd:any,huntToAdd:any,index:number,error:any,huntId:string,item:any,setError:any}
){
    const deleteFileMutation=useMutation((file:string)=>axiosInstance.delete(`/file?fileName=${file}`))
    const deleteRiddle=useMutation((riddleId:string)=>axiosInstance.delete(`/hunt/riddle?huntId=${huntId}&riddleId=${riddleId}`),{
        onSuccess(data, variables, context) {
            console.log('deleted riddle',data)
        },
    })
    const updateRiddle=useMutation((datas:any)=>{
        return axiosInstance.put(`/hunt/riddle?huntId=${huntId}`,datas)
    },{
        onSuccess(data) {
            console.log('update data',data)
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
    return (
        <>
         <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                                <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Title</p>
                            <ReactQuill  placeholder="Enter Riddle Title" value={item.title} onChange={(j) => {
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
                            <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Description</p>
                            <div className="flex flex-col gap-2 min-h-[10rem] bg-[#f4f4f5] rounded-lg gap-4 p-4">
                            {
                                    item.description.map((k:any,inde:number)=>{
                                        console.log('index',index)
                                        if(k.type==1){
                                            return <div className="flex gap-4 justify-between">
                                                 <ReactQuill className="w-full" placeholder="" value={k.text} onChange={(l)=>{
                                                        const findRiddle=huntToAdd.riddles.find((e:any,ind:number)=>ind==index)
                                                        const findDescription=findRiddle?.description.find((k:any,ind:number)=>ind==inde) as any
                                                        findDescription!.text=l
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


                                            }} theme="snow" />
                                                
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
                                {item.description.length<5 && <div className="flex gap-2 items-center">
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
                                <div className={`${item.isOpen?"flex":"hidden"} gap-4 bg-white p-2 rounded-full`}>
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
                            {!item.description.length && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter Description</p>}

                          
                                
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 h-auto">
                                                        <p className="font-semibold text-sm">{item.hasReward?"Reward":"Text"}</p>
                                                        <ReactQuill placeholder="Write Reward..." value={item.reward} onChange={(j) => {
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
                                <ReactQuill placeholder="Write Hint..." value={item.hint}  onChange={(j) => {
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
                            <p className="font-semibold text-sm">Has Reward</p>
                            <Switch isSelected={item.hasReward} onValueChange={(j) => {
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
                                    }} value={item.hasReward}/>
                        </div>
                                <div className="flex flex-wrap gap-4">
                                <Button isLoading={deleteRiddle.isLoading} isDisabled={deleteRiddle.isLoading} onClick={() => {
                                    const oldRiddles = huntToAdd.riddles.filter((j: any, index1: number) => index1 != index)
                                    setHuntToAdd((prev: any) => {
                                        return (
                                            {
                                                ...prev,
                                                riddles: oldRiddles
                                            }
                                        )
                                    })
                                    
                                    deleteRiddle.mutate(item.riddleId)
                                    // setCreateRiddle(!createRiddle)
                                    // onOpen1()
                                }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Delete Riddle</Button>
                        <Button isLoading={updateRiddle.isLoading} isDisabled={updateRiddle.isLoading} onClick={()=>{
                            const data={
                                riddles:[
                                    item
                                ]
                            }
                            const check=data.riddles.find((e)=>e.hint=='' || e.reward=='' || e.description=='' || e.title=='')
                            if(check){
                                setError(true)
                                return 
                            }
                            console.log('update',data)
                            updateRiddle.mutate(data)
                        }} className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{updateRiddle.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Update Riddle"}</Button>
                                </div>
                                
                                {/* <button onClick={() => {
                            // setCreateRiddle(!createRiddle)
                            // onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max">Save</button> */}
                            </div>
        </>
    )
}