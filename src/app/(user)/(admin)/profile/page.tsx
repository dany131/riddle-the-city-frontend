'use client';
import Image from "next/image";
import {CiEdit} from "react-icons/ci";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import Cookies from 'js-cookie';
import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {toast} from "react-toastify";
import {FormEvent, useState} from "react";
import Carousel from "react-multi-carousel";
import { FieldValues, useController, useForm } from "react-hook-form";


type UserData = {
    name: string,
    email: string,
    phone: string,
    role: string,
    id: string,
    profile: { url: string, isCompleteUrl: boolean }
}

type BadgeData = {
    _id: string;
    user: string;
    badge: {
        _id: string,
        name: string,
        description: string,
        huntsRequired: string,
        media: string,
        createdAt: string,
        updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
};

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
        profile: {url: '', isCompleteUrl: false}
    };
    let userProfilePicture = "/images/user/profile/profile.png";
    if (Cookies.get('userData')!) {
        userData = JSON.parse(Cookies.get('userData')!);
        userProfilePicture = (userData.profile.isCompleteUrl) ? userData.profile.url : `${process.env.NEXT_PUBLIC_MEDIA_URL}/${userData.profile.url}`;
    }
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2,onClose:onClose2} = useDisclosure();
    const userProfileEditMutation = useMutation((data: any) => {

        return axiosInstance.putForm('/user', data);
    }, {
        onSuccess(data) {
            console.log('data', data);
            const {name, email, phone, role, _id, profilePicture, accessType} = data.data.data;
            Cookies.set('userData', JSON.stringify({
                name,
                email,
                phone,
                role,
                id: _id,
                profile: profilePicture,
                accessType
            }));
            onClose2();
            queryClient.invalidateQueries('user')

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

    const getuserQuery=useQuery(['user',userData.id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
        enabled:!!userData.id,
        onSuccess(data) {
            field1.onChange(data?.data.data.user.marketingEmails?'1':'2')
            field2.onChange(data?.data.data.user.autoRenewal?'1':'2')

        },
        refetchOnWindowFocus:false
    })
    const badgesQuery = useQuery(['badges'], () => axiosInstance.get(`/badge/user?page=1&limit=9999&userId=${userData.id}`));

    const {handleSubmit,register,control,formState}=useForm()

    function handleSubmitt(e: FieldValues) {

        console.log('old',e)
       if(!e.file){
        delete e.file
       }
    
       if(!e.marketingEmails){
        e.marketingEmails='2'
       }
       else{
        e.marketingEmails='1'
       }

       if(!e.autoRenewal){
        e.autoRenewal='2'
       }
       else{
        e.autoRenewal='1'
       }

       console.log('new',e)


  




    const formData=new FormData()
    Object.entries(e).forEach((f)=>{
        formData.append(f[0],f[1])
    })

        userProfileEditMutation.mutate(formData);
    }

    const {field,fieldState}=useController({name:"file",control})
    const {field:field1,fieldState:fieldState1}=useController({name:"marketingEmails",control})
    const {field:field2,fieldState:fieldState2}=useController({name:"autoRenewal",control})



    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // setProfileImage(file);
            field.onChange(file)

            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const pastHuntsQuery = useQuery(['pastHunts'], () => axiosInstance.get('/hunt/past?page=1&limit=10000'));
    console.log(field1.value,field2.value)
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
                                   alt="Profile Picture"/>
                        </div>
                        <button disabled={!getuserQuery.data?.data} onClick={onOpen2}
                                className="px-4 w-max py-2 h-max bg-[#A92223] rounded text-white flex gap-2 items-center">
                            <CiEdit className="text-lg"/> <span className="sm:inline hidden">Edit Profile</span>
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
                        {!pastHuntsQuery.isFetching &&
                            <Carousel
                                className="p-4"
                                responsive={{
                                    desktop: {
                                        breakpoint: {
                                            max: 3000,
                                            min: 1024
                                        },
                                        items: 3,
                                        partialVisibilityGutter: 40
                                    },
                                    mobile: {
                                        breakpoint: {
                                            max: 464,
                                            min: 0
                                        },
                                        items: 1,
                                        partialVisibilityGutter: 30
                                    },
                                    tablet: {
                                        breakpoint: {
                                            max: 1024,
                                            min: 464
                                        },
                                        items: 2,
                                        partialVisibilityGutter: 30
                                    }
                                }}

                            >
                                {/* <div>Item 1</div>
                                <div>Item 2</div>
                                <div>Item 3</div>
                                <div>Item 4</div> */}

                                {pastHuntsQuery.data?.data?.data.length ? (pastHuntsQuery.data?.data.data.map((e: any, index: number) =>
                                    <div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
                                         className="flex flex-col min-h-full gap-2 rounded-lg  p-4">
                                        <div className="flex w-full items-center justify-between">
                                            <h1 className="font-black text-lg">Hunt {index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</h1>
                                            <p className="bg-[#a1ff8a] p-2 text-xs rounded-full">{new Date(e.completionDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p dangerouslySetInnerHTML={{__html: `Starting Point: ${e.startingRiddle}`}}></p>
                                            <p dangerouslySetInnerHTML={{__html: `Ending Point: ${e.endingRiddle}`}}></p>
                                            <p className="w-full break-all"
                                               dangerouslySetInnerHTML={{__html: `Reward ${e.rewards.join(' , ')}`}}></p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="font-semibold text-red-600">No Past Hunts Found</p>
                                )}
                            </Carousel>
                        }
                        {/* <div className="flex sm:flex-row flex-col gap-4">

                        </div> */}
                    </div>
                    {/* Badges Section */}
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold text-lg">Badges</p>
                        {!badgesQuery.isFetching && badgesQuery.data?.data?.data.length > 0 ? (
                            <Carousel
                                responsive={{
                                    desktop: {
                                        breakpoint: { max: 3000, min: 1024 },
                                        items: 3,
                                        partialVisibilityGutter: 40
                                    },
                                    tablet: {
                                        breakpoint: { max: 1024, min: 768 },
                                        items: 2,
                                        partialVisibilityGutter: 30
                                    },
                                    mobile: {
                                        breakpoint: { max: 768, min: 0 },
                                        items: 1,
                                        partialVisibilityGutter: 20
                                    },
                                }}
                                className="p-4"
                                infinite={false}
                                partialVisible
                            >
                                {badgesQuery.data?.data.data.map((badgeData: BadgeData) => (
                                    <div key={badgeData.badge._id}
                                         style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                                         className="flex flex-col min-h-full gap-2 rounded-lg p-4 items-center bg-white">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${badgeData.badge.media}`}
                                            alt={badgeData.badge.name}
                                            className="h-24 w-24 object-cover rounded-full"
                                        />
                                        <h2 className="font-bold text-lg mt-2">{badgeData.badge.name}</h2>
                                        <p className="text-sm text-gray-500 text-center px-4">{badgeData.badge.description}</p>
                                        <p className="text-xs text-gray-400 mt-2">Earned on: {(new Date(badgeData.createdAt)).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <p className="font-semibold text-red-600">No Badges Earned</p>
                        )}
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
                                <form onSubmit={handleSubmit(handleSubmitt)} className="flex flex-col gap-4 pb-8">
                                <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-sm">Profile Picture</p>
                                        <div className="h-[7rem] w-[7rem] relative">
                                            <Image className="h-full w-full"
                                                   src={previewImage || userProfilePicture}
                                                   width={200} height={200}
                                                   alt="Profile Picture"/>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                {...field}
                                                value={undefined}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Username"
                                        defaultValue={`${userData.name}`}
                                        placeholder="Enter User name"
                                        labelPlacement="outside"
                                        isInvalid={!!formState.errors.name}
                                        errorMessage={formState.errors.name?.message as any}
                                        classNames={{label: "font-semibold"}}
                                        {...register('name',{required:'Enter Name'})}
                                        // onChange={(e) => {
                                        //     setName(e.target.value);
                                        // }}
                                    />
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Phone Number"
                                        defaultValue={`${userData.phone}`}
                                        placeholder="Enter phone number"
                                        labelPlacement="outside"
                                        isInvalid={!!formState.errors.phone}
                                        errorMessage={formState.errors.phone?.message as any}
                                        classNames={{label: "font-semibold"}}
                                        {...register('phone',{required:'Enter Phone Number'})}
                                        // onChange={(e) => {
                                        //     setPhone(e.target.value);
                                        // }}
                                    />
                                    
                                 
                                        <Checkbox  defaultSelected={getuserQuery.data?.data.data.user.marketingEmails} {...field1}>Receive Marketing Emails</Checkbox>
                                        <Checkbox   defaultSelected={getuserQuery.data?.data.data.user.autoRenewal} {...field2}>Auto Renewal</Checkbox>
                                    {/* <CheckboxGroup {...field2} defaultValue={[getuserQuery.data?.data.data.user.autoRenewal?"1":"0"]}>
                                    </CheckboxGroup>
                                    */}

                                    <Button isDisabled={userProfileEditMutation.isLoading} isLoading={userProfileEditMutation.isLoading} type="submit" className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Update Profile
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}