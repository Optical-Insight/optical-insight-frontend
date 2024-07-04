"use client";
import React from "react";
import { CommomBtnProps } from "@/utils/interfaces";

const CommomBtn = ({
  label,
  onClick,
  isFullWidth,
  width,
  height,
}: CommomBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-${
        isFullWidth ? "full" : `[${width}px]`
      } h-[${height}px] bg-buttonPrimary text-buttonText text-sm xl:text-[16px] rounded-[7px]`}
    >
      {label}
    </button>
  );
};

export default CommomBtn;
