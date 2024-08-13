'use client';
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";


type UserData = {
    name: string,
    email: string,
    phone: string,
    role: string,
    id: string,
    profile: { url: string, isCompleteUrl: boolean }
}

export default function Profile() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const queryClient = useQueryClient();

    let userData: UserData = {
        name: '',
        email: '',
        id: '',
        phone: '',
        role: 'User',
        profile: { url: '', isCompleteUrl: false }
    };
    let userProfilePicture = "/images/user/profile/profile.png";
    if (Cookies.get('userData')!) {
        userData = JSON.parse(Cookies.get('userData')!);
        userProfilePicture = (userData.profile.isCompleteUrl) ? userData.profile.url : `${process.env.NEXT_PUBLIC_MEDIA_URL}/${userData.profile.url}`;
    }
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const userProfileEditMutation = useMutation((data: any) => {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.phone) formData.append('phone', data.phone);
        if (data.file) formData.append('file', data.file);

        return axiosInstance.put(`/riddle/api/user`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }, {
        onSuccess(data) {
            const { name, email, phone, role, _id, profilePicture } = data.data.data;
            Cookies.set('userData', JSON.stringify({
                name,
                email,
                phone,
                role,
                id: _id,
                profile: profilePicture
            }));
        },
        onError(error: any) {
            const errorMessage = typeof error.response.data.message === 'string'
                ? error.response.data.message
                : error.response.data.message.join(',');
            toast.error(errorMessage, {
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
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        let userUpdated: any = {};
        if (name) userUpdated.name = name;
        if (phone) userUpdated.phone = phone;
        if (profileImage) userUpdated.file = profileImage;

        userProfileEditMutation.mutate(userUpdated);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">My Profile</p>
                <div className="flex flex-col border-1 rounded-lg gap-8 p-4">
                    <div className="flex justify-between">
                        <div className="h-[7rem] w-[7rem] relative">
                            <Image className="h-full w-full"
                                src={userProfilePicture}
                                width={200} height={200}
                                alt="Profile Picture" />
                        </div>
                        <button onClick={onOpen2}
                            className="px-4 w-max py-2 h-max bg-[#A92223] rounded text-white flex gap-2 items-center">
                            <CiEdit className="text-lg" /> <span className="sm:inline hidden">Edit Profile</span>
                        </button>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-4">
                        <div className="flex flex-col w-[40%]">
                            <p className="text-gray-400 text-sm">Full Name</p>
                            <p className="font-semibold">{userData.name}</p>
                        </div>
                        <div className="flex flex-col w-[40%]">
                            <p className="text-gray-400 text-sm">Email Address</p>
                            <p className="font-semibold">{userData.email}</p>
                        </div>
                        <div className="flex flex-col w-[40%]">
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="font-semibold">{userData.phone || "NA"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">Past Hunts</p>
                        <div className="flex sm:flex-row flex-col gap-4">
                            <div className="flex flex-col sm:w-[40%] w-full gap-2 rounded-lg shadow-md p-2">
                                <div className="flex w-full items-center justify-between">
                                    <p className="font-semibold">Hunt 01</p>
                                    <p className="bg-[#a1ff8a] p-2 text-xs rounded-full">24/02/2024</p>
                                </div>
                                <div>
                                    <p>Starting Point: Riddle Point 01</p>
                                    <p>Ending Point: Riddle Point 01</p>
                                    <p>Reward: Free Drink</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Edit Profile</ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-4 pb-8">
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Username"
                                        defaultValue={`${userData.name}`}
                                        placeholder="Enter User name"
                                        labelPlacement="outside"
                                        classNames={{ label: "font-semibold" }}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Phone Number"
                                        defaultValue={`${userData.phone}`}
                                        placeholder="Enter phone number"
                                        labelPlacement="outside"
                                        classNames={{ label: "font-semibold" }}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-sm">Profile Picture</p>
                                        <div className="h-[7rem] w-[7rem] relative">
                                            <Image className="h-full w-full"
                                                src={previewImage || userProfilePicture}
                                                width={200} height={200}
                                                alt="Profile Picture" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <button onClick={(e) => {
                                        handleSubmit(e);
                                        onClose();
                                    }} className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Update Profile
                                    </button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}