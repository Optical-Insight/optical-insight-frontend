import { FormFieldProps } from "@/utils/interfaces";
import React from "react";

const FormField = ({ label, placeholder, value, onChange }: FormFieldProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-[0.879vh]">
      <label
        htmlFor={label}
        className="block text-[16px] text-darkText font-semibold"
      >
        {label}
      </label>

      <input
        type="text"
        name={label}
        id={label}
        className="flex text-[14.76px] text-inputText items-center justify-between w-[35.556vw] h-[4.883vh] bg-inputBg rounded-lg"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormField;
