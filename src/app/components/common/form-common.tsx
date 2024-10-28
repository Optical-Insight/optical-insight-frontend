import { FormFieldProps } from "@/utils/interfaces";
import React, { useState } from "react";

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
  const [inputError, setInputError] = useState<string | null>(null);

  const handleInputChange = (val: string) => {
    if (type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(val)) {
        setInputError("Please enter a valid email address");
      } else {
        setInputError(null);
      }
    } else if (type === "phone") {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(val)) {
        setInputError("Please enter a valid 10-digit phone number");
      } else {
        setInputError(null);
      }
    } else if (type === "password") {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordPattern.test(val)) {
        setInputError(
          "Password must be at least 8 characters long, with uppercase, lowercase, number, and special character"
        );
      } else {
        setInputError(null);
      }
    }

    onChange(val);
  };

  return (
    <div className="flex items-center justify-between w-full mb-2">
      <label
        htmlFor={label}
        className="block text-[16px] text-darkText font-semibold"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex flex-col">
        <input
          disabled={readOnly}
          required={required}
          type={type || "text"}
          name={label}
          id={label}
          className={`pl-2 text-[14.76px] w-[35.556vw] h-10 bg-inputBg rounded-lg 
          ${readOnly ? "bg-disabledTextBoxBg text-gray-500" : "text-darkText"} 
          ${
            hasError || inputError
              ? "border border-red-500"
              : "border border-gray-300"
          }
        `}
          placeholder={placeholder}
          defaultValue={value}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {inputError && (
          <span className="text-red-500 text-xs mt-1 w-[35.556vw]">
            {inputError}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormField;
