"use client";
import Image from "next/image";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { ImNewspaper, ImSpinner2 } from "react-icons/im";
import { FaListCheck } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiSolidBookContent } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
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
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useMutation } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import Cookies from "js-cookie";
import { CiMail } from "react-icons/ci";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaIdBadge } from "react-icons/fa";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { IoQrCode } from "react-icons/io5";

export default function Sidebar() {
  const pathname = usePathname();
  const navigate = useRouter();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
    onClose: onClose2,
  } = useDisclosure();
  const [display, setDisplay] = useState(false);
  const logoutMutation = useMutation(() => axiosInstance.post("/auth/logout"), {
    onSuccess(data) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      onClose2();
      navigate.replace("/admin/login");
    },
    onError(error, variables, context) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      onClose2();
      navigate.replace("/admin/login");
    },
  });
  return (
    <>
      <div className=" text-white hidden sm:flex flex-col gap-8 h-[10rem] sm:h-full w-full p-4 sm:w-[20%] bg-[#160704]">
        <div className="h-[5rem] flex justify-between w-full">
          <Image
            className="w-full h-full object-contain"
            src={"/images/admin/main/layout/ridde.png"}
            alt="auth"
            width={400}
            height={1000}
          />
          <button
            className="block sm:hidden text-3xl"
            onClick={() => {
              setDisplay(!display);
            }}
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <hr />
        <div className="hidden sm:flex h-full sm:flex-col text-sm gap-4">
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/dashboard" ? "bg-[#a922236e]" : ""
            }`}
          >
            <RxDashboard className="w-1/4" />
            <Link className="w-full" href={"/admin/dashboard"}>
              Dashboard
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/manage-breweries" ? "bg-[#a922236e]" : ""
            }`}
          >
            <ImNewspaper className="w-1/4" />
            <Link className="w-full" href={"/admin/manage-breweries"}>
              Manage Locations
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/manage-hunts" ? "bg-[#a922236e]" : ""
            }`}
          >
            <FaListCheck className="w-1/4" />
            <Link className="w-full" href={"/admin/manage-hunts"}>
              Manage Hunts
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/view-bookings" ? "bg-[#a922236e]" : ""
            }`}
          >
            <BiSolidBookContent className="w-1/4" />
            <Link className="w-full" href={"/admin/view-bookings"}>
              View Bookings
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/mailing" ? "bg-[#a922236e]" : ""
            }`}
          >
            <CiMail className="w-1/4" />
            <Link className="w-full" href={"/admin/mailing"}>
              Mailing
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/coupons" ? "bg-[#a922236e]" : ""
            }`}
          >
            {/* <CiMail className="w-1/4" /> */}
            <RiCoupon2Fill className="w-1/4" />
            <Link className="w-full" href={"/admin/coupons"}>
              Coupons
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/levels" ? "bg-[#a922236e]" : ""
            }`}
          >
            {/* <CiMail className="w-1/4" /> */}
            <FaIdBadge className="w-1/4" />
            <Link className="w-full" href={"/admin/levels"}>
              Badges
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/cms" ? "bg-[#a922236e]" : ""
            }`}
          >
            {/* <CiMail className="w-1/4" /> */}
            <MdOutlineContentPasteSearch className="w-1/4" />
            <Link className="w-full" href={"/admin/cms"}>
              CMS
            </Link>
          </div>
          <div
            className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
              pathname == "/admin/qr-scans" ? "bg-[#a922236e]" : ""
            }`}
          >
            {/* <CiMail className="w-1/4" /> */}
            <IoQrCode className="w-1/4" />
            <Link className="w-full" href={"/admin/qr-scans"}>
              QR Scans
            </Link>
          </div>

          {/* <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/settings' ? 'bg-[#a922236e]' : ''}`}>
                        <TbSettings className="w-1/4" />
                        <Link className="w-full" href={'/admin/settings'}>Settings</Link>
                    </div> */}
          <div className="flex mt-auto gap-4 items-center">
            <CiLogout />
            <button
              onClick={() => {
                onOpen2();
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {display && (
          <div
            onClick={() => setDisplay(!display)}
            className="flex sm:hidden w-full absolute z-[9999999] left-0 bg-[#000206d6] top-0 h-full justify-end"
          >
            <div className="bg-[#160704] flex h-full w-1/2 p-4 flex-col text-sm gap-4">
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/dashboard" ? "bg-[#a922236e]" : ""
                }`}
              >
                <RxDashboard className="w-1/4" />
                <Link className="w-full" href={"/admin/dashboard"}>
                  Dashboard
                </Link>
              </div>
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/manage-breweries" ? "bg-[#a922236e]" : ""
                }`}
              >
                <ImNewspaper className="w-1/4" />
                <Link className="w-full" href={"/admin/manage-breweries"}>
                  Manage Locations
                </Link>
              </div>
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/manage-hunts" ? "bg-[#a922236e]" : ""
                }`}
              >
                <FaListCheck className="w-1/4" />
                <Link className="w-full" href={"/admin/manage-hunts"}>
                  Manage Hunts
                </Link>
              </div>
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/view-bookings" ? "bg-[#a922236e]" : ""
                }`}
              >
                <BiSolidBookContent className="w-1/4" />
                <Link className="w-full" href={"/admin/view-bookings"}>
                  View Bookings
                </Link>
              </div>
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/mailing" ? "bg-[#a922236e]" : ""
                }`}
              >
                <CiMail className="w-1/4" />
                <Link className="w-full" href={"/admin/mailing"}>
                  Mailing
                </Link>
              </div>
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/coupons" ? "bg-[#a922236e]" : ""
                }`}
              >
                <RiCoupon2Fill className="w-1/4" />
                <Link className="w-full" href={"/admin/coupons"}>
                  Coupons
                </Link>
              </div>
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/levels" ? "bg-[#a922236e]" : ""
                }`}
              >
                {/* <CiMail className="w-1/4" /> */}
                <FaIdBadge className="w-1/4" />
                <Link className="w-full" href={"/admin/levels"}>
                  Badges
                </Link>
              </div>
              <div
                className={`flex gap-4 hover:bg-[#a922236e] p-2 items-center ${
                  pathname == "/admin/cms" ? "bg-[#a922236e]" : ""
                }`}
              >
                {/* <CiMail className="w-1/4" /> */}
                <MdOutlineContentPasteSearch className="w-1/4" />
                <Link className="w-full" href={"/admin/cms"}>
                  CMS
                </Link>
              </div>
              {/* <div className={`flex gap-4  p-2 items-center ${pathname == '/admin/settings' ? 'bg-[#a922236e]' : ''}`}>
                                <TbSettings className="w-1/4" />
                                <Link className="w-full" href={'/admin/settings'}>Settings</Link>
                            </div> */}
              <div className="flex mt-auto gap-4 items-center">
                <CiLogout />
                <button onClick={onOpen2}>Logout</button>
              </div>
            </div>
          </div>
        )}
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
              <ModalHeader className="flex flex-col text-xl gap-1">
                Logout
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 pb-8">
                <p className="text-sm text-gray-400">
                  Are you sure you want to Logout?
                </p>
                <div className="flex w-full gap-4">
                  <button
                    onClick={() => {
                      onClose2();
                    }}
                    className="px-16 w-full py-2 bg-[#A92223]  rounded text-white"
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      logoutMutation.mutate();
                    }}
                    className="px-16 w-full py-2 border-2 border-[#A92223] flex justify-center text-[#A92223]  rounded "
                  >
                    {logoutMutation.isLoading ? (
                      <ImSpinner2 className="text-xl animate-spin" />
                    ) : (
                      "Log Out"
                    )}
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
