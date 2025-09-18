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

export default function ViewCoupon(datas: any) {
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
    ({ queryKey }) => axiosInstance.get(`/coupon?couponCodeId=${queryKey[1]}`),
    {
      onSuccess(data) {
        setIsActive(data?.data.data.isActive);
      },
    }
  );
  const createCouponMutation = useMutation(
    (data: any) =>
      axiosInstance.put(`/coupon?couponCodeId=${datas.searchParams.id}`, data),
    {
      onSuccess(data) {
        console.log("submitted", data);
        queryClient.invalidateQueries("coupons");
        router.push("/admin/coupons");
      },
    }
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
        <p className="text-xl font-semibold">View Coupon</p>
      </div>
      {getCoupon.isFetching && (
        <div className="flex justify-center h-full items-center">
          <ImSpinner2 className="text-4xl animate-spin" />
        </div>
      )}
      {!getCoupon.isFetching && (
        <div
          onSubmit={handleSubmit(submit)}
          className="sm:w-1/2 w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 bg-gray-200 rounded-xl p-2">
            <p>
              <span className="font-bold">Coupon : </span>
              {getCoupon.data?.data.data.code}
            </p>
            <p>
              <span className="font-bold">Description : </span>
              {getCoupon.data?.data.data.description}
            </p>
            <p>
              <span className="font-bold">Discount Type : </span>
              {
                animals.find(
                  (animal) =>
                    animal.key == getCoupon.data?.data.data.discountType
                )?.label
              }
            </p>
            <p>
              <span className="font-bold">Discount :</span>{" "}
              {getCoupon.data?.data.data.discount}
            </p>
            <p>
              <span className="font-bold">Package :</span>{" "}
              {getCoupon.data?.data.data.package.name}
            </p>
            <p>
              <span className="font-bold">Status :</span>{" "}
              {isActive ? "Active" : "DisabledF"}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold">Used By</h1>
            <Table>
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
              </TableHeader>
              <TableBody>
                {getCoupon.data?.data.data.users.map((user: any) => (
                  <TableRow>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
