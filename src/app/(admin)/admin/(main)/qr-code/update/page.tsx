"use client";

import axiosInstance from "@/app/utils/axiosInstance";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
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

export default function QrCodeUpdate(datas: any) {
  console.log(datas);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();
  const getCoupon = useQuery(
    ["qr-code", datas.searchParams.id],
    ({ queryKey }) => axiosInstance.get(`/qr-code?id=${queryKey[1]}`),
    {
      onSuccess(data) {
        setIsActive(data?.data.data.isActive);
      },
    }
  );
  const createCouponMutation = useMutation(
    (data: any) =>
      axiosInstance.put(`/qr-code?id=${datas.searchParams.id}`, data),
    {
      onSuccess(data) {
        queryClient.invalidateQueries("qr-codes");
        router.push("/admin/qr-code");
      },
    }
  );
  function submit(e: FieldValues) {
    console.log(e);

    createCouponMutation.mutate(e);
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Update Qr Code</p>
      </div>
      {getCoupon.isFetching && (
        <div className="flex justify-center h-full items-center">
          <ImSpinner2 className="text-4xl animate-spin" />
        </div>
      )}
      {!getCoupon.isFetching && (
        <form
          onSubmit={handleSubmit(submit)}
          className="sm:w-1/2 w-full flex flex-col gap-4"
        >
          <Input
            defaultValue={getCoupon.data?.data.data.name}
            errorMessage={errors.code?.message as any}
            isInvalid={errors.code as any}
            {...register("name", { required: "Enter Name" })}
            label="Name"
            placeholder="Enter Name..."
            labelPlacement="outside"
            classNames={{ label: "!font-semibold" }}
          />

          <Button
            type="submit"
            className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max "
          >
            Update
          </Button>
        </form>
      )}
    </>
  );
}
