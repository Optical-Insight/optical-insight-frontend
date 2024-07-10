"use client";
import React from "react";
import { CommonBtnProps } from "@/utils/interfaces";

const CommomBackBtn = ({
  label,
  onClick,
  isFullWidth,
  width,
  height,
}: CommonBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-${
        isFullWidth ? "full" : `[${width}vw]`
      } h-[${height}vh] bg-buttonSecondary text-buttonText text-[16px] rounded-[7px]`}
    >
      {label}
    </button>
  );
};

export default CommomBackBtn;
