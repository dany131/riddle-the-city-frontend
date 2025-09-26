"use client";

import axiosInstance from "@/app/utils/axiosInstance";
import BaseQuill from "@/components/common/base-quill";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useController, useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { useMutation, useQuery, useQueryClient } from "react-query";
const animals = [
  { key: 1, label: "Percentage" },
  { key: 2, label: "Fixed" },
];

export default function CreateCoupon(datas: any) {
  console.log(datas);
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();
  const getCoupon = useQuery(
    ["individualCMS", datas.searchParams.id],
    ({ queryKey }) => axiosInstance.get(`/cms?contentId=${queryKey[1]}&page=1`),
    {
      onSuccess(data) {
        setIsActive(data?.data.data.isActive);
      },
      refetchOnWindowFocus: false,
    }
  );
  const { field, fieldState } = useController({ control, name: "file" });
  const createCouponMutation = useMutation(
    (data: any) =>
      axiosInstance.put(`/cms?contentId=${datas.searchParams.id}`, data),
    {
      onSuccess(data) {
        console.log("submitted", data);
        queryClient.invalidateQueries("cms");
        router.push("/admin/cms");
      },
    }
  );
  function submit(e: FieldValues) {
    createCouponMutation.mutate(e);
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Update CMS</p>
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
          <BaseQuill
            defaultValue={getCoupon.data?.data.data.heading}
            control={control}
            name="heading"
            label="Heading"
            placeholder="Enter Heading..."
            rules={{ required: "Enter Heading" }}
          />
          {/* <Textarea
            defaultValue={getCoupon.data?.data.data.description}
            errorMessage={errors.description?.message as any}
            isInvalid={errors.description as any}
            {...register("description", { required: "Enter Description" })}
            label="description"
            minRows={10}
            placeholder="Enter Code..."
            labelPlacement="outside"
            classNames={{ label: "!font-semibold" }}
          /> */}

          <BaseQuill
            defaultValue={getCoupon.data?.data.data.description}
            control={control}
            name="description"
            label="description"
            placeholder="Enter Description"
            rules={{ required: "Enter Description" }}
          />

          <Button
            isLoading={createCouponMutation.isLoading}
            isDisabled={createCouponMutation.isLoading}
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
