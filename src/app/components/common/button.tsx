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

"use client";
import React from "react";
import { CommonBtnProps } from "@/utils/interfaces";

const CommonBtn = ({ label, onClick }: CommonBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-full bg-buttonPrimary text-buttonText text-sm md:text-base rounded-[7px] px-[15px] ${
        (label === "Next" || "Submit") && "w-[160px] xl:w-[200px]"
      }`}
    >
      {label}
    </button>
  );
};

export default CommonBtn;
