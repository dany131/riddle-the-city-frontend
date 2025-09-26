"use client";

import axiosInstance from "@/app/utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { useMutation, useQuery, useQueryClient } from "react-query";
const animals = [
  { key: 1, label: "Percentage" },
  { key: 2, label: "Fixed" },
];

export default function ViewQrCode(datas: any) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();
  const getCoupon = useQuery(
    ["individualCoupon", datas.searchParams.id],
    ({ queryKey }) => axiosInstance.get(`/qr-code?id=${queryKey[1]}`),
    {
      onSuccess(data) {
        setIsActive(data?.data.data.isActive);
      },
    }
  );

  const downloadQRCode = (qrCode: string, title: string) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${title}_QRCode.png`;
    link.click();
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">View Coupon</p>
      </div>
      {getCoupon.isFetching && (
        <div className="flex justify-center h-full items-center">
          <ImSpinner2 className="text-4xl animate-spin" />
        </div>
      )}
      {!getCoupon.isFetching && (
        <div className="sm:w-1/2 w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 bg-gray-200 rounded-xl p-2">
            <p>
              <span className="font-bold">Qr Code : </span>
              {getCoupon.data?.data.data.name}
            </p>

            <div className="flex flex-col items-center mt-4">
              <img
                src={getCoupon.data?.data.data.qrCode}
                alt="QR Code"
                className="w-40 h-40"
              />
              <button
                onClick={() =>
                  downloadQRCode(
                    getCoupon.data?.data.data.qrCode,
                    getCoupon.data?.data.data.name
                  )
                }
                className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max mt-4"
              >
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
