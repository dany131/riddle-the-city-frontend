'use client'
import axiosInstance from "@/app/utils/axiosInstance";
import { Button, Switch } from "@nextui-org/react";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { IoText } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import ReactQuill from "react-quill-new";
import { toast } from "react-toastify";

export default function EditNewRiddle({setNewRiddles,newRiddless,index,error,huntId,item,setHuntToAdd,huntToAdd,setError}:{setNewRiddles:any,newRiddless:any,index:number,error:any,huntId:string,item:any,setHuntToAdd:any,huntToAdd:any,setError:any}){
    const deleteFileMutation=useMutation((file:string)=>axiosInstance.delete(`/file?fileName=${file}`))
    const queryClient=useQueryClient()
    const updateHunts = useMutation((datas: any) => axiosInstance.put(`/hunt?huntId=${huntId}`, datas), {
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

    return (
        <>
        <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                                <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Title</p>
                            <ReactQuill 
                            placeholder="Enter Riddle Title" value={item.title}

                            onChange={(j) => {
                                const value = j
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
                            
                            theme="snow" />
                                    {item.title == '' && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter Title</p>}
                            </div>

                            <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Description</p>
                            <div className="flex flex-col gap-2 min-h-[10rem] bg-[#f4f4f5] rounded-lg gap-4 p-4">
                                {
                                    item.description.map((k:any,inde:number)=>{
                                        console.log('riddleIndex',index)
                                        if(k.type==1){
                                            return <div className="flex gap-4 justify-between">
                                                <ReactQuill className="w-full" placeholder="" value={k.text} onChange={(l)=>{
                                                        const findRiddle=newRiddless.find((e:any,ind:number)=>ind==index)
                                                        const findDescription=findRiddle?.description.find((k:any,ind:number)=>ind==inde) as any
                                                        findDescription!.text=l
                                                        const newDescription=findRiddle?.description.map((k:any,ind:number)=>{
                                                            if(ind==inde){
                                                                return findDescription
                                                            }
                                                            return k
                                                        })
                                                        const newRiddles=newRiddless.map((j:any,ind:number)=>{
                                                            if(ind==index){
                                                                return {
                                                                    ...findRiddle,
                                                                    description:newDescription
                                                                }
                                                            }
                                                            return j
                                                        })
                                                        setNewRiddles(newRiddles)


                                            }} theme="snow" />
                                                
                                            <AiOutlineDelete onClick={()=>{
                                                const findRiddle=newRiddless.find((e:any,ind:number)=>ind==index)
                                                const findDescription=findRiddle?.description.filter((k:any,ind:number)=>ind!=inde) as any
                                                const newRiddles=newRiddless.map((j:any,ind:number)=>{
                                                    if(ind==index){
                                                        return {
                                                            ...findRiddle,
                                                            description:findDescription
                                                        }
                                                    }
                                                    return j
                                                })
                                                setNewRiddles(newRiddles)
                                            }} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 "/>
                                            </div>
                                        }
                                        return <div className="flex gap-4 justify-between items-center">
                                            <Image src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${k.media}`} alt="riddleImage" width={200} height={200}/>
                                            <AiOutlineDelete onClick={()=>{
                                                const findRiddle=newRiddless.find((e:any,ind:number)=>ind==index)
                                                const findDescriptionToRemoveFromFiles=findRiddle?.description.find((k:any,ind:number)=>ind==inde) as any
                                                deleteFileMutation.mutate(k.media)
                                                // console.log(findDescriptionToRemoveFromFiles)
                                                // setAllImageFiles(allImageFiles.filter((l:any)=>l.blob!=findDescriptionToRemoveFromFiles.text))
                                                const findDescription=findRiddle?.description.filter((k:any,ind:number)=>ind!=inde) as any
                                                const newRiddles=newRiddless.map((j:any,ind:number)=>{
                                                    if(ind==index){
                                                        return {
                                                            ...findRiddle,
                                                            description:findDescription
                                                        }
                                                    }
                                                    return j
                                                })
                                                setNewRiddles(newRiddles)
                                            }} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 "/>
                                        </div>
                                    })
                                }
                                {item.description.length<5 && <div className="flex gap-2 items-center">
                                <Button onClick={()=>{
                                    const findRiddle=newRiddless.find((e:any,ind:number)=>ind==index)
                                    const newRiddles=newRiddless.map((j:any,ind:number)=>{
                                        if(ind==index){
                                            return {
                                                ...findRiddle,
                                                isOpen:!(findRiddle!.isOpen)
                                                // description:newDescription
                                            }
                                        }
                                        return j
                                    })
                                    setNewRiddles(newRiddles)
                                }} className="bg-[#A92223] w-max min-w-max h-max px-2 py-1 rounded-full text-white">+</Button>
                                <div className={`${item.isOpen?"flex":"hidden"} gap-4 bg-white p-2 rounded-full`}>
                                    <Button onClick={()=>{
                                        const findRiddle=newRiddless.find((e:any,ind:number)=>ind==index)
                                        // console.log('text riddleIndex',riddleIndex)
                                        const newDescription=[
                                            ...findRiddle!.description,
                                            {type:1,text:""}
                                        ]
                                        const newRiddles=newRiddless.map((j:any,ind:number)=>{
                                            if(ind==index){
                                                return {
                                                    ...findRiddle,
                                                    description:newDescription
                                                }
                                            }
                                            return j
                                        })
                                        setNewRiddles(newRiddles)
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
                                            const findRiddlee=newRiddless.find((g:any,ind:number)=>ind==index)
                                            const uploadFile=await axiosInstance.postForm('/file',formData)
                                            // console.log('uploadddd',)
                                            // console.log(huntToAdd.riddles,'found riddle',findRiddlee,`riddleIndex is ${riddleIndex}`)
                                        const newDescriptionn=[
                                            ...findRiddlee!.description,
                                            {type:2,media:uploadFile.data.data.file}
                                        ]
                                        const newRiddles=newRiddless.map((j:any,ind:number)=>{
                                            if(ind==index){
                                                return {
                                                    ...findRiddlee,
                                                    description:newDescriptionn
                                                }
                                            }
                                            return j
                                        })
                                        setNewRiddles(newRiddles)
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
                                                                    const value = j;
                                                                    const find = newRiddless.find((e:any, index1:number) => index1 == index);
                                                                    find!.reward = value;
                                                                    const newRiddles = newRiddless.map((k:any, index1:number) => {
                                                                        if (index1 == index) {
                                                                            return find;
                                                                        }
                                                                        return k;
                                                                    });
                                                                    setNewRiddles(newRiddles);
                                                                }} theme="snow" />
                            {item.reward=='' && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter {item.hasReward?"Reward":"Text"}</p>}

                                                            
                                </div>
                                <div className="flex flex-col gap-2 h-auto">
                                <p className="font-semibold text-sm">Hint</p>
                                <ReactQuill placeholder="Write Hint..." value={item.hint}  onChange={(j) => {
                                            const value = j;
                                            const find = newRiddless.find((e:any, index1:number) => index1 == index);
                                            find!.hint = value;
                                            const newRiddles = newRiddless.map((k:any, index1:number) => {
                                                if (index1 == index) {
                                                    return find;
                                                }
                                                return k;
                                            });
                                            setNewRiddles(newRiddles);
                                        }} theme="snow" />
                            {item.hint=='' && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter Hint</p>}
                                    
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                            <p className="font-semibold text-sm">Has Reward</p>
                            <Switch isSelected={item.hasReward} onValueChange={(j) => {
                                    const value = j;
                                    const find = newRiddless.find((e:any, index1:number) => index1 == index);
                                    find!.hasReward = value;
                                    const newRiddles = newRiddless.map((k:any, index1:number) => {
                                        if (index1 == index) {
                                            return find;
                                        }
                                        return k;
                                    });
                                    setNewRiddles(newRiddles);
                                }} defaultSelected/>
                                
                        </div>
                        <div className="flex flex-wrap gap-4">
                                <Button  onClick={() => {
                                    const oldRiddles = newRiddless.filter((j: any, index1: any) => index1 != index)
                                    setNewRiddles(oldRiddles)
                                }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Delete Riddle</Button>
                        <Button isLoading={updateHunts.isLoading} isDisabled={updateHunts.isLoading} onClick={()=>{
                            const data={
                                riddles:[
                                    {
                                        title:item.title,
                                        hasReward:item.hasReward,
                                        reward:item.reward,
                                        hint:item.hint,
                                        description:item.description
                                    }
                                ]
                            }
                            const check=data.riddles.find((e)=>e.hint=='' || e.reward=='' || e.description=='' || e.title=='')
                            if(check){
                                setError(true)
                                return 
                            }
                            updateHunts.mutate(data)
                            const oldRiddles = newRiddless.filter((j: any, index1: any) => index1 != index)
                            setNewRiddles(oldRiddles)
                            console.log('new riddle',data)
                        }} className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{updateHunts.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Add Riddle"}</Button>
                                </div>
                            </div>
        </>
    )
}