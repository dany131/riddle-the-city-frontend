'use client'

import axiosInstance from "@/app/utils/axiosInstance";
import { Button, Input, Select, SelectItem, Switch, Textarea } from "@nextui-org/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useController, useForm } from "react-hook-form"
import { ImSpinner2 } from "react-icons/im";
import { useMutation, useQuery, useQueryClient } from "react-query";
const animals = [
    {key: 1, label: "Percentage"},
    {key: 2, label: "Fixed"},
  ];

export default function CreateCoupon(datas:any){
    console.log(datas)
    const router=useRouter()
    const [previewImage,setPreviewImage]=useState('')
    const {handleSubmit,register,formState:{errors},control}=useForm()
    const [isActive,setIsActive]=useState(true)
    const queryClient=useQueryClient()
    const getCoupon=useQuery(['individualLevel',datas.searchParams.id],({queryKey})=>axiosInstance.get(`/badge?badgeId=${queryKey[1]}`),{
        onSuccess(data) {
            setIsActive(data?.data.data.isActive)
        },
        refetchOnWindowFocus:false
    })
    const {field,fieldState}=useController({control,name:'file'})
    const createCouponMutation=useMutation((data:any)=>axiosInstance.put(`/badge?badgeId=${datas.searchParams.id}`,data),{
        onSuccess(data) {
            console.log('submitted',data)
            queryClient.invalidateQueries('levels')
            router.push('/admin/levels')
        },
    })
    function submit(e:FieldValues){
        const formData=new FormData()
        Object.entries(e).forEach((e)=>{
            formData.append(`${e[0]}`,e[1])
        })
        console.log('values',[...formData.values()])
        createCouponMutation.mutate(formData)
    }


    return (
        <>
         <div className="flex justify-between">
            <p className="text-xl font-semibold">Update Badge</p>
        </div>
        {getCoupon.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>    }
        {!getCoupon.isFetching && <form onSubmit={handleSubmit(submit)} className="sm:w-1/2 w-full flex flex-col gap-4">
            <Input defaultValue={getCoupon.data?.data.data.name} errorMessage={errors.name?.message as any}
            isInvalid={errors.code as any}

            {...register('name')} label="Name" placeholder="Enter Name..." labelPlacement="outside" classNames={{label:"!font-semibold"}}/>
            <Textarea defaultValue={getCoupon.data?.data.data.description} errorMessage={errors.description?.message as any}
            isInvalid={errors.description as any}

            {...register('description')} label="description" minRows={10} placeholder="Enter Code..." labelPlacement="outside" classNames={{label:"!font-semibold"}}/>
          
            <Input defaultValue={getCoupon.data?.data.data.huntsRequired}  errorMessage={errors.huntsRequired?.message as any}
            isInvalid={errors.discount as any}

            {...register('huntsRequired')} type="number" label="Hunts Required" placeholder="Enter Hunts Required..." labelPlacement="outside" classNames={{label:"!font-semibold"}}/>
          <div className="relative min-h-[10rem] w-[10rem] flex flex-col gap-2">
                            <p className="text-sm">Level Logo</p>
                            {fieldState.error && <p className="text-red-500 font-semibold">{fieldState.error.message as any}</p>}
                            <label htmlFor="breweryLogo" className="cursor-pointer block">
                            <Image src={previewImage?previewImage:`${process.env.NEXT_PUBLIC_MEDIA_URL}/${getCoupon.data?.data.data.media}`} alt="brewery Logo" width={100} height={100} className="h-full w-full object-contain"/>
                            </label>
                            <input accept=".jpeg,.jpg,.png"  {...field} value={undefined} onChange={(e)=>{
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    // setProfileImage(file);
                                    field.onChange(file)
                                    setPreviewImage(URL.createObjectURL(file));
                                }
                            }} className="absolute invisible" id="breweryLogo" type="file"/>
                        </div>
            <Button isLoading={createCouponMutation.isLoading} isDisabled={createCouponMutation.isLoading} type="submit"
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Update</Button>
            
        </form>}
        
        </>
    )
}