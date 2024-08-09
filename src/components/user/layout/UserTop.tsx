'use client';
import { GoBell } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { RxDashboard } from "react-icons/rx";
import { ImNewspaper } from "react-icons/im";
import { FaListCheck } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiSolidBookContent } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineFeedback } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import Image from "next/image";

type UserData = {
    name: string,
    email: string,
    phone: string,
    role: string,
    id:string
}
export default function UserTopBar() {
    const pathname=usePathname()
    let userData:UserData={name:'',email:'',id:'',phone:'',role:'User'}
    if (Cookies.get('userData')!) {
        userData=JSON.parse(Cookies.get('userData')!)
    }
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const [changePassword, setChangePassword] = useState(false)
    const [display,setDisplay]=useState(false)
    return (
        <>
            <div className=" hidden w-full sm:flex border-b-[0.1rem] border-gray-200 gap-4 flex-wrap px-4 py-2 justify-between">
                <div>
                    <div className="flex gap-2 items-center">
                        <h1>Welcome Back,</h1>
                        <p className="text-xl font-semibold">{userData.name}</p>
                    </div>
                    <p className="text-xs text-gray-400">{new Date().toDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href={'/admin/notifications'} className="p-2 relative border-[0.1rem] rounded-full">
                        <GoBell />
                        <div className="w-[0.5rem] absolute top-[0.4rem] right-1/4 h-[0.5rem] bg-red-600 rounded-full"></div>
                    </Link>
                    <div className="flex items-center gap-2 cursor-pointer ">
                        <Link href={'/profile'} className="flex gap-2 items-center">
                            <FaRegUser className="p-2 border-[0.1rem] text-4xl rounded-full" />
                            <p>{userData.name}</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className=" flex w-full sm:hidden border-b-[0.1rem] border-gray-200 gap-4 flex-wrap px-4 py-2 justify-between">
                <div onClick={() => {
                    setDisplay(!display)
                }} className="cursor-pointer">
                    <GiHamburgerMenu className="h-full text-2xl"/>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex gap-2 items-center">
                        <h1>Welcome</h1>
                        <p className="text-xl font-semibold">{userData.name}</p>
                    </div>
                    <p className="text-xs text-gray-400">{new Date().toDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* <Link href={'/admin/notifications'} className="p-2 relative border-[0.1rem] rounded-full">
                        <GoBell />
                        <div className="w-[0.5rem] absolute top-[0.4rem] right-1/4 h-[0.5rem] bg-red-600 rounded-full"></div>
                    </Link> */}
                    <div className="flex items-center gap-2 cursor-pointer ">
                        <Link href={'/profile'} className="flex gap-2 items-center">
                            <FaRegUser className="p-2 border-[0.1rem] text-4xl rounded-full" />
                            {/* <p>{userData.name}</p> */}
                        </Link>
                    </div>
                </div>
            </div>
            <div onClick={() => {
                setDisplay(!display)
            }} className={`bg-[#000000bd] sm:hidden ${display?'block':'hidden'} w-full z-[888] absolute top-0 left-0 h-full`}>
                <div className={`h-full sm:h-full sm:hidden block w-full w-[50%] `}>
                    <div className=" text-white flex flex-col rounded-lg p-4 gap-8 w-full h-full bg-[#160704]">
                        <div className="h-[5rem] flex justify-between w-full">
                            <Image className="w-full h-full object-contain" src={'/images/admin/main/layout/ridde.png'} alt="auth" width={400} height={1000} />
                            {/* <button className="block sm:hidden text-3xl" onClick={() => { setDisplay(!display) }}>
                            <GiHamburgerMenu />
                        </button> */}
                        </div>
                        <hr />
                        <div className="flex h-full flex-col text-sm gap-4">
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/dashboard' ? 'bg-[#a922236e]' : ''}`}>
                                <RxDashboard className="w-1/4" />
                                <Link className="w-full" href={'/dashboard'}>Dashboard</Link>
                            </div>
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/feedback' ? 'bg-[#a922236e]' : ''}`}>
                                <MdOutlineFeedback className="w-1/4" />
                                <Link className="w-full" href={'/feedback'}>Feedback</Link>
                            </div>
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/settings' ? 'bg-[#a922236e]' : ''}`}>
                                <IoSettingsOutline className="w-1/4" />
                                <Link className="w-full" href={'/settings'}>Settings</Link>
                            </div>
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/help' ? 'bg-[#a922236e]' : ''}`}>
                                <CiCircleInfo className="w-1/4" />
                                <Link className="w-full" href={'/help'}>Help & Support</Link>
                            </div>
                            <div className="flex mt-auto gap-4 items-center">
                                <CiLogout />
                                <button onClick={onOpen2}>Logout</button>
                            </div>
                        </div>
                        {/* {display &&
                        <div onClick={() => setDisplay(!display)} className="flex sm:hidden w-full absolute z-[9999999] left-0 bg-[#000206d6] top-0 h-full justify-end">
                            <div className="bg-[#160704] flex h-full w-1/2 p-4 flex-col text-sm gap-4">
                                <div className={`flex gap-4  p-2 items-center ${pathname == '/dashboard' ? 'bg-[#a922236e]' : ''}`}>
                                    <RxDashboard className="w-1/4" />
                                    <Link className="w-full" href={'/dashboard'}>Dashboard</Link>
                                </div>
                                <div className={`flex gap-4  p-2 items-center ${pathname == '/feedback' ? 'bg-[#a922236e]' : ''}`}>
                                    <MdOutlineFeedback className="w-1/4" />
                                    <Link className="w-full" href={'/feedback'}>Feedback</Link>
                                </div>
                                <div className={`flex gap-4  p-2 items-center ${pathname == '/settings' ? 'bg-[#a922236e]' : ''}`}>
                                    <IoSettingsOutline className="w-1/4" />
                                    <Link className="w-full" href={'/settings'}>Settings</Link>
                                </div>
                                <div className={`flex gap-4  p-2 items-center ${pathname == '/help' ? 'bg-[#a922236e]' : ''}`}>
                                    <CiCircleInfo className="w-1/4" />
                                    <Link className="w-full" href={'/help'}>Help & Support</Link>
                                </div>
                                <div className="flex mt-auto gap-4 items-center">
                                    <CiLogout />
                                    <button onClick={onOpen2}>Logout</button>
                                </div>
                            </div>
                        </div>
                    } */}
                    </div>
                </div>
            </div>
            {/* <Modal
                size={"xl"}
                isOpen={isOpen2}
                backdrop="blur"
                onOpenChange={onOpenChange2}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {!changePassword && <>
                                <ModalHeader className="flex flex-col text-xl gap-1">Account Details</ModalHeader>
                                <ModalBody className="flex flex-col gap-4 pb-8">
                                    <div className="flex justify-between w-full gap-4">
                                        <div className="flex w-1/2 flex-col gap-2">
                                            <p>User Name</p>
                                            <p className="font-bold text-sm">{userData.name}</p>
                                        </div>
                                        <div className="flex w-1/2 flex-col gap-2">
                                            <p>Email Address</p>
                                            <p className="font-bold text-sm">johndoe@gmail.com</p>
                                        </div>
                                        <div className="flex w-1/2 flex-col gap-2">
                                            <p>Password</p>
                                            <p className="font-bold text-sm">abcd1234</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { setChangePassword(!changePassword) }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Update Password</button>
                                </ModalBody>
                            </>}

                            {changePassword && <>
                                <ModalHeader className="flex flex-col text-xl gap-1">Change Password</ModalHeader>
                                <ModalBody className="flex flex-col gap-4 pb-8">
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Current Password"
                                        placeholder="Enter Current Password"
                                        labelPlacement="outside"
                                    />
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="New Password"
                                        placeholder="Enter New Password"
                                        labelPlacement="outside"
                                    />
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Confirm Password"
                                        placeholder="Confirm New Password"
                                        labelPlacement="outside"
                                    />
                                    <button onClick={() => { setChangePassword(!changePassword) }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Save Changes</button>
                                </ModalBody>
                            </>}
                        </>
                    )}
                </ModalContent>
            </Modal> */}
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Logout</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Are you sure you want to Logout?</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-full py-2 bg-[#A92223]  rounded text-white">No</button>
                                    <button className="px-16 w-full py-2 border-2 border-[#A92223] text-[#A92223]  rounded ">Logout</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}