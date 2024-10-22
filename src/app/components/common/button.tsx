"use client";
import React from "react";
import { CommonBtnProps } from "@/utils/interfaces";
import { Flex, Spin } from "antd";

const CommonBtn = ({
  label,
  onClick,
  type,
  isLoading,
  isBtnDisabled,
}: CommonBtnProps) => {
  return (
    <button
      disabled={isLoading || isBtnDisabled}
      onClick={onClick}
      className={`h-full text-buttonText text-sm md:text-base rounded-[7px] px-[15px]
        ${
          type === "Delete"
            ? "bg-btnDanger"
            : isLoading || isBtnDisabled
            ? "bg-btnDisabled"
            : "bg-buttonPrimary"
        }  
        ${(label === "Next" || "Submit") && "w-full"}
        `}
    >
      {isLoading ? (
        <div className="w-full flex justify-center">
          <Flex align="center" gap="middle">
            <Spin />
          </Flex>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default CommonBtn;

// "use client";
// import React from "react";
// import { CommonBtnProps } from "@/utils/interfaces";

// const CommonBtn = ({
//   label,
//   onClick,
//   isFullWidth,
//   width,
//   height,
// }: CommonBtnProps) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-${
//         isFullWidth ? "full" : `[${width}px]`
//       } h-[${height}px] bg-buttonPrimary text-buttonText text-sm md:text-base rounded-[7px]`}
//     >
//       {label}
//     </button>
//   );
// };

// export default CommonBtn;
