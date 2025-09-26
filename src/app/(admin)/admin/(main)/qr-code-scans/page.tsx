"use client";

import axiosInstance from "@/app/utils/axiosInstance";
import { DiscountTypes } from "@/app/utils/constant";
import { parseDate } from "@internationalized/date";
import { Button, DatePicker, DateValue } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { ImSpinner2 } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import moment from "moment";
export default function QrScans() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const bookingsQuery = useQuery(
    ["riddle-scans", page, date],
    ({ queryKey }) => {
      return axiosInstance.get(
        `/qr-code/scans?page=${queryKey[1]}&limit=10&date=${queryKey[2]}`
      );
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
        <p className="text-xl font-semibold">QR Code Scans</p>
      </div>

      {bookingsQuery.isFetching && (
        <div className="flex justify-center h-full items-center">
          <ImSpinner2 className="text-4xl animate-spin" />
        </div>
      )}
      {/* {bookingsQuery.data?.data.data.length == 0 && !bookingsQuery.isFetching && <p className="text-center">No Data Exists</p>} */}
      {!bookingsQuery.isFetching && (
        <>
          <div className="flex flex-wrap gap-4 items-center">
            <p>Filter By Date :</p>
            <DatePicker
              showMonthAndYearPickers
              className="max-w-[284px]"
              value={parseDate(date) as any}
              onChange={(value: any) => {
                if (value) {
                  setDate(value.toString());
                }
              }}
            />
          </div>
          <table className="p-4 mt-4 w-full block sm:table overflow-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                <th className="p-2 text-sm text-left">Name</th>
                <th className="p-2 text-sm text-left">Total Scanned</th>

                <th className="p-2 text-sm text-left rounded-r-md">
                  Scanned At
                </th>
                {/* <th className="p-2 text-sm text-left">Is Active</th> */}
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
                  <td
                    className="p-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: e.qrCodeInfo.name }}
                  />

                  <td className="p-2 text-sm">{e.totalScanned}</td>
                  <td className="p-2 text-sm">
                    {new Date(e.qrCodeInfo.createdAt).toLocaleDateString()}
                  </td>
                  {/* <td className="p-2 text-sm">{`${e.active?"Active":"Not Active"}` }</td> */}
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
