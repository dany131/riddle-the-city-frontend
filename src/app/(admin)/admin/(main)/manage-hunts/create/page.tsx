'use client';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import {useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {useRouter} from "next/navigation";
import {ImSpinner2} from "react-icons/im";
import {toast} from "react-toastify";
// import ReactQuill from 'react-quill-new';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import {Switch} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { FaImage } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

const selections = [
    {label: 'Open', key: 1}
];

export default function CreateRiddle() {
    const navigate = useRouter();
    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1, onClose: onClose1} = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<any>('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [message, setMessage] = useState('');
    const [error,setError]=useState(false)
    const [isActive,setIsActive]=useState(true)
    // const [displayOptions,setDisplayOptions]=useState(false)
    const [allImageFiles,setAllImageFiles]=useState<any>([])
    const [huntToAdd, setHuntToAdd] = useState({
        name: "",
        description: "",
        brewery: "",
        riddles: [
            {
                title: "",
                isOpen:false,
                description: [
                    
                ],
                reward: "",
                hint: "",
                hasReward:true
            }
        ]
    });

    const breweryQuery = useQuery(['breweries', searchQuery], ({queryKey}) => {
        return axiosInstance.get(`/brewery/all?page=1&limit=20&searchQuery=${queryKey[1]}`);
    }, {
        onSuccess(data) {
            console.log(data);
            setHasMore(breweryQuery.data?.data.lastPage != page);
        },
        onError(err) {
            console.log(err);
        }
    });

    function onLoadMore() {
        setPage((prev) => prev + 1);
    }

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
        onLoadMore
    });

    

    const queryClient = useQueryClient();

    const huntAddMutation = useMutation((data: any) => axiosInstance.post(`/hunt`, data), {
        onSuccess(data) {
            console.log('post data', data);
            queryClient.invalidateQueries('hunts');
            setMessage('');
            onOpen1();
        },
        onError(error: any) {
            if (Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message[0], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            } else {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }
        }
    });

    function buttonSubmit() {
        // const isAnyDescriptionEmpty=huntToAdd.riddles.filter((e)=>{
        //     return !e.description.length
        // })
        // console.log('any empty',isAnyDescriptionEmpty)
        
        const filterRiddles = huntToAdd.riddles.filter((e) => {
            if (e.description.length==0 || e.hint=='' || e.reward=='' || e.title=='') {
                return e;
            }
        });
        const filterRiddlesNew = huntToAdd.riddles.filter((e) => {
            if (e.description.length || e.hint != '' || e.reward != '' || e.title != '') {
                return e
            }
        });

        

        console.log('filter new ',filterRiddlesNew)
        const addHuntData = {
            ...huntToAdd,
            isActive,
            riddles: filterRiddlesNew.map((e)=>{
                const removeImagesDescription=e.description.filter((f:any)=>{
                    if(f.type==1){
                        return {
                            type:f.type,
                            text:f.text
                        }
                    }
                    return {type:f.type,media:f.media}
                })
                console.log('remove',removeImagesDescription)
                return {
                    hint:e.hint,
                    reward:e.reward,
                    hasReward:e.hasReward,
                    title:e.title,
                    description:removeImagesDescription
                }
            }),
            // files:allImageFiles.map((e:any)=>e.file)
        };
        console.log('addHunt',addHuntData)
        if (filterRiddles.length != 0 || huntToAdd.name=='' || huntToAdd.brewery=='' || huntToAdd.description=='' ) {
            setError(true)
        }
        else {
            setError(false)
            console.log('data to upload',addHuntData)
            // const formData=new FormData()
            // Object.entries(addHuntData).forEach((e,index)=>{
            //     if(typeof e[1]=='object'){
            //         if(e[0]=='files'){
            //             // e[1].forEach((k:any,indet:number)=>{
            //             //     formData.append('files',k)
            //             // })
            //         }
            //         else{
            //             // riddlestarts
            //             e[1].forEach((k:any,inde:number)=>{
            //                 Object.entries(k).forEach((j)=>{
            //                     if(typeof j[1]=='object'){
            //                         // console.log('j[1]',j[1],j[0])
            //                         (j[1]! as any).forEach((o:any,indet:number)=>{
            //                             if(o.text){
            //                                 formData.append(`riddles[${inde}][description][${indet}][type]`,o.type)
            //                                 formData.append(`riddles[${inde}][description][${indet}][text]`,o.text)
            //                             }
            //                             else{
            //                                 formData.append(`riddles[${inde}][description][${indet}][type]`,o.type)
            //                                 formData.append(`riddles[${inde}][description][${indet}][media]`,o.media)
            //                             }
            //                         })
            //                     }
            //                     else{
            //                         // console.log('j[1]',j[1],j[0])
            //                         formData.append(`riddles[${inde}][${j[0]}]`,j[1] as any)
            //                     }
            //                 })
            //             })
            //         }
            //     }
            //     else{
            //         formData.append(`${e[0]}`,e[1] as any)
            //     }
            // })

            // console.log('dataaaa',[...formData.entries()])
            console.log('dataaa',addHuntData)
            huntAddMutation.mutate(addHuntData);
        }







        // if (filterRiddles) {
        //     const addHuntData = {
        //         ...huntToAdd,
        //         riddles:filterRiddles
        //     }
        //     huntAddMutation.mutate(addHuntData)
        // }
        // else {
        //     setMessage('Please Fill All The Info To Add A New Hunt')
        // }
    }


    const deleteFileMutation=useMutation((file:string)=>axiosInstance.delete(`/file?fileName=${file}`))
    // console.log('hunt to add', huntToAdd);
    // console.log('all images',allImageFiles)
    return (
        <>
            {/*<div className="flex justify-between">*/}
            {/*    <p className="text-xl font-semibold">Create New Hunt</p>*/}
            {/*</div>*/}
            {message && <p className="text-red-600 text-center">{message}</p>}
            {/*<div className=" border-[0.1rem] p-4 flex flex-col gap-[3rem] rounded-lg">*/}
                <div className="flex flex-col gap-4">
                    <p className="font-semibold">Hunt Details</p>
                    <div className="flex flex-col gap-4 rounded-lg sm:w-[70%] w-full border-[0.1rem] p-4">
                        <Input
                            value={huntToAdd.name}
                            className=" w-full"
                            type="text"
                            isInvalid={huntToAdd.name == '' && error}
                            errorMessage="Please Enter Hunt Name"
                            label="Hunt Name"
                            placeholder="Enter Hunt Name"
                            onChange={(e) => {
                                setHuntToAdd((prev) => {
                                    const find = breweryQuery.data?.data.data.find((j: any) => j.name == e);
                                    return ({
                                        ...prev,
                                        name: e.target.value
                                    });
                                });
                            }}
                            labelPlacement="outside"
                            classNames={{ label: "!font-semibold" }}
                        />
                        <Textarea
                            value={huntToAdd.description}
                            label="Hunt Description"
                            placeholder="Write description..."
                            isInvalid={huntToAdd.description == '' && error}
                            errorMessage="Please Enter Hunt Description"
                            onChange={(e) => {
                                setHuntToAdd((prev) => {
                                    const find = breweryQuery.data?.data.data.find((j: any) => j.name == e);
                                    return ({
                                        ...prev,
                                        description: e.target.value
                                    });
                                });
                            }}
                            className=" w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={5}
                            classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                        />

                        <Autocomplete
                            className="sm:w-[70%] w-full font-semibold"
                            variant="flat"
                            isLoading={breweryQuery.isLoading}
                            defaultItems={(breweryQuery.data?.data.data ? breweryQuery.data?.data.data : [{
                                name: "",
                                _id: ""
                            }] as any)}
                            label="Location Name"
                            labelPlacement="outside"
                            placeholder="Select a Brewery"
                            isInvalid={huntToAdd.brewery == '' && error}
                            errorMessage="Please Select Location"
                            defaultSelectedKey={huntToAdd.brewery}
                            scrollRef={scrollerRef}
                            onInputChange={(e) => {
                                setSearchQuery(e);
                            }}
                            onSelectionChange={(e) => {
                                setHuntToAdd((prev: any) => {
                                    // const find = breweryQuery.data?.data.data.find((j: any) => j.name == e)
                                    return ({
                                        ...prev,
                                        brewery: e
                                    });
                                });
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

                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-sm">Is Hunt Active</p>
                            <Switch onValueChange={(value)=>setIsActive(value)} defaultSelected/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-3 gap-4">
                    <h1 className="font-semibold">Create Riddles</h1>
                    {huntToAdd.riddles.map((e, riddleIndex: number) =>
                        <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                            <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Title</p>
                            <ReactQuill placeholder="Enter Riddle Title" value={e.title} onChange={(j) => {
                                        const value = j;
                                        const find = huntToAdd.riddles.find((e, index1) => index1 == riddleIndex);
                                        find!.title = value;
                                        const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                            if (index1 == riddleIndex) {
                                                return find;
                                            }
                                            return k;
                                        });
                                        setHuntToAdd((prev: any) => {
                                            return (
                                                {
                                                    ...prev,
                                                    riddles: newRiddles
                                                }
                                            );
                                        });
                                    }} theme="snow" />
                                    {e.title == '' && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter Title</p>}
                            </div>

                            <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Description</p>
                            <div className="flex flex-col gap-2 min-h-[10rem] bg-[#f4f4f5] rounded-lg gap-4 p-4">
                                {
                                    e.description.map((k:any,inde)=>{
                                        console.log('riddleIndex',riddleIndex)
                                        if(k.type==1){
                                            return <div className="flex gap-4 justify-between">
                                                <Input value={k.text} onChange={(l)=>{
                                                        const findRiddle=huntToAdd.riddles.find((e,ind)=>ind==riddleIndex)
                                                        const findDescription=findRiddle?.description.find((k,ind)=>ind==inde) as any
                                                        findDescription!.text=l.target.value
                                                        const newDescription=findRiddle?.description.map((k,ind)=>{
                                                            if(ind==inde){
                                                                return findDescription
                                                            }
                                                            return k
                                                        })
                                                        const newRiddles=huntToAdd.riddles.map((j,ind)=>{
                                                            if(ind==riddleIndex){
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
                                                const findRiddle=huntToAdd.riddles.find((e,ind)=>ind==riddleIndex)
                                                const findDescription=findRiddle?.description.filter((k,ind)=>ind!=inde) as any
                                                const newRiddles=huntToAdd.riddles.map((j,ind)=>{
                                                    if(ind==riddleIndex){
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
                                                const findRiddle=huntToAdd.riddles.find((e,ind)=>ind==riddleIndex)
                                                const findDescriptionToRemoveFromFiles=findRiddle?.description.find((k,ind)=>ind==inde) as any
                                                deleteFileMutation.mutate(k.media)
                                                // console.log(findDescriptionToRemoveFromFiles)
                                                // setAllImageFiles(allImageFiles.filter((l:any)=>l.blob!=findDescriptionToRemoveFromFiles.text))
                                                const findDescription=findRiddle?.description.filter((k,ind)=>ind!=inde) as any
                                                const newRiddles=huntToAdd.riddles.map((j,ind)=>{
                                                    if(ind==riddleIndex){
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
                                    const findRiddle=huntToAdd.riddles.find((e,ind)=>ind==riddleIndex)
                                    const newRiddles=huntToAdd.riddles.map((j,ind)=>{
                                        if(ind==riddleIndex){
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
                                        const findRiddle=huntToAdd.riddles.find((e,ind)=>ind==riddleIndex)
                                        // console.log('text riddleIndex',riddleIndex)
                                        const newDescription=[
                                            ...findRiddle!.description,
                                            {type:1,text:""}
                                        ]
                                        const newRiddles=huntToAdd.riddles.map((j,ind)=>{
                                            if(ind==riddleIndex){
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
                                    <Button key={riddleIndex} className="bg-gray-100 w-max min-w-max h-max px-2 py-1 text-[#A92223] relative">
                                    <label htmlFor={`images${riddleIndex}`} ><FaImage /></label>
                                    <input accept=".jpeg,.png,.jpg" type="file" onChange={async (p)=>{
                                        if (p.target.files && p.target.files.length > 0) {
                                            const file = p.target.files[0];
                                            const formData=new FormData()
                                            formData.append('file',file)
                                            // const blob=URL.createObjectURL(file)
                                            // setAllImageFiles((prev:any)=>[...prev,{file:file,blob}]);
                                            const findRiddlee=huntToAdd.riddles.find((g,ind)=>ind==riddleIndex)
                                            const uploadFile=await axiosInstance.postForm('/file',formData)
                                            // console.log('uploadddd',)
                                            // console.log(huntToAdd.riddles,'found riddle',findRiddlee,`riddleIndex is ${riddleIndex}`)
                                        const newDescriptionn=[
                                            ...findRiddlee!.description,
                                            {type:2,media:uploadFile.data.data.file}
                                        ]
                                        const newRiddless=huntToAdd.riddles.map((j,ind)=>{
                                            if(ind==riddleIndex){
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
                                    }} className="absolute invisible" id={`images${riddleIndex}`} />
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
                                                                    const value = j;
                                                                    const find = huntToAdd.riddles.find((e, index1) => index1 == riddleIndex);
                                                                    find!.reward = value;
                                                                    const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                                                        if (index1 == riddleIndex) {
                                                                            return find;
                                                                        }
                                                                        return k;
                                                                    });
                                                                    setHuntToAdd((prev: any) => {
                                                                        return (
                                                                            {
                                                                                ...prev,
                                                                                riddles: newRiddles
                                                                            }
                                                                        );
                                                                    });
                                                                }} theme="snow" />
                            {e.reward=='' && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter {e.hasReward?"Reward":"Text"}</p>}

                                                            
                                </div>
                                <div className="flex flex-col gap-2 h-auto">
                                <p className="font-semibold text-sm">Hint</p>
                                <ReactQuill placeholder="Write Hint..." value={e.hint}  onChange={(j) => {
                                            const value = j;
                                            const find = huntToAdd.riddles.find((e, index1) => index1 == riddleIndex);
                                            find!.hint = value;
                                            const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                                if (index1 == riddleIndex) {
                                                    return find;
                                                }
                                                return k;
                                            });
                                            setHuntToAdd((prev: any) => {
                                                return (
                                                    {
                                                        ...prev,
                                                        riddles: newRiddles
                                                    }
                                                );
                                            });
                                        }} theme="snow" />
                            {e.hint=='' && error && <p className="text-[#f31260] font-semibold text-sm">Please Enter Hint</p>}
                                    
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                            <p className="font-semibold text-sm">Has Reward</p>
                            <Switch isSelected={e.hasReward} onValueChange={(j) => {
                                    const value = j;
                                    const find = huntToAdd.riddles.find((e, index1) => index1 == riddleIndex);
                                    find!.hasReward = value;
                                    const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                        if (index1 == riddleIndex) {
                                            return find;
                                        }
                                        return k;
                                    });
                                    setHuntToAdd((prev: any) => {
                                        return (
                                            {
                                                ...prev,
                                                riddles: newRiddles
                                            }
                                        );
                                    });
                                }} defaultSelected/>
                                
                        </div>

                            
                            {riddleIndex != 0 && <button onClick={() => {
                                const oldRiddles = huntToAdd.riddles.filter((j, index1) => index1 != riddleIndex);
                                setHuntToAdd((prev) => {
                                    return (
                                        {
                                            ...prev,
                                            riddles: oldRiddles
                                        }
                                    );
                                });
                                // setCreateRiddle(!createRiddle)
                                // onOpen1()
                            }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Delete Riddle</button>}
                            {/* <button onClick={() => {
                            // setCreateRiddle(!createRiddle)
                            // onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max">Save</button> */}
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => {
                        const oldRiddles = huntToAdd.riddles;
                        setHuntToAdd((prev) => {
                            return (
                                {
                                    ...prev,
                                    riddles: [
                                        ...oldRiddles,
                                        {
                                            title: "",
                                            description: [],
                                            reward: "",
                                            hint: "",
                                            isOpen:false,
                                            hasReward:true
                                        }
                                    ]
                                }
                            );
                        });
                        // setCreateRiddle(!createRiddle)
                        // onOpen1()
                    }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Add More Riddles
                    </button>
                    <button onClick={buttonSubmit}
                            className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{huntAddMutation.isLoading ?
                        <ImSpinner2 className="text-xl animate-spin"/> : "Submit"}</button>
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

            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
                onClose={() => {
                    navigate.push('/admin/manage-hunts');
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Hunt Created Successfully</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Riddles have been created successfully & QR Code is
                                    generated</p>
                                {/* <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}