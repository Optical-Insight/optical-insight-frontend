import React from "react";
import { FormFieldProps } from "@/utils/interfaces";

interface SelectFieldProps extends Omit<FormFieldProps, "placeholder" | "type"> {
  options: { value: string; label: string }[]; // Array of dropdown options
}

const SelectField = ({
  label,
  required,
  value,
  onChange,
  readOnly,
  options,
  hasError,
}: SelectFieldProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-2">
      <label
        htmlFor={label}
        className="block text-[16px] text-darkText font-semibold"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        disabled={readOnly}
        required={required}
        name={label}
        id={label}
        className={`pl-2 text-[14.76px] w-[35.556vw] h-10 bg-inputBg rounded-lg 
          ${readOnly ? "bg-disabledTextBoxBg text-gray-500" : "text-darkText"} 
          ${hasError ? "border border-red-500" : "border border-gray-300"}
        `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Optional error handling */}
      {/* {hasError && (
        <span className="text-red-500 text-xs mt-1">
          This field is required
        </span>
      )} */}
    </div>
  );
};

export default SelectField;
