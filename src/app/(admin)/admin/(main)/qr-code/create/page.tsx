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
import { useMutation, useQuery, useQueryClient } from "react-query";

const animals = [
  { key: "1", label: "Percentage" },
  { key: "2", label: "Fixed" },
];

export default function CreateQrCode() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();
  const createCouponMutation = useMutation(
    (data: any) => axiosInstance.post("/qr-code", data),
    {
      onSuccess(data) {
        console.log("submitted", data);
        queryClient.invalidateQueries("qr-codes");
        router.push("/admin/qr-code");
      },
    }
  );

  function submit(e: FieldValues) {

    createCouponMutation.mutate(e);
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Create Qr Code</p>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="sm:w-1/2 w-full flex flex-col gap-4"
      >
        <Input
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
          Submit
        </Button>
      </form>
    </>
  );
}
