import { DateRangePicker } from "@nextui-org/react";
import { useController } from "react-hook-form";

export default function DatePicker({control}:{control:any}){
    const {field,fieldState:{error}}=useController({name:"date",control:control,rules:{
        required:"Select Date"
    }})

    return (
        <>

<DateRangePicker
isInvalid={!!error}
errorMessage={error?.message}
                                {...field}
                                variant="bordered"
                                classNames={{inputWrapper:"!border-[#A92223]",innerWrapper:"!text-[#A92223]",segment:"!text-[#A92223]"}}
    //   label="Stay duration" 
      
      className="max-w-xs" 
    />
        </>
    )
}