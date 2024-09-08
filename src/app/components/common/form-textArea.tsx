import { FormFieldProps } from "@/utils/interfaces";
import React from "react";

const FormFieldTextArea = ({
  label,
  placeholder,
  required,
  value,
  onChange,
  readOnly,
}: FormFieldProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-3">
      <label
        htmlFor={label}
        className="block text-[16px] text-darkText font-semibold"
      >
        {label}
      </label>

      <textarea
        disabled={readOnly}
        required={required}
        name={label}
        id={label}
        className={`pl-2 flex text-[14.76px] items-center justify-between w-[35.556vw] h-auto bg-inputBg rounded-lg
    ${readOnly ? "bg-disbaledTextBoxBg text-gray-500" : "text-darkText"}`}
        placeholder={placeholder}
        defaultValue={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormFieldTextArea;
