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
  hasError,
}: FormFieldProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-2">
      <label
        htmlFor={label}
        className="block text-[16px] text-darkText font-semibold"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        disabled={readOnly}
        required={required}
        type={type ? type : "text"}
        name={label}
        id={label}
        className={`pl-2 text-[14.76px] w-[35.556vw] h-10 bg-inputBg rounded-lg 
          ${readOnly ? "bg-disabledTextBoxBg text-gray-500" : "text-darkText"} 
          ${hasError ? "border border-red-500" : "border border-gray-300"}
        `}
        placeholder={placeholder}
        // value={value}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {/*{hasError && <span className="text-red-500 text-xs mt-1">This field is required</span>}*/}
    </div>
  );
};

export default FormField;
