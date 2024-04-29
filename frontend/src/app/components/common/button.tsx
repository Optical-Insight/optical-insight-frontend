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
        isFullWidth ? "full" : `${width}vw`
      } h-[${height}vh] bg-buttonPrimary text-buttonText rounded-[7px]`}
    >
      {label}
    </button>
  );
};

export default CommomBtn;
