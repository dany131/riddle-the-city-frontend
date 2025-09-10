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

export default function CreateCoupon() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();
  const createCouponMutation = useMutation(
    (data: any) => axiosInstance.post("/coupon", data),
    {
      onSuccess(data) {
        console.log("submitted", data);
        queryClient.invalidateQueries("coupons");
        router.push("/admin/coupons");
      },
    }
  );

  const packagesQuery = useQuery(["packages"], () =>
    axiosInstance.get("/package/all?page=1&limit=20")
  );

  function submit(e: FieldValues) {
    console.log(e);
    const data = {
      ...e,
      discountType: Number(e.discountType),
      discount: Number(e.discount),
      isActive,
    };
    console.log("discount", data);
    createCouponMutation.mutate(data);
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Create Coupon</p>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="sm:w-1/2 w-full flex flex-col gap-4"
      >
        <Input
          errorMessage={errors.code?.message as any}
          isInvalid={errors.code as any}
          {...register("code", { required: "Enter Code" })}
          label="Code"
          placeholder="Enter Code..."
          labelPlacement="outside"
          classNames={{ label: "!font-semibold" }}
        />
        <Textarea
          errorMessage={errors.description?.message as any}
          isInvalid={errors.description as any}
          {...register("description", { required: "Enter Description" })}
          label="description"
          minRows={10}
          placeholder="Enter Code..."
          labelPlacement="outside"
          classNames={{ label: "!font-semibold" }}
        />
        <Select
          errorMessage={errors.discountType?.message as any}
          isInvalid={errors.discountType as any}
          {...register("discountType", { required: "Select Discount Type" })}
          label="Discount Type"
          variant="bordered"
          placeholder="Select a Discount Type"
          labelPlacement="outside"
          classNames={{ label: "!font-semibold" }}
          className="w-full"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>

        <Select
          errorMessage={errors.packageId?.message as any}
          isInvalid={errors.packageId as any}
          {...register("packageId", { required: "Select Discount Type" })}
          label="Package"
          variant="bordered"
          placeholder="Select a Package"
          labelPlacement="outside"
          classNames={{ label: "!font-semibold" }}
          className="w-full"
        >
          {packagesQuery.data?.data.data.map((packagee: any) => (
            <SelectItem key={packagee._id}>{packagee.name}</SelectItem>
          ))}
        </Select>
        <Input
          errorMessage={errors.discount?.message as any}
          isInvalid={errors.discount as any}
          {...register("discount", { required: "Enter Discount" })}
          type="number"
          label="Discount"
          placeholder="Enter Discount..."
          labelPlacement="outside"
          classNames={{ label: "!font-semibold" }}
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">Is Active</p>
          <Switch
            isSelected={isActive}
            onValueChange={(j) => {
              const value = j;
              setIsActive(value);
            }}
          />
        </div>
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
