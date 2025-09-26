"use client";

import { BaseQuillProps } from "@/app/utils/types";
import dynamic from "next/dynamic";
import { useController } from "react-hook-form";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function BaseQuill({
  control,
  name,
  rules,
  placeholder,
  errorPlaceHolder,
  label,
  labelClassName,
  defaultValue,
}: BaseQuillProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules, defaultValue });
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <p className={`${labelClassName} font-bold text-md`}>{label}</p>
      )}
      <ReactQuill
        onChange={field.onChange}
        placeholder={placeholder}
        value={field.value}
        theme="snow"
      />

      {field.value == "" && error && (
        <p className="text-[#f31260] font-semibold text-sm">{error.message}</p>
      )}
    </div>
  );
}
