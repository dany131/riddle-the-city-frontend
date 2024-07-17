'use client';
import Image from "next/image"
import Link from "next/link"
import { RxDashboard } from "react-icons/rx";
import { ImNewspaper } from "react-icons/im";
import { FaListCheck } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiSolidBookContent } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
export default function Sidebar() {
    const pathname = usePathname()
    const [display,setDisplay]=useState(false)
    return (
        <>
            <div className="h-max !sm:h-[20rem] text-white flex flex-col gap-8 sm:h-full w-full p-4 sm:w-[20%] bg-[#160704]">
                <div className="h-[5rem] flex justify-between w-full">
                    <Image className="w-full h-full object-contain" src={'/images/admin/main/layout/ridde.png'} alt="auth" width={400} height={1000} />
                    <button className="block sm:hidden text-3xl" onClick={()=>{setDisplay(!display)}}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <hr />
                <div className="hidden sm:flex h-full sm:flex-col text-sm gap-4">
                    <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/dashboard' ?'bg-[#a922236e]':''}`}>
                        <RxDashboard className="w-1/4" />
                        <Link className="w-full" href={'/admin/dashboard'}>Dashboard</Link>
                    </div>
                    <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/manage-breweries' ? 'bg-[#a922236e]' : ''}`}>
                        <ImNewspaper className="w-1/4" />
                        <Link className="w-full" href={'/admin/manage-breweries'}>Manage Breweries</Link>
                    </div>
                    <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/manage-riddles' ? 'bg-[#a922236e]' : ''}`}>
                        <FaListCheck className="w-1/4" />
                        <Link className="w-full" href={'/admin/manage-riddles'}>Manage Riddles</Link>
                    </div>
                    <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/view-bookings' ? 'bg-[#a922236e]' : ''}`}>
                        <BiSolidBookContent className="w-1/4" />
                        <Link className="w-full" href={'/admin/view-bookings'}>View Bookings</Link>
                    </div>
                    <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/settings' ? 'bg-[#a922236e]' : ''}`}>
                        <TbSettings className="w-1/4" />
                        <Link className="w-full" href={'/admin/settings'}>Settings</Link>
                    </div>
                    <div className="flex mt-auto gap-4 items-center">
                        <CiLogout />
                        <button>Logout</button>
                    </div>
                </div>
                {display &&
                    <div onClick={()=>setDisplay(!display)} className="flex sm:hidden w-full absolute z-[9999999] left-0 bg-[#000206d6] top-0 h-full justify-end">
                        <div className="bg-[#160704] flex h-full w-1/2 p-4 flex-col text-sm gap-4">
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/dashboard' ? 'bg-[#a922236e]' : ''}`}>
                                <RxDashboard className="w-1/4" />
                                <Link className="w-full" href={'/admin/dashboard'}>Dashboard</Link>
                            </div>
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/manage-breweries' ? 'bg-[#a922236e]' : ''}`}>
                                <ImNewspaper className="w-1/4" />
                                <Link className="w-full" href={'/admin/manage-breweries'}>Manage Breweries</Link>
                            </div>
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/manage-riddles' ? 'bg-[#a922236e]' : ''}`}>
                                <FaListCheck className="w-1/4" />
                                <Link className="w-full" href={'/admin/manage-riddles'}>Manage Riddles</Link>
                            </div>
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/view-bookings' ? 'bg-[#a922236e]' : ''}`}>
                                <BiSolidBookContent className="w-1/4" />
                                <Link className="w-full" href={'/admin/view-bookings'}>View Bookings</Link>
                            </div>
                            <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/settings' ? 'bg-[#a922236e]' : ''}`}>
                                <TbSettings className="w-1/4" />
                                <Link className="w-full" href={'/admin/settings'}>Settings</Link>
                            </div>
                            <div className="flex mt-auto gap-4 items-center">
                                <CiLogout />
                                <button>Logout</button>
                            </div>
                        </div> 
                    </div>
                }
            </div>
        </>
    )
}