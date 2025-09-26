import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import ReactQuill from "react-quill-new";

export interface BaseQuillProps {
  control: Control;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;

  name: string;
  placeholder: string;
  errorPlaceHolder?: string;
  label?: string;
  labelClassName?: string;
  defaultValue?: string;
}
