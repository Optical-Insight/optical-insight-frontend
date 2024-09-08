import { FormFieldProps } from "@/utils/interfaces";
import React from "react";

const FormField = ({
  label,
  placeholder,
  required,
  value,
  onChange,
  readOnly,
  type,
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
        disabled={readOnly}
        required={required}
        type={type ? type : "text"}
        name={label}
        id={label}
        className={`pl-2 flex text-[14.76px]  items-center justify-between w-[35.556vw] h-10 bg-inputBg rounded-lg
          ${readOnly ? "bg-disbaledTextBoxBg text-gray-500" : "text-darkText"}`}
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormField;
