'use client';

import axiosInstance from "@/app/utils/axiosInstance";
import {Input, Switch, Textarea} from "@nextui-org/react";
import dynamic from "next/dynamic";
import {useState} from "react";
import {useQuery} from "react-query";
// import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function ViewHunt({searchParams}: any) {
    const [isActive,setIsActive]=useState(true)

    const [huntToView, setHuntToView] = useState<any>(null);

    const huntsQuery = useQuery(['individualhunts', searchParams.id], ({queryKey}) => {
        return axiosInstance.get(`/hunt?huntId=${queryKey[1]}`);
    }, {
        onSuccess(data) {
            const huntData = {
                name: data.data.data.name,
                description: data.data.data.description,
                breweryName: data.data.data.brewery.name,
                riddles: data.data.data.riddles.map((riddle: any) => ({
                    title: riddle.title,
                    description: riddle.description,
                    reward: riddle.reward,
                    hint: riddle.hint,
                    qrCode: riddle.qrCode
                }))
            };
            setIsActive(data.data.data.isActive)
            setHuntToView(huntData);
        },
        onError(err) {
            console.log(err);
        }
    });

    const downloadQRCode = (qrCode: string, title: string) => {
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = `${title}_QRCode.png`;
        link.click();
    };

    return (
        <div className="flex flex-col gap-6 sm:w-[70%] w-full p-4">
            <div className="flex flex-col gap-4 rounded-lg border-[0.1rem] p-4">
                <p className="font-semibold text-xl">Hunt Details</p>
                <Input
                    isReadOnly
                    value={huntToView?.name || ""}
                    className="w-full"
                    type="text"
                    label="Hunt Name"
                    labelPlacement="outside"
                    classNames={{label: "!font-semibold"}}
                />
                <Textarea
                    isReadOnly
                    value={huntToView?.description || ""}
                    label="Hunt Description"
                    placeholder="No description available."
                    className="w-full"
                    labelPlacement="outside"
                    size="lg"
                    minRows={5}
                    classNames={{label: "!font-semibold"}}
                />
                <Input
                    isReadOnly
                    value={huntToView?.breweryName || ""}
                    className="w-full"
                    type="text"
                    label="Location Name"
                    labelPlacement="outside"
                    classNames={{label: "!font-semibold"}}
                />
                <div className="flex flex-col gap-2">
                            <p className="font-semibold text-sm">Is Hunt Active</p>
                            <Switch isReadOnly isSelected={isActive} onValueChange={(value)=>setIsActive(value)} defaultSelected/>
                        </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
                <p className="font-semibold text-xl">Riddles</p>
                {huntToView?.riddles?.map((riddle: any, index: number) => (
                    <div key={index} className="w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                        <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Title</p>
                            <ReactQuill readOnly placeholder="Enter Riddle Title" value={riddle.title}  theme="snow" />

                            </div>

                            <div className="flex flex-col gap-2 h-auto">
                            <p className="font-semibold text-sm">Description</p>
                            <ReactQuill readOnly placeholder="Write description..." value={riddle.description}  theme="snow" />
                                
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 h-auto">
                                                        <p className="font-semibold text-sm">Reward</p>
                                                        <ReactQuill readOnly placeholder="Write Reward..." value={riddle.reward} theme="snow" />
                                                            
                                </div>
                                <div className="flex flex-col gap-2 h-auto">
                                <p className="font-semibold text-sm">Hint</p>
                                <ReactQuill readOnly placeholder="Write Hint..." value={riddle.hint}   theme="snow" />
                                    
                                </div>
                            </div>
                        {/* <Input
                            isReadOnly
                            value={riddle.title || ""}
                            label="Title"
                            labelPlacement="outside"
                            className="w-full"
                            classNames={{label: "!font-semibold"}}
                        />
                        <Textarea
                            isReadOnly
                            value={riddle.description || ""}
                            label="Description"
                            placeholder="No description available."
                            className="w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={5}
                            classNames={{label: "!font-semibold"}}
                        />
                        <Textarea
                            isReadOnly
                            value={riddle.reward || ""}
                            label="Reward"
                            placeholder="No reward specified."
                            className="w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={3}
                            classNames={{label: "!font-semibold"}}
                        />
                        <Textarea
                            isReadOnly
                            value={riddle.hint || ""}
                            label="Hint"
                            placeholder="No hint provided."
                            className="w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={3}
                            classNames={{label: "!font-semibold"}}
                        /> */}
                        <div className="flex flex-col items-center mt-4">
                            <img src={riddle.qrCode} alt="QR Code" className="w-40 h-40"/>
                            <button onClick={() => downloadQRCode(riddle.qrCode, riddle.title)}
                                    className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max mt-4">Download
                                QR Code
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}