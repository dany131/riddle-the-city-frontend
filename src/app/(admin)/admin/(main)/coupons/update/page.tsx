'use client'

import axiosInstance from "@/app/utils/axiosInstance";
import { Button, Input, Select, SelectItem, Switch, Textarea } from "@nextui-org/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
export enum DiscountTypes {  Percentage = 1,  Fixed}
const animals = [
    {key: "1", label: "Percentage"},
    {key: "2", label: "Fixed"},
  ];

export default function CreateCoupon(datas:any){
    console.log(datas)
    const router=useRouter()
    const {handleSubmit,register,formState:{errors}}=useForm()
    const [isActive,setIsActive]=useState(true)
    const queryClient=useQueryClient()
    const createCouponMutation=useMutation((data:any)=>axiosInstance.post(`/coupon?couponCodeId=${datas.searchParams.id}`,data),{
        onSuccess(data) {
            console.log('submitted',data)
            queryClient.invalidateQueries('coupons')
            router.push('/admin/coupons')
        },
    })
    function submit(e:FieldValues){
        console.log(e)
        const data={
            ...e,
            discountType:Number(e.discountType),
            discount:Number(e.discount),
            isActive
        }
        console.log('discount',data)
        createCouponMutation.mutate(data)
    }

    return (
        <>
         <div className="flex justify-between">
            <p className="text-xl font-semibold">Update Coupon</p>
        </div>
        <form onSubmit={handleSubmit(submit)} className="sm:w-1/2 w-full flex flex-col gap-4">
            <Input errorMessage={errors.code?.message as any}
            isInvalid={errors.code as any}

            {...register('code',{required:"Enter Code"})} label="Code" placeholder="Enter Code..." labelPlacement="outside" classNames={{label:"!font-semibold"}}/>
            <Textarea errorMessage={errors.description?.message as any}
            isInvalid={errors.description as any}

            {...register('description',{required:"Enter Description"})} label="description" minRows={10} placeholder="Enter Code..." labelPlacement="outside" classNames={{label:"!font-semibold"}}/>
            <Select
            errorMessage={errors.discountType?.message as any}
            isInvalid={errors.discountType as any}

            {...register('discountType',{required:"Select Discount Type"})}
                label="Discount Type"
                variant="bordered"
                placeholder="Select a Discount Type"
                // selectedKeys={value}
                labelPlacement="outside"
                classNames={{label:"!font-semibold"}}
                className="w-full"
                // onSelectionChange={setValue}
            >
                {animals.map((animal) => (
                <SelectItem key={animal.key}>
                    {animal.label}
                </SelectItem>
                ))}
            </Select>
            <Input errorMessage={errors.discount?.message as any}
            isInvalid={errors.discount as any}

            {...register('discount',{required:"Enter Discount"})} type="number" label="Discount" placeholder="Enter Discount..." labelPlacement="outside" classNames={{label:"!font-semibold"}}/>
            <div className="flex flex-col gap-2">
                            <p className="font-semibold text-sm">Is Active</p>
                            <Switch isSelected={isActive} onValueChange={(j) => {
                                    const value = j;
                                    
                                }} defaultSelected/>
                        </div>
            <Button  type="submit"
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Update</Button>
            
        </form>
        </>
    )
}