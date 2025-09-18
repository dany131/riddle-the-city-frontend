"use client";

import axiosInstance from "@/app/utils/axiosInstance";
import { DiscountTypes } from "@/app/utils/constant";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { ImSpinner2 } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
export default function Coupons() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const bookingsQuery = useQuery(
    ["coupons", page],
    ({ queryKey }) => {
      return axiosInstance.get(`/coupon/all?page=${queryKey[1]}&limit=10`);
    },
    {
      onSuccess(data) {
        console.log(data);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const { mutate } = useMutation(
    (data: any) => axiosInstance.delete(`/coupon?id=${data.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("coupons");
      },
    }
  );
  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Coupons</p>
      </div>
      <div className="flex justify-end gap-4">
        <Link
          href={"/admin/coupons/create"}
          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max "
        >
          Create
        </Link>
        {/* <Link href={'/admin/mailing/announcement'}
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Create Announcements</Link> */}
      </div>
      {bookingsQuery.isFetching && (
        <div className="flex justify-center h-full items-center">
          <ImSpinner2 className="text-4xl animate-spin" />
        </div>
      )}
      {/* {bookingsQuery.data?.data.data.length == 0 && !bookingsQuery.isFetching && <p className="text-center">No Data Exists</p>} */}
      {!bookingsQuery.isFetching && (
        <>
          <table className="p-4 mt-4 w-full block sm:table overflow-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                <th className="p-2 text-sm text-left">Code</th>
                <th className="p-2 text-sm text-left">Description</th>
                <th className="p-2 text-sm text-left">Is Active</th>
                <th className="p-2 text-sm text-left">Is Deleted</th>
                <th className="p-2 text-sm text-left">Coupon Used</th>
                <th className="p-2 text-sm text-left">Discount Type</th>
                <th className="p-2 text-sm text-left">Created At</th>
                {/* <th className="p-2 text-sm text-left">Is Active</th> */}
                <th className="p-2 text-sm text-left rounded-r-md">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingsQuery.data?.data.data.map((e: any, index: number) => (
                <tr
                  className="border-b-2 border-solid border-gray-200"
                  key={index + 1}
                >
                  <td className="p-2 text-sm">
                    {index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}
                  </td>
                  <td className="p-2 text-sm">{e.code}</td>
                  <td className="p-2 text-sm">{e.description}</td>
                  <td className="p-2 text-sm">{e.isActive ? "Yes" : "No"}</td>

                  <td className="p-2 text-sm">{e.isDeleted ? "Yes" : "No"}</td>
                  <td className="p-2 text-sm">{e.usedCount}</td>
                  <td className="p-2 text-sm">
                    {DiscountTypes[e.discountType]}
                  </td>
                  <td className="p-2 text-sm">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  {/* <td className="p-2 text-sm">{`${e.active?"Active":"Not Active"}` }</td> */}
                  <td className="p-2 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/coupons/update?id=${e._id}`}>
                        <CiEdit
                          // onClick={() => {
                          // setEditRiddle(!editRiddle)
                          // setRiddleToEdit(e)
                          // }}
                          className="cursor-pointer border-[0.15rem] text-4xl text-blue-600 rounded-lg p-2 border-blue-600"
                        />
                      </Link>
                      <Link href={`/admin/coupons/view?id=${e._id}`}>
                        <BsEye
                          // onClick={() => {
                          // setEditRiddle(!editRiddle)
                          // setRiddleToEdit(e)
                          // }}
                          className="cursor-pointer border-[0.15rem] text-4xl text-yellow-600 rounded-lg p-2 border-yellow-600"
                        />
                      </Link>
                      <Button
                        className="bg-transparent cursor-pointer border-[0.15rem] text-xl min-w-max w-max h-max min-h-max text-red-600 rounded-lg p-[0.4rem] border-red-600"
                        onPress={() => {
                          mutate({ id: e._id });
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 flex-wrap">
            {!!bookingsQuery.data?.data.lastPage &&
              bookingsQuery.data?.data.lastPage != page && (
                <button
                  className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max "
                  type="button"
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                >
                  Next Page
                </button>
              )}

            {page != 1 && (
              <button
                className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max "
                type="button"
                onClick={() => {
                  setPage((prev) => prev - 1);
                }}
              >
                Previous Page
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
