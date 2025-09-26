"use client";

import axiosInstance from "@/app/utils/axiosInstance";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import Cookie from "js-cookie";

export default function QrScan() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const codeScanned = Cookie.get(id ?? "");
  useQuery(
    ["scan", searchParams.get("id")],
    ({ queryKey }) => axiosInstance.get(`/qr-code/scan?id=${queryKey[1]}`),
    {
      onSuccess(data) {
        Cookie.set(id!, "yes");
      },
      enabled: !codeScanned && !!id,
    }
  );
  return <></>;
}
