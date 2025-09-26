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
import { useMutation, useQueryClient } from "react-query";

const animals = [
  { key: "1", label: "Percentage" },
  { key: "2", label: "Fixed" },
];

export default function CreateCMS() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm();
  // const {field,fieldState}=useController({control,name:'file',rules:{
  //     required:"Select Badge Logo"
  // }})
  const queryClient = useQueryClient();
  const createCouponMutation = useMutation(
    (data: any) => axiosInstance.post("/cms", data),
    {
      onSuccess(data) {
        console.log("submitted", data);
        queryClient.invalidateQueries("cms");
        router.push("/admin/cms");
      },
    }
  );
  function submit(e: FieldValues) {
    // console.log(e)
    // const formData=new FormData()
    // Object.entries(e).forEach((e)=>{
    //     formData.append(`${e[0]}`,e[1])
    // })
    // console.log('values',[...formData.values()])
    createCouponMutation.mutate({
      ...e,
      page: 1,
    });
  }

  console.log("errors", errors);
  console.log("values", getValues());

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Create CMS</p>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="sm:w-1/2 w-full flex flex-col gap-4"
      >
        <Input
          errorMessage={errors.heading?.message as any}
          isInvalid={errors.heading as any}
          {...register("heading", { required: "Enter Heading" })}
          label="Heading"
          placeholder="Enter Heading..."
          labelPlacement="outside"
          classNames={{ label: "!font-semibold" }}
        />
        <BaseQuill
          control={control}
          name="description"
          label="description"
          placeholder="Enter Description"
          rules={{ required: "Enter Description" }}
        />
        {/* <Textarea
          errorMessage={errors.description?.message as any}
          isInvalid={errors.description as any}
          {...register("description", { required: "Enter Description" })}
          label="description"
          minRows={10}
          placeholder="Enter Code..."
          labelPlacement="outside"
          classNames={{ label: "!font-semibold" }}
        /> */}

        <Button
          isLoading={createCouponMutation.isLoading}
          isDisabled={createCouponMutation.isLoading}
          type="submit"
          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max "
        >
          Submit
        </Button>
      </form>
    </>
  );
}
