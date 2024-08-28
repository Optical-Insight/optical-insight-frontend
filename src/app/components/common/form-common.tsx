import { FormFieldProps } from "@/utils/interfaces";
import React from "react";

const FormField = ({
  label,
  placeholder,
  required,
  value,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-2">
      <label
        htmlFor={label}
        className="block text-[16px] text-darkText font-semibold"
      >
        {label}
      </label>

      <input
        required={required}
        type="text"
        name={label}
        id={label}
        className="pl-2 flex text-[14.76px] text-darkText items-center justify-between w-[35.556vw] h-10 bg-inputBg rounded-lg"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormField;
